import { useContext, useEffect, useState } from "react";
//import axios from "axios";
import { apiBaseUrl } from "../../config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/products/marketsare.png";
import { BsBagFill, BsSearch } from "react-icons/bs";
import { ShopContext } from "./shopcontext";
import axios from "axios";
import { logoutRedux } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";

const ProductSearch = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiBaseUrl}/user/product/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: searchText }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/results", { state: { results: data } });
      } else {
        console.error("Search failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const location = useLocation();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Access the user's authentication state from Redux
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => !!state.user._id);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("token");
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const [showMenu, setShowMenu] = useState(false);
  // Function to handle logout
  const handleLogout = () => {
    // Dispatch the logoutRedux action to log the user out
    dispatch(logoutRedux());
  };

  // Close the dropdown when clicking outside of it

  const { totalCartProducts } = useContext(ShopContext);

  // Use totalCartProducts to display cart count in the UI
  const [totalProductsInCart, setTotalProductsInCart] =
    useState(totalCartProducts);

  useEffect(() => {
    // Update the totalProductsInCart when totalCartProducts changes
    setTotalProductsInCart(totalCartProducts);

    // Make the API call to update the backend
    axios
      .get(`${apiBaseUrl}/user/cart/total?Email=${user.Email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Update the totalProductsInCart based on the API response
        const { totalProductsInCart } = response.data;
        setTotalProductsInCart(totalProductsInCart);
      })
      .catch((error) => {
        console.error("Error fetching total products in cart:", error);
      });
  }, [user, accessToken, totalCartProducts]);

  return (
    <div>
      <div className="px-14 relative" style={{ zIndex: 9999 }}>
        <div className="flex items-center gap-7 lg:hidden md:hidden w-full mt-1 py-4">
          <div
            onClick={handleClick}
            className={`${
              nav ? "absolute" : ""
            } top-8 left-4 z-[99999] cursor-pointer`}
          >
            {" "}
            {!nav ? (
              <FaBars color="#008605" size={20} />
            ) : (
              <FaTimes color="#008605" size={20} />
            )}
          </div>
          <Link to="/">
            <img src={logo} alt="logo" className="img-fluid logo" />
          </Link>
        </div>

        {/* Mobile menu */}
        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0  left-0 w-full uppercase px-4 py-7 mt-14 bg-[#fff] flex flex-col gap-4 justify-center items-start"
          }
        >
          <Link to="/" className="text-[#008605]">
            <li className="text-[13px] font-[800]  uppercase pb-2">Home</li>
          </Link>

          <Link to="/shop" className="text-[#008605]">
            <li className="text-[13px] uppercase font-[800]  pb-2">Shop</li>
          </Link>

          <Link to="/order" className="text-[#008605]">
            <li className="text-[13px] uppercase font-[800]  pb-2">Orders</li>
          </Link>

          {/* Conditional rendering based on user's role */}

          {/* Show "Login" or "Logout" based on isLoggedIn state */}
          {isLoggedIn ? (
            <li
              className="text-[13px] uppercase text-[#008605] font-[800]  pb-2"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <Link to="/login" className="text-[#008605]">
              <li className="text-[13px] uppercase font-[800] pb-2">Login</li>
            </Link>
          )}

          <div
            className={location.pathname === "cart" ? "active " : "not-active"}
          >
            <Link
              onClick={toggleMenu}
              to="/cart"
              className="d-flex items-center color-nav  cart-span-one  mr-3 bg-[#F0F2F8] rounded-full p-2  relative"
            >
              <BsBagFill color="#000" size={20} className="" />
              <div>
                <div>
                  <b>
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#b50000] rounded-full p-2 relative">
                        <div className="text-white absolute inset-0 flex items-center text-xs font-normal  justify-center">
                          {totalProductsInCart}
                        </div>
                      </div>
                    </div>
                  </b>
                </div>
              </div>
            </Link>
          </div>
          {/* Show "Join now" or "Logout" based on isLoggedIn state */}
        </ul>
      </div>
      <div className="md:flex hidden justify-between mx-auto max-w-screen-xl px-12 py-3">
        <Link to="/">
          <img src={logo} alt="logo" className="img-fluid logo" />
        </Link>
        <div className="mx-auto max-w-screen-2xl  w-1/2 lg:flex md:flex hidden">
          <div className="border px-6 w-4/5 py-1  flex ">
            <input
              type="text"
              placeholder="Search products, categories"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-black bg-transparent text-sm w-full"
            />
          </div>

          <button
            onClick={handleSearch}
            className="rounded-none text-white p-3"
          >
            <BsSearch size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
