import "./CartList.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../store/contexts/CartContext";
import CartListItem from "./CartListItem/CartListItem";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function CartList() {
  const {
    products,
    minusProductInCart,
    plusProductInCart,
    removeProductFromCart,
  } = useCartContext();
  const { cart } = useGlobalContext();

  let items = cart?.items || [];

  return (
    <div className="cart__list-container">
      <table className="cart__table">
        <tr>
          <th colSpan={3}>Sản phẩm</th>
          <th className="d-none d-sm-block">Giá</th>
          <th>Số lượng</th>
          <th className="d-none d-sm-block">Tổng</th>
        </tr>
        {items &&
          items.length > 0 &&
          items.map((cartItem, index) => {
            return <CartListItem data={cartItem} key={index} />;
          })}
      </table>

      <div className="cart__list-bottom">
        <Link to="/products/all" className="cart__list-bottom-btn">
          <span className="material-icons">west</span>
          Tiếp tục xem sản phẩm
        </Link>
      </div>
    </div>
  );
}

export default CartList;
