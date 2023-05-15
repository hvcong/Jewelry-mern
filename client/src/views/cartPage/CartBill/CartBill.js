import "./CartBill.scss";
import { useCartContext } from "../../../store/contexts/CartContext";
import { parsePriceToString } from "../../../utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePaymentContext } from "../../../store/contexts/PaymentContext";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function CartBill() {
  const { amountMoney, cart } = useGlobalContext();
  console.log(amountMoney);

  let discountMoney = amountMoney.subTotal - amountMoney.total;
  return (
    <div className="cart__bill">
      <div className="cart__bill-heading">TỔNG SỐ LƯỢNG</div>
      <div className="cart__bill-group">
        <div className="cart__bill-label">Tổng phụ</div>
        <div className="cart__bill-price">
          {parsePriceToString(amountMoney.subTotal)} đ
        </div>
      </div>
      {/* <div className='cart__bill-group cart__bill-voucher'>
                <span className="material-icons">
                    sell
                </span>
                <div className='cart__bill-voucher-enter'>
                    <input className='cart__bill-voucher-input'
                        name='voucher'
                        placeholder='Nhập mã giảm giá...'
                        value={vourcherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                    />
                    <div className='cart__bill-voucher-btn'
                        onClick={handleVoucherSubmit}
                    >Áp dụng</div>
                </div>
            </div> */}
      <div className="cart__bill-group cart__bill-voucher-percent">
        <div className="cart__bill-label">Tổng tiền đã giảm</div>
        <div className="cart__bill-price">
          {discountMoney > 0 && "-"}
          {parsePriceToString(discountMoney)} đ
        </div>
      </div>

      <div className="cart__bill-group">
        <div className="cart__bill-label">Tổng</div>
        <div className="cart__bill-price">
          {parsePriceToString(amountMoney.total)} đ
        </div>
      </div>

      {cart && cart.items.length > 0 && (
        <Link to="/payment" className="cart__bill-group cart__bill-btn">
          Tiến hành thanh toán
        </Link>
      )}
    </div>
  );
}

export default CartBill;
