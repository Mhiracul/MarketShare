import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiBaseUrl } from "../../config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ShopContext } from "./shopcontext";
import { useSelector } from "react-redux";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import { IoFilter } from "react-icons/io5";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const ByCategories = () => {
  const [products, setProducts] = useState([]);
  const { viewProductDetails, cartItems, addToCart } = useContext(ShopContext);
  const user = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("token");
  const [sortBy, setSortBy] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(12); // Initial number of displayed products

  const addToCartServer = async (productId) => {
    try {
      if (!accessToken) {
        // Check if the user is authenticated
        console.error("User not authenticated.");
        toast.error("Please log in to add the product to the cart.");

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
      if (error.response && error.response.status === 403) {
        toast.error("Forbidden: Please log in to add the product to the cart.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
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

  const sortProducts = (sortBy) => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.ProductPrice - b.ProductPrice);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.ProductPrice - a.ProductPrice);
        break;
      default:
        // No sorting, keep products as they are
        break;
    }
    setProducts(sortedProducts);
  };

  const handleSortChange = (option) => {
    // Handle change in sorting option
    setSortBy(option.value);
    sortProducts(option.value);
  };
  const loadMoreProducts = () => {
    setDisplayedProducts((prev) => prev + 12); // Increase the number of displayed products by 4
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto md:px-10 px-4 py-20">
        <div className="flex justify-between items-center">
          <div className="flex lg:gap-4 md:gap-4 gap-4">
            <div className="flex gap-2 border p-2 cursor-pointer items-center hover:bg-[#ededed] border-black">
              <p className="text-xs">Categories</p> <IoFilter />
            </div>
            <Dropdown
              className="flex gap-2 border text-xs p-1 items-center hover:bg-[#ededed] cursor-pointer border-black"
              options={[
                { value: "lowToHigh", label: "Low to High" },
                { value: "highToLow", label: "High to Low" },
              ]}
              onChange={handleSortChange}
              value={sortBy}
              placeholder="Sort by"
            />
          </div>
          <div
            className="lg:flex md:flex hidden gap-2 border  p-2 items-center hover:bg-[#ededed] cursor-pointer border-black"
            onClick={loadMoreProducts}
          >
            <p className="text-xs">More</p> <IoFilter />
          </div>
        </div>

        <div className="w-full flex-1 py-4 overflow-y-auto">
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 w-full  gap-2 mt-8">
            {products.slice(0, displayedProducts).map((product, index) => (
              <div key={product._id || index} className="mb-2 ">
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
                      <h5 className="text-xs mt-1">{product.ProductName}</h5>
                      <h5 className="text-xs mt-1">{product.Vendor.name}</h5>
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

        <div
          className="lg:flex md:flex flex justify-center  max-w-md mx-auto  hover:border-[#f5f5f5]  gap-2  cursor-pointer hover:bg-[#ededed] border p-2 items-center border-black"
          onClick={loadMoreProducts}
        >
          <p className="text-xs ">Load More Items</p> <IoFilter />
        </div>
      </div>
    </div>
  );
};

export default ByCategories;
