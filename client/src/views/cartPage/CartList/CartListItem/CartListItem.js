import { useState } from "react";
import { Link } from "react-router-dom";
import QuantityProduct from "../../../../components/QuantityProduct/QuantityProduct";
import { parsePriceToString } from "../../../../utils";
import { useGlobalContext } from "../../../../store/contexts/GlobalContext";
import { toast } from "react-toastify";

function CartListItem({ data }) {
  const { name, price, imageUrl, id, sale } = data.product;
  const quantity = data.quantity;

  const { changeQuantity } = useGlobalContext();

  async function handleSetQuantityLocal(number) {
    if (number > data.product.quantity) {
      toast.warn("Không đủ số lượng");
    } else {
      changeQuantity(id, number);
    }
  }

  return (
    <tr>
      <td className="cart__table-item-close-btn">
        <span
          className="material-icons"
          onClick={() => {
            changeQuantity(id, 0);
          }}
        >
          cancel
        </span>
      </td>
      <td className="cart__table-item-img-wrap">
        <Link to={`/products/${id}`}>
          <img
            src={
              "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all"
            }
          />
        </Link>
      </td>
      <td className="cart__table-item-name">
        <Link to={`/products/${id}`}>{name}</Link>
        <div className="cart__table-item-price-mobile d-sm-none d-block">
          {quantity} x{" "}
          <b>{parsePriceToString(price - (price / 100) * sale)} đ</b>
        </div>
      </td>
      <td className="cart__table-item-price d-none d-sm-block">
        <span className="cart__table-item-price-current">
          {parsePriceToString(price - (price / 100) * sale)} đ
        </span>
        <span className="cart__table-item-price-old">
          {parsePriceToString(price)} đ
        </span>
      </td>
      <td className="cart__table-item-quatity">
        <QuantityProduct
          quantity={quantity}
          setQuantity={handleSetQuantityLocal}
        />
      </td>
      <td className="cart__table-item-price d-none d-sm-block">
        {parsePriceToString((price - (price / 100) * sale) * quantity)} đ
      </td>
    </tr>
  );
}

export default CartListItem;
