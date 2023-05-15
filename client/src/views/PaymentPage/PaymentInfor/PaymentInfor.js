import { useState } from "react";
import "./PaymentInfor.scss";

function PaymentInfor({ inputState, setInputState, errMessage }) {
  const { name, phonenumber, address, more } = inputState;

  function handleOnChangeInput(e) {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="information__container">
      <div className="row">
        <div className="col-12 infor__heading">THÔNG TIN THANH TOÁN</div>
        <div className="col-12 col-lg-6">
          <label htmlFor="name">Tên *</label>
          <input
            className="name__input"
            name="name"
            id="name"
            placeholder="Ví dụ: Hoàng Văn Công"
            value={name}
            onChange={handleOnChangeInput}
          />
          <div className="message">{errMessage.name}</div>
        </div>
        <div className="col-12 col-lg-6">
          <label htmlFor="phonenumber">Số điện thoại *</label>
          <input
            className="phonenumber__input"
            type="number"
            name="phonenumber"
            id="phonenumber"
            placeholder="Số điện thoại nhận hàng"
            value={phonenumber}
            onChange={handleOnChangeInput}
          />
          <div className="message">{errMessage.phonenumber}</div>
        </div>

        <div className="col-12">
          <label htmlFor="address">Địa chỉ *</label>
          <input
            className="address__input"
            type="text"
            name="address"
            id="address"
            placeholder="Ví dụ: số nhà 7, đường số 9, Hiệp Bình Chánh"
            value={address}
            onChange={handleOnChangeInput}
          />
          <div className="message">{errMessage.address}</div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfor;
