import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { IoMdHome } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { HiShoppingCart } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import Logo from "/marketshare.svg";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { ShopContext } from "./shopcontext";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => !!state.user._id);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("token");
  //const [searchText, setSearchText] = useState("");
  const { totalCartProducts } = useContext(ShopContext);
  const [totalProductsInCart, setTotalProductsInCart] =
    useState(totalCartProducts);
  //const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutRedux());
  };
  /*const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
*/
  useEffect(() => {
    setTotalProductsInCart(totalCartProducts);

    axios
      .get(`${apiBaseUrl}/user/cart/total?Email=${user.Email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { totalProductsInCart } = response.data;
        setTotalProductsInCart(totalProductsInCart);
      })
      .catch((error) => {
        console.error("Error fetching total products in cart:", error);
      });
  }, [user, accessToken, totalCartProducts]);

  /* const handleSearch = async (e) => {
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
  }; */

  const handleMenuToggle = () => {
    console.log("Before toggle - mobileMenuOpen:", mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
    console.log("After toggle - mobileMenuOpen:", mobileMenuOpen);
  };

  /* useEffect(() => {
    const closeMobileMenu = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Add event listener to close the mobile menu when clicking outside
    document.addEventListener("click", closeMobileMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeMobileMenu);
    };
  }, [mobileMenuOpen]); */

  return (
    <div className="bg-white  ">
      <div className=" container mx-auto px-10 py-2 flex flex-row justify-between align-middle items-center">
        <div className="flex flex-row align-middle gap-2 items-center">
          <img src={Logo} alt="logo" className="md:w-[30px] w-[40px]" />
        </div>
        <div className="block md:hidden">
          <button onClick={handleMenuToggle}>
            <FaBars size={18} color="#000" onClick={handleMenuToggle} />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-12 right-6 mt-2 py-2 w-[300px] bg-white shadow-sm shadow-[#00BF63] border rounded z-10">
              <div
                className={`${
                  mobileMenuOpen ? "flex" : "hidden"
                } md:hidden flex-col h-full p-5 w-[300px] z-10 mt-0`}
              >
                <div className="mt-3 flex flex-col gap-6">
                  <Link
                    to="/"
                    className="text-black cursor-pointer font-Montserrat text-[12px]"
                  >
                    Home
                  </Link>
                  <div
                    className={
                      location.pathname === "cart" ? "active " : "not-active"
                    }
                  >
                    <Link
                      onClick={toggleMenu}
                      to="/cart"
                      className="text-black cursor-pointer font-Montserrat text-[12px] relative"
                    >
                      Cart
                      <div>
                        <div>
                          <b>
                            <div className="absolute -top-2 -right-6">
                              <div className="bg-[#b50000] rounded-full p-2.5 relative">
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

                  <Link
                    href="Orders"
                    className="text-black cursor-pointer font-Montserrat text-[12px]"
                  >
                    Orders
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      className="text-black cursor-pointer font-Montserrat text-[12px]"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      to="login"
                      className="text-black cursor-pointer font-Montserrat text-[12px]"
                    >
                      Account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-row gap-10 md:flex hidden"></div>

        <div className="md:flex hidden flex-row gap-10 items-center">
          <Link
            to="/"
            className="text-black flex flex-col items-center cursor-pointer font-Montserrat text-[12px]"
          >
            <IoMdHome color="#008605" size={18} />
            Home
          </Link>
          <div
            className={location.pathname === "cart" ? "active " : "not-active"}
          >
            <Link
              to="/cart"
              className="text-black cursor-pointer font-Montserrat text-[12px] relative flex items-center"
            >
              <HiShoppingCart color="#727272" size={18} />
              <span>Cart</span>
              <div className="-top-2 absolute">
                <div className="ml-2 bg-[#b50000] rounded-full px-1 py-0 relative">
                  <span className="text-white flex items-center justify-center text-xs font-normal">
                    {totalProductsInCart}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <Link
            to="/order"
            className="text-black flex flex-col items-center cursor-pointer font-Montserrat text-[12px]"
          >
            <CiBookmark color="#727272" size={18} />
            Orders
          </Link>
          <Link
            to="/Login"
            className="text-black flex flex-col items-center  cursor-pointer font-Montserrat text-[12px]"
          >
            <FaUser color="#727272" size={18} />
            Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
