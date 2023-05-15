import "./PaymentInvoice.scss";

import { useEffect, useState } from "react";
import { useCartContext } from "../../../store/contexts/CartContext";
import { parsePriceToString } from "../../../utils";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function PaymentInvoice({ submitPayment }) {
  const { cart, amountMoney } = useGlobalContext();

  let discountMoney = amountMoney.subTotal - amountMoney.total;

  return (
    <div className="invoice__container">
      <div className="invoice__heading">ĐƠN HÀNG CỦA BẠN</div>
      <div className="invoice__group invoice__group-heading">
        <div className="invoice__group-left text-bold">SẢN PHẨM</div>
        <div className="invoice__group-right text-bold">TỔNG</div>
      </div>

      {cart.items && cart.items.length > 0
        ? cart.items.map(({ product, quantity }) => {
            let { name, price, id, sale } = product;
            price = (price - (price / 100) * sale) * quantity;

            return (
              <div className="invoice__group" key={id}>
                <div className="invoice__group-left">
                  {name}
                  <b>× {quantity}</b>
                </div>
                <div className="invoice__group-right text-no-wrap">
                  {parsePriceToString(price)}đ
                </div>
              </div>
            );
          })
        : "0"}

      <div className="invoice__group">
        <div className="invoice__group-left text-bold">Tổng phụ</div>
        <div className="invoice__group-right text-bold text-no-wrap">
          {parsePriceToString(amountMoney.subTotal)} đ
        </div>
      </div>

      <div className="invoice__group">
        <div className="invoice__group-left text-bold">
          Tổng tiền đã giảm giá
        </div>
        <div className="invoice__group-right text-bold text-no-wrap">
          {discountMoney > 0 && "-"}
          {parsePriceToString(discountMoney)} đ
        </div>
      </div>

      <div className="invoice__group">
        <div className="invoice__group-left text-bold">Tổng</div>
        <div className="invoice__group-right text-bold text-no-wrap">
          {parsePriceToString(amountMoney.total)}đ
        </div>
      </div>

      <div className="invoice__group invoice__group-btn">
        <div
          className="invoice__btn"
          onClick={() => {
            submitPayment();
          }}
        >
          ĐẶT HÀNG
        </div>
      </div>
    </div>
  );
}

export default PaymentInvoice;
