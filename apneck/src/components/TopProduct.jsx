import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../config";
//import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { MdFavorite } from "react-icons/md";

const TopProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/products`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <div className="w-full h-full">
      <div className="container mx-auto px-10">
        <h1 className="font-bold text-xl text-black">TOP PRODUTS</h1>

        <div className=" flex py-4 overflow-x-auto  w-full gap-10">
          {products.map((product) => (
            <div className="col " key={product.id}>
              <div className="card  w-[300px] h-100 m-auto rounded-md ">
                <div className="rate-overlay">
                  <p className="price text-xs">
                    <span className="red"></span>{" "}
                  </p>
                </div>
                <img
                  src={product.ProductImage}
                  className="w-full h-full"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="mb-0.5 text-sm">{product.ProductName}</h5>
                  <p className="text-xs font-semibold">
                    N{product.ProductPrice}
                  </p>

                  <div className="flex justify-between items-center py-3">
                    <MdFavorite color="#D9D9D9" size={18} />
                    <div className="bg-[#008605] p-2 rounded-md">
                      {" "}
                      <HiShoppingCart color="#fff" size={18} />
                    </div>
                  </div>

                  <div className="card-footer d-md-none">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="shop" className="m-auto">
                        View products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
