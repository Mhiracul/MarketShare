/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopContext } from "./shopcontext";
import { RiDeleteBack2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
const cartitem = (props) => {
  const { id, name, price, image, brand } = props.data;
  const { addToCart, cartItems, removeToCart, updateCartItemCount, itemPrice } =
    useContext(ShopContext);
  const itemsInStock =
    id === 0 ? Math.ceil(((id + 2.5) * 102) / 2) : Math.ceil((id * 102.5) / 2);
  const quantity = props.quantity;
  const subtotal = price * quantity;

  return (
    <>
      <tr>
        {" "}
        <td>
          <div className="container ">
            <div className="">
              <div className="">
                <div className="p-3">
                  <div className="cart-item-image m-auto">
                    <img
                      src={image}
                      className="card-img-top img-fluid"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td className="md:font-bold font-medium md:text-sm text-xs px-4 py-2 align-middle  text-[#008605]">
          {name}
        </td>
        <td className="md:font-bold font-medium md:text-sm text-xs px-4 py-2 align-middle  text-[#008605]">
          ${price}
        </td>
        <td className="md:font-bold font-medium md:text-sm text-xs px-4 py-2 align-middle text-[#008605]">
          <div className="count-handler">
            <button className="rounded-full" onClick={() => addToCart(id)}>
              +
            </button>
            <input
              className=" form-control text-xs"
              value={cartItems[id]}
              onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            />
            <button className=" rounded-full" onClick={() => removeToCart(id)}>
              -
            </button>
          </div>
        </td>
        <td
          className=" font-bold px-4 py-2 align-middle text-[#008605]"
          onClick={() => removeToCart(id)}
        >
          <AiOutlineDelete size={20} />
        </td>
      </tr>
    </>
  );
};

export default cartitem;
