import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "./ImagetoBase64";
import { apiBaseUrl } from "../../config";
import Swal from "sweetalert2"; // Import SweetAlert

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    brand: "",
  });
  console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    // console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, category, price, brand } = data;

    if (name && image && category && price && brand) {
      const fetchData = await fetch(`${apiBaseUrl}/admin/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      const fetchRes = await fetchData.json();

      if (fetchRes.success) {
        // Show a success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product saved successfully!",
        });

        setData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            brand: "",
          };
        });
      } else {
        toast("Enter required Fields");
      }
    }
  };
  return (
    <div className="p-4">
      <div className="py-32">
        <form
          className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white "
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type={"text"}
            name="name"
            className="bg-slate-200 p-1 my-1"
            onChange={handleOnChange}
            value={data.name}
          />

          <label htmlFor="category">Category</label>
          <select
            className="bg-slate-200 p-1 my-1 outline-none"
            id="category"
            name="category"
            onChange={handleOnChange}
            value={data.category}
          >
            <option value={"other"}>select category</option>
            <option value={"Beverages"}>Beverages</option>
            <option value={"Groceries"}>Groceries</option>
            <option value={"Homecare"}>Homecare</option>
            <option value={"Drinks"}>Drinks</option>
          </select>

          <label htmlFor="image">
            Image
            <div className="h-40 w-full  bg-slate-200  rounded flex items-center justify-center cursor-pointer">
              {data.image ? (
                <img
                  src={data.image}
                  className="h-full w-full object-cover bg-center"
                />
              ) : (
                <span className="text-5xl">
                  <BsCloudUpload />
                </span>
              )}

              <input
                type={"file"}
                accept="image/*"
                id="image"
                onChange={uploadImage}
                className="hidden"
              />
            </div>
          </label>

          <label htmlFor="price" className="my-1">
            Price
          </label>
          <input
            type={"text"}
            className="bg-slate-200 p-1 my-1"
            name="price"
            onChange={handleOnChange}
            value={data.price}
          />

          <label htmlFor="brand">Brand</label>
          <textarea
            rows={2}
            value={data.brand}
            className="bg-slate-200 p-1 my-1 resize-none"
            name="brand"
            onChange={handleOnChange}
          ></textarea>

          <button
            type="submit"
            className="bg-[#008605] hover:bg-[#2c6f2e] text-white text-lg font-medium my-2 drop-shadow border-none outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newproduct;
