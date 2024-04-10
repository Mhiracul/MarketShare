import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ShopContext } from "../components/shopcontext";
import { apiBaseUrl } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProductsPage = () => {
  const location = useLocation();
  const { category, products } = location.state;

  const { viewProductDetails, cartItems, addToCart } = useContext(ShopContext);
  const user = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("token");

  const addToCartServer = async (productId) => {
    try {
      if (!accessToken) {
        console.error("User not authenticated.");
        return;
      }
      const product = products.find((product) => product._id === productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
      }
      //console.log("Product:", product);

      const requestBody = {
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        Email: user.Email,
        ProductPrice: product.ProductPrice,
        ProductImage: product.ProductImage,
        Quantity: 1,
        Status: "Pending",
        VendorEmail: product.Vendor.email,
        VendorName: product.Vendor.name,
        VendorPhone: product.Vendor.phone,
        VendorMarket: product.Vendor.market,
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
      // console.log("Response:", response);

      if (response.status === 200) {
        // Product added to cart successfully
        addToCart(productId); // Dispatch the action to update cart state in Redux
        toast.success("Product added to cart successfully");
      } else {
        toast.error("Error: Product could not be added to cart");
      }
    } catch (error) {
      //console.error("Error:", error);
      //console.error("Response data:", error.response?.data);
      toast.error(error.response?.data);
    }
  };

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
    <>
      <Header />
      <ToastContainer />

      <section className="shop-banner p-5">
        <div className="container-xxl">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6 text-center">
              <div className="shop-details">
                <h1 className="text-black">
                  <b className="t text-[#373737]">{category}</b>
                </h1>
                <p className="text-black text-xs ">
                  Make your orders we will deliver..
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-bold mb-8">Products in {category}</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 w-full ml-8  gap-2 mt-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded">
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
                          addToCartServer(product._id, 1);
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
      <Footer />
    </>
  );
};

export default ProductsPage;
