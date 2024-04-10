const validateAddress = (object, res) => {
  if (!object.CreatorEmail.includes("@")) {
    res.status(400).send("Email is not valid");
    return false;
  }
  if (object.Address.length < 5) {
    res.status(400).send("Provide an Address");
    return false;
  }
  if (object.Country.length < 4) {
    res.status(400).send("Country is required");
    return false;
  }
  if (object.State.length < 4) {
    res.status(400).send("State is required");
    return false;
  }

  return true;
};

function validateRegistration(object, res) {
  if (!object.Email) {
    res.status(400).send("Email is required");
    return false;
  }
  if (!object.Password) {
    res.status(400).send("Password required");
    return false;
  }
  if (object.Email.length < 1) {
    res.status(400).send("Email is required");
    return false;
  }
  if (!object.Email.includes("@")) {
    res.status(400).send("Email is not valid");
    return false;
  }
  if (object.Password.length < 6) {
    res.status(400).send("Weak password");
    return false;
  }
  return true;
}

const validateOrder = (object, res) => {
  if (!object.Source) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.CUSS_ID) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.orderTime) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.DeliveryMode) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.Address) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.OrderStatus) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.FullfilmentFee) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.DeliveryCharge) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.AddittionalInfo) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.Subtotal) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.TotalAmount) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.PaymentMethod) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.Customer) {
    res.status(400).send("All fields required");
    return false;
  }
  if (!object.Products) {
    res.status(400).send("All fields required");
    return false;
  }

  return true;
};

function validateLogin(object, res) {
  if (object.Email.length < 1) {
    res.status(400).send("Email is required");
    return false;
  }
  if (!object.Email.includes("@")) {
    res.status(400).send("Email is not valid");
    return false;
  }
  if (object.Password.length < 6) {
    res.status(400).send("Weak password");
    return false;
  }
  return true;
}

function validateEmail(object, res) {
  if (object.Email.length < 1) {
    res.status(400).send("Email is required");
    return false;
  }
  if (!object.Email.includes("@")) {
    res.status(400).send("Email is not valid");
    return false;
  }
  return true;
}

function validateToken(object, res) {
  if (object.Token.length < 20) {
    res.status(400).send("Invalid Token");
    return false;
  }
  return true;
}

/*
        All cities are here
        You can edit cities here.
*/

allCities = () => {
  var cities = [
    {
      country: "Nigeria",
      city: "Yenagoa, Bayelsa state",
      markets: [
        "Opolo Market",
        "Kpansia Market",
        "Azikoro Market",
        "Swali Market",
        "Okaka Market",
        "UPE Market",
      ],
    },
    {
      country: "Nigeria",
      city: "Port-Harcourt, Rivers state",
      markets: [
        "Mile 1 Market",
        "Mile 2 Market",
        "Mile 3 Market",
        "Mile 4 Market",
        "Romuokoro Market",
        "Iwofe Market",
      ],
    },
    {
      country: "Nigeria",
      city: "Ikeja, Lagos state",
      markets: ["Ikeja Market", "Ajah Market", "Abas Market"],
    },
    {
      country: "Ghana",
      city: "Accra",
      markets: ["Accra Market", "Lafin Market", "Papa Market"],
    },
  ];
  return cities;
};

/*
        All Delivery fees are here
        You can set and unset cities with their delivery fees here.
*/

const deliveryFees = () => {
  var list = [
    {
      country: "Nigeria",
      city: "Yenagoa, Bayelsa state",
      price: 1500,
    },
    {
      country: "Nigeria",
      city: "Port-Harcourt, Rivers state",
      price: 2000,
    },
    {
      country: "Nigeria",
      city: "Ikeja, Lagos state",
      price: 3000,
    },
    {
      country: "Ghana",
      city: "Accra",
      price: 500,
    },
  ];
  return list;
};

/*
        All Banner Images are here
        You can set and unset homepage banner images here.
*/

const bannerImages = () => {
  var banner = [
    {
      name: "K",
      imageUrl:
        "https://www.kindpng.com/picc/m/63-630429_png-images-for-banner-transparent-png.png",
    },
    {
      name: "P",
      imageUrl:
        "https://www.kindpng.com/picc/m/72-720162_banner-name-vector-png-transparent-png.png",
    },
    {
      name: "F",
      imageUrl:
        "https://www.pngitem.com/pimgs/m/52-523465_pink-banner-png-green-ribbon-banner-png-transparent.png",
    },
  ];
  return banner;
};

/*
        All Countries
*/

const allCountries = () => {
  var countries = ["Nigeria", "Ghana", "Togo"];
  return countries;
};

module.exports = {
  validateAddress,
  validateRegistration,
  validateLogin,
  validateEmail,
  validateToken,
  validateOrder,
  allCities,
  deliveryFees,
  bannerImages,
  allCountries,
};
