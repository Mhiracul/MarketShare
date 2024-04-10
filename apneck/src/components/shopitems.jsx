import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./shopcontext";
import { Link } from "react-router-dom";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Shopitems = () => {
  const [products, setProducts] = useState([]);
  const { viewProductDetails, cartItems, addToCart } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("token");

  const addToCartServer = async (productId) => {
    try {
      if (!accessToken) {
        // Check if the user is authenticated
        console.error("User not authenticated.");
        // Handle this case, e.g., redirect to login
        return;
      }
      const product = products.find((product) => product._id === productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
      }
      console.log("Product:", product); // Log the product object to the console

      const requestBody = {
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        Email: user.Email,
        ProductPrice: product.ProductPrice,
        ProductImage: product.ProductImage,
        Quantity: 1, // Assuming you always add 1 quantity
        Status: "Pending",
        VendorEmail: product.Vendor.email, // Use product.Vendor.email
        VendorName: product.Vendor.name, // Use product.Vendor.name
        VendorPhone: product.Vendor.phone, // Use product.Vendor.phone
        VendorMarket: product.Vendor.market, // Use product.Vendor.city
      };

      console.log("Request Body:", requestBody);
      console.log("Access Token:", accessToken);
      const response = await axios.post(
        `${apiBaseUrl}/user/post/cart`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Response:", response);

      if (response.status === 200) {
        // Product added to cart successfully
        addToCart(productId); // Dispatch the action to update cart state in Redux
        toast.success("Product added to cart successfully");
      } else {
        toast.error("Error: Product could not be added to cart");
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Response data:", error.response?.data);
      toast.error(error.response?.data);
    }
  };

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [accessToken]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/marketshare/categories/all`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const productsByVendor = {};
  products.forEach((product) => {
    const vendor = product.Vendor;
    const vendorKey = `${vendor.name}-${vendor.city}`;
    if (!productsByVendor[vendorKey]) {
      productsByVendor[vendorKey] = {
        vendor,
        products: [],
      };
    }
    productsByVendor[vendorKey].products.push(product);
  });

  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="flex  bg-white  py-3">
        <div className="w-1/4 h-full ml-8 left-0 top-0 z-999999 lg:flex flex-col md:flex hidden overflow-y-auto bg-white p-2 ">
          <h1 className="text-black uppercase font-bold text-xl">
            product category
          </h1>{" "}
          <div className="flex mt-1">
            <div className="bg-[#008605] w-20 h-0.5 flex-[0,0,1px]"></div>
            <div className="bg-[#ccc] w-5 h-0.5 flex-1"></div>
          </div>
          <ul className="mt-3 text-sm mb-4 cursor-pointer">
            {categories.map((category) => (
              <li
                key={category._id}
                className={`mb-2 ${
                  selectedCategory === category.Name ? "text-[#008605]" : ""
                }`}
                onClick={() => setSelectedCategory(category.Name)}
              >
                {category.Name}
              </li>
            ))}
          </ul>
          <h1 className="text-black uppercase font-bold text-xl">
            Filtered price
          </h1>{" "}
          <div className="flex mt-1">
            <div className="bg-[#008605] w-20 h-0.5 flex-[0,0,1px]"></div>
            <div className="bg-[#ccc] w-5 h-0.5 flex-1"></div>
          </div>
        </div>
        <div className="w-full flex-1 p-2 overflow-y-auto">
          {Object.values(productsByVendor).map((vendorData) => (
            <div key={vendorData.vendor._id} className="">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 w-full ml-8  gap-2 mt-8">
                {vendorData.products.map((product) => (
                  <div key={product._id} className="mb-2 ">
                    <Link className=" m-auto max-w-md ">
                      <div>
                        <img
                          src={product.ProductImage}
                          className="  w-[70%] h-[50%] shadow-md shadow-[#ccc] rounded-md max-w-[80%] img-fluid "
                          alt="..."
                        />
                      </div>

                      <div className=" py-1 mb-3">
                        <div>
                          <h5 className="text-xs mt-1">
                            {product.ProductName}
                          </h5>
                          <h5 className="text-xs mt-1">
                            {product.Vendor.name}
                          </h5>
                          <div className="mb-3">
                            <p className="price mb-1">
                              <span className="red font-bold">
                                ${product.ProductPrice}
                              </span>
                              &nbsp;
                            </p>
                          </div>
                        </div>
                        <div className="inline-flex gap-2  items-center justify-center">
                          <Link
                            to="/details"
                            onClick={() => viewProductDetails(product._id)}
                          >
                            <p>
                              <button
                                className="bg-[#008605] text-white p-1 rounded-none shadow-md"
                                id="clear-cart"
                              >
                                <AiFillEye size={15} />
                              </button>
                            </p>
                          </Link>
                          <div className="flex justify-center">
                            <button
                              onClick={() => {
                                addToCartServer(product._id, 1); // Assuming you want to add 1 quantity
                                event.target.classList.toggle("red");
                              }}
                              className={`bg-[#008605] text-white p-1 inline-flex rounded-none shadow-md ${
                                cartItems[product._id] > 0 ? "text-red-600" : ""
                              }`}
                            >
                              <AiOutlineShoppingCart />{" "}
                              {cartItems[product._id] > 0 &&
                                `(${cartItems[product._id]})`}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shopitems;
