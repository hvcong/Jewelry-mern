import "./PaymentPage.scss";

import { useEffect, useState } from "react";
import PaymentInfor from "./PaymentInfor/PaymentInfor";
import PaymentInvoice from "./PaymentInvoice/PaymentInvoice";
import { usePaymentContext } from "../../store/contexts/PaymentContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useCartContext } from "../../store/contexts/CartContext";
import { useAuthContext } from "../../store/contexts/AuthContext";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import orderApi from "../../api/orderApi";
export function isVietnamesePhoneNumberValid(number) {
  return /0(3|5|7|8|9)+([0-9]{8})\b/.test(number);
}

function PaymentPage({ navigation }) {
  const navigate = useNavigate();
  const { account, cart, amountMoney, paymentOke } = useGlobalContext();
  const [inputState, setInputState] = useState({
    name: "cong",
    phonenumber: "0869231352",
    address: "1/2 ",
    more: "",
  });

  const [errMessage, setErrMessage] = useState({
    name: "",
    phonenumber: "",
    address: "",
    more: "",
  });
  useEffect(() => {
    if (!account.isLogin) {
      toast.warning("Vui lòng đăng nhập trước");
      navigate("/login");
    }
  }, [account]);

  useEffect(() => {
    if (cart && cart.items.length === 0) {
      navigate("/products/all");
    }
  }, [cart]);

  async function submitPayment() {
    let _errMess = {};
    let isCheck = true;
    const { name, phonenumber, address, more } = inputState;

    if (!name) {
      _errMess.name = "Không được bỏ trống!";
      isCheck = false;
    } else if (!name.trim()) {
      _errMess.name = "Không hợp lệ!";
      isCheck = false;
    }

    if (!address) {
      _errMess.address = "Không được bỏ trống!";
      isCheck = false;
    } else if (!address.trim()) {
      _errMess.address = "Không hợp lệ!";
      isCheck = false;
    }

    if (!phonenumber) {
      _errMess.phonenumber = "Không được bỏ trống!";
      isCheck = false;
    } else if (!phonenumber.trim()) {
      _errMess.phonenumber = "Không hợp lệ!";
      isCheck = false;
    } else {
      if (!isVietnamesePhoneNumberValid(phonenumber)) {
        _errMess.phonenumber = "Không hợp lệ!";
        isCheck = false;
      }
    }

    if (isCheck) {
      let res = await orderApi.addOne({});

      if (res.message) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      } else {
        paymentOke();
        toast.success("Đặt hành thành công!");
      }
    }
    setErrMessage(_errMess);
  }

  return (
    <div className="container p-3 payment__page-container">
      <div className="row">
        <div className="col-12 col-md-6">
          <PaymentInfor
            inputState={inputState}
            setInputState={setInputState}
            errMessage={errMessage}
          />
        </div>
        <div className="col-12 col-md-6">
          <PaymentInvoice submitPayment={submitPayment} />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
