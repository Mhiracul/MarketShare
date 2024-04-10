import { apiBaseUrl } from "../../config";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Shops = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const city = "Yenagoa, Bayelsa state"; // Define the city here or fetch it dynamically if needed
    //console.log("Category:", category);
    //console.log("City:", city);

    // Make a POST request to your backend endpoint here
    fetch(`${apiBaseUrl}/user/find/all_vendors_cat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Category: category,
        City: city,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle response data
        //console.log("Response from backend:", data);
        navigate(`/products?category=${category}`, {
          state: { products: data.products, category: category },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="bg-white w-full h-full ">
      <div className="container mx-auto text-black py-10 px-10">
        <h1 className="text-xl font-bold  mb-8 text-wrap text-black uppercase">
          Shop by stores
        </h1>
        <div className="w-full h-full flex  overflow-x-auto lg:gap-[165px] gap-24 ">
          <div
            className="w-[177px] flex-col justify-center items-center gap-4 inline-flex"
            onClick={() => handleCategoryClick("SuperMarket")}
          >
            <div className="w-[168px] h-[168px] justify-center items-center md:flex-row flex-col flex">
              <div className="w-[168px] h-[168px] relative">
                <div className="w-[168px] h-[168px] absolute left-0 top-0 bg-green-200 shadow-md rounded-full"></div>
                <img
                  src="/supermarket.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] absolute left-[34px] top-[34px]"
                />
              </div>
            </div>
            <h2 onClick={() => handleCategoryClick("SuperMarket")}>
              Supermarkets
            </h2>
          </div>
          <div
            className="w-[177px] flex-col justify-center items-center gap-4 inline-flex"
            onClick={() => handleCategoryClick("Restaurant")}
          >
            <div className="w-[168px] h-[168px] justify-center items-center inline-flex">
              <div className="w-[168px] h-[168px] relative">
                <div className="w-[168px] h-[168px] absolute left-0 top-0 bg-green-200 shadow-md rounded-full"></div>
                <img
                  src="/restaurants.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] absolute left-[34px] top-[34px]"
                />
              </div>
            </div>
            <h2 onClick={() => handleCategoryClick("Restaurant")}>
              Restaurants
            </h2>
          </div>
          <div
            className="w-[177px] flex-col justify-center items-center gap-4 inline-flex"
            onClick={() => handleCategoryClick("Market")}
          >
            <div className="w-[168px] h-[168px] justify-center items-center inline-flex">
              <div className="w-[168px] h-[168px] relative">
                <div className="w-[168px] h-[168px] absolute left-0 top-0 bg-green-200 shadow-md rounded-full"></div>
                <img
                  src="/markets.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] absolute left-[34px] top-[34px]"
                />
              </div>
            </div>
            <h2
              className="font-normal text-sm"
              onClick={() => handleCategoryClick("Market")}
            >
              Market
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
