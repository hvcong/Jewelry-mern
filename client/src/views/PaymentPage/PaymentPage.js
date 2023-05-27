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
  const { account, cart, amountMoney, paymentOke, loadAllData } =
    useGlobalContext();
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
      navigate("/products/category/all");
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
      let res = await orderApi.addOne({
        phoneNumber: inputState.phonenumber,
        address: inputState.address,
        orderDate: new Date(),
        state: "pendding",
        cost: amountMoney.total,
        account: { id: account.id },
        orderDetails: cart.items.map((item) => {
          return {
            quantity: item.quantity,
            price: item.product.price,
            sale: item.product.sale,
            product: { id: item.product.id },
          };
        }),
      });

      if (res.message) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      } else {
        for (const cartItem of cart.items) {
          await orderApi.updateProduct({
            ...cartItem.product,
            quantity: cartItem.product.quantity - cartItem.quantity,
          });
        }

        await paymentOke();
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
