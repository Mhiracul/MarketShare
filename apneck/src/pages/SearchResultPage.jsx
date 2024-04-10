import { Link, useLocation } from "react-router-dom";
import SearchTop from "../components/SearchTop";

const SearchResultsPage = () => {
  const location = useLocation();
  const results = location.state.results || [];
  return (
    <div>
      <SearchTop />
      {/* Render your search results here */}
      <ul className="mx-auto max-w-screen-xl grid md:grid-cols-3 grid-cols-2 gap-6 px-10 py-3">
        {results.map((product) => (
          <div key={product._id} className="mb-5  mt-8 ">
            <Link className="card h-100 m-auto w-full shadow-md p-2">
              <div className="rate-overlay ">
                <p className="price text-xs ">
                  <span className="red"></span>{" "}
                  <span className="bg-[#008605] text-white  rounded-full px-2">
                    {product.Stock} units {product.StockKG} kg
                  </span>
                </p>
              </div>
              <img
                src={product.ProductImage}
                className="card-img-top w-full img-fluid"
                alt="..."
              />
              <div className=" flex justify-between">
                <div>
                  <p className=" m uppercase">{product.Category}</p>
                  <h5 className="text-xs">{product.ProductName}</h5>
                  <p className="text-xs mt-2">{product.ProductDesc}</p>
                  <div className="mb-3">
                    <p className="price mb-2">
                      <span className="red">${product.ProductPrice}</span>
                      &nbsp;
                      <strike>{product.price * 2}$</strike>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
