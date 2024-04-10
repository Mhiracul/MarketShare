import axios from "axios";
import { apiBaseUrl } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get(`${apiBaseUrl}/marketshare/categories/all`)
      .then((response) => {
        setCategories(response.data); // Assuming your response data is an array of categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="py-10 container-xxl shadow-md rounded-md">
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-1 mb-5">
          <div className="flex mb-3 justify-between items-center">
            <h1 className="text-2xl  font-bold  text-black uppercase">
              Featured Category
            </h1>

            <button className="bg-[#008605] uppercase rounded-none mb-1 text-white text-xs font-medium">
              <Link to="/shop">View all</Link>
            </button>
          </div>
          <div className="w-full h-1 bg-[#7bb87d] "></div>
        </div>

        <div className="grid grid-cols-1 mt-1 md:grid-cols-2  lg:grid-cols-6 gap-4 ">
          {categories.map((category) => (
            <div key={category._id} className="col  ">
              <div className="">
                <img src={category.Image} alt="" className="w-full h-auto" />
                <div className="ottom-0 left-0 w-full h-20 bg-[#008605] flex items-center justify-center">
                  <p className="text-center text-white text-2xl font-bold">
                    {category.Name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
