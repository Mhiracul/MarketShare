const express = require("express");
const userModel = require("../models/user");

require("dotenv").config();
const router = express.Router();
var passwordHash = require("password-hash");
const {
  forgotPasswordMail,
  sendWelcomeMail,
  sendLoggedInMail,
} = require("../mailer/sendMail");
const {
  validateRegistration,
  validateLogin,
  validateEmail,
} = require("../validator");
const {
  makeRandom,
  generateAccessToken,
  authenticateToken,
} = require("../accesstoken");
const marketShareUser = require("../models/user");

const generateOTP = () => {
  // Generate a random 6-digit OTP
  return Math.random().toString().slice(2, 8);
};

router.post("/user/register", async (req, res, next) => {
  const {
    Name,
    PhoneNumber,
    Country,
    City,
    Latitude,
    Longitude,
    Address,
    Email,
    Password,
  } = req.body;
  console.log("Request Body:", req.body);

  if (validateRegistration(req.body, res)) {
    try {
      const existingUser = await marketShareUser.findOne({ Email: Email });

      if (existingUser) {
        return res
          .status(400)
          .send({ message: "This Email already exists. Go to Login" });
      }

      const hashedPassword = passwordHash.generate(Password);
      const Token = makeRandom(72);
      const newUser = new marketShareUser({
        Email: Email,
        Password: hashedPassword,
        Name,
        PhoneNumber,
        Country,
        City,
        Latitude,
        Longitude,
        Address,
        Token: Token,
        isDeleted: false,
        Verified: false,
        ResetToken: makeRandom(73),
        Active: false,
      });

      const result = await newUser.save();

      const OTP = generateOTP();
      await sendWelcomeMail(Email, OTP);

      res.status(200).send({ message: "Success", data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  }
});

router.post("/user/login", async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (Email) {
      const email = Email.toLowerCase();
      if (validateLogin(req.body, res)) {
        const user = await marketShareUser.findOne({ Email: email }).exec();

        if (user) {
          const dbPassword = user.Password;
          const verified = passwordHash.verify(Password, dbPassword);

          if (verified) {
            if (user.Active) {
              const accessToken = generateAccessToken(user);

              res
                .status(200)
                .send({ message: "Success", data: user, accessToken });
            } else {
              res.status(400).send({ message: "Not Active" });
            }
          } else {
            res
              .status(400)
              .send({ message: "Wrong Password, click on forgot password." });
          }
        } else {
          res.status(400).send({
            message:
              "This Email does not exist, kindly click on create account.",
          });
        }
      }
    }
  } catch (err) {
    // Handle errors here
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/user/forgot_password", async (req, res, next) => {
  const { Email, OTP } = req.body;

  console.log(Email);
  console.log("OTP:", OTP);

  if (validateEmail(req.body, res)) {
    try {
      const obj = await marketShareUser.findOne({ Email }); // Use findOne directly

      if (obj !== null) {
        const OTP = generateOTP();

        await forgotPasswordMail(Email, OTP);
        res.status(200).send({ message: "Success", data: obj });
      } else {
        res.status(400).send({ message: "User does not exist." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
});

router.post("/user/reset_password", async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    if (Email && Password) {
      const hashedPassword = passwordHash.generate(Password);
      const newToken = makeRandom(72);

      // Find the user by Email and update Password and Token
      const filter = { Email: Email };
      const update = { Password: hashedPassword, Token: newToken };

      // Use await to execute the query
      const doc = await marketShareUser.findOneAndUpdate(filter, update);

      if (doc) {
        res.status(200).send({ message: "Success" });
      } else {
        res.status(400).send({ message: "User not found" });
      }
    } else {
      res.status(400).send({ message: "Email and Password are required" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while processing your request" });
  }
});

router.post("/send/verified/email", async (req, res, next) => {
  let { Email, OTP } = req.body;

  await sendWelcomeMail(Email, OTP);
  res.status(200).send({ message: "Sent Email" });
});

// POST route for verifying the code
router.post("/initiate-payment", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/charges?type=card",
      {
        public_key: "YOUR_PUBLIC_KEY",
        tx_ref: "YOUR_TRANSACTION_REFERENCE",
        amount: 1000, // Amount in the smallest currency unit
        currency: "NGN", // Currency code
        redirect_url: "https://yourwebsite.com/payment-success", // Redirect URL after payment
        payment_type: "card",
        customer: {
          email: "customer@example.com", // Customer email
        },
      },
      {
        headers: {
          Authorization: `Bearer YOUR_SECRET_KEY`,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Error initiating payment:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// Get user profile by Email
router.get("/user/profile", authenticateToken, async (req, res) => {
  try {
    const { Email } = req.query;
    if (!Email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await marketShareUser.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the currently logged-in user's profile
router.put("/user/profile", authenticateToken, async (req, res) => {
  try {
    // Get the user ID from the authentication token
    const userId = req.user.id;

    // Update the user's profile based on their ID
    const updatedUser = await marketShareUser.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
