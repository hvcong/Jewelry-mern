import "./PaymentSuccessPage.scss";
import { usePaymentContext } from "../../store/contexts/PaymentContext";
import { parsePriceToString } from "../../utils/index";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

function PaymentSuccess() {
  const navigate = useNavigate();

  const location = useLocation();
  const { cart, inputState, amountMoney } = location.state;
  //function
  function getTotalPrice(products) {
    if (products && products.length > 0) {
      return products.reduce((total, product) => {
        const { price, sale } = product;
        const { quantity } = product;

        return total + (price - (price / 100) * sale) * quantity;
      }, 0);
    }
    return 0;
  }

  return (
    <div className="container payment__success">
      <div className="row">
        <div className="col-12 col-md-7 order-1 order-md-0">
          <div className="payment__success-bill">
            <div className="payment__success-bill-heading">
              CHI TIẾT HÓA ĐƠN
            </div>
            <div className="payment__success-bill-body">
              <div className="payment__success-bill-group">
                <div className="payment__success-bill-left">SẢN PHẨM</div>
                <div className="payment__success-bill-right">TỔNG</div>
              </div>
              {cart.items && cart.items.length > 0
                ? cart.items.map(({ product, quantity }) => {
                    let { name, price, id, sale } = product;

                    price = (price - (price / 100) * sale) * quantity;
                    return (
                      <div className="payment__success-bill-group" key={id}>
                        <div className="payment__success-bill-left light-text">
                          {name}
                          <b>× {quantity}</b>
                        </div>
                        <div className="payment__success-bill-right text-nowrap">
                          {parsePriceToString(price)}đ
                        </div>
                      </div>
                    );
                  })
                : ""}
              <div className="payment__success-bill-group">
                <div className="payment__success-bill-left">Tổng phụ:</div>
                <div className="payment__success-bill-right text-nowrap">
                  {parsePriceToString(amountMoney.subTotal)} đ
                </div>
              </div>

              <div className="payment__success-bill-group">
                <div className="payment__success-bill-left">
                  Tổng tiền đã giảm giá:{" "}
                </div>
                <div className="payment__success-bill-right">
                  {parsePriceToString(amountMoney.subTotal - amountMoney.total)}
                </div>
              </div>

              <div className="payment__success-bill-group">
                <div className="payment__success-bill-left">Tổng cộng:</div>
                <div className="payment__success-bill-right text-nowrap">
                  {parsePriceToString(amountMoney.total)} đ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5">
          {/* <div className='payment__success-message'>
                        <p className="payment__success-heading">Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</p>
                        <ul className="payment__success-list">
                            <li>Mã đơn hàng: <b>{id}</b></li>
                            <li>Ngày: <b> {createdAt}</b></li>
                            <li>Người nhận hàng: <b>{name}</b></li>
                            <li>Địa chỉ: <b>{address}</b></li>
                            <li>Tổng cộng: <b>{parsePriceToString(getTotalPrice(products) / 100 * (100 - voucherPercent) - transportFee)} đ</b></li>
                            <li>Phương thức thanh toán: <b>{
                                payBy === 'byCash' ? 'Trả tiền mặt khi nhận hàng' : 'Thanh toán bằng hình thức chuyển khoản'
                            }</b></li>
                        </ul>

                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
