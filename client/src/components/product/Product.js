import "./Product.scss";
import { Link, useNavigate } from "react-router-dom";
import { parsePriceToString } from "../../utils";
import { useCartContext } from "../../store/contexts/CartContext";
import { useAuthContext } from "../../store/contexts/AuthContext";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { useEffect, useState } from "react";

function Product({ product }) {
  const { addToCart, checkIsExistInCart, cart } = useGlobalContext();
  const { imageUri, name, price, sale, id, quantity } = product;
  const navigate = useNavigate();

  const [isExistInCart, setIsExistInCart] = useState(checkIsExistInCart(id));
  useEffect(() => {
    setIsExistInCart(checkIsExistInCart(id));
    return () => {};
  }, [cart]);
  //function

  return (
    <div className="product__wrap">
      <div className={sale ? "notifi__sale" : "d-none"}>
        <span className="notifi__sale-percent">{sale}%</span>
        <span className="notifi__sale-text">SALE</span>
        <span className="notifi__sale-affter"></span>
      </div>

      <Link to={"/products/" + id} className="product__image product__link">
        <img
          src={
            imageUri
              ? imageUri
              : "https://cdn.tgdd.vn/Products/Images/7264/231782/elio-es056-01-nam-2-1-org.jpg"
          }
        />
      </Link>

      <div className="product__body">
        <Link to={"/products/" + id} className="product__title product__link">
          {name}
        </Link>
        <div className="product__price">
          <span className="product__price-current">
            {parsePriceToString(Math.floor(price - (price / 100) * sale))} đ
          </span>
          <span className={sale ? "product__price-old" : "d-none"}>
            <span className="product__price-old-num">
              {parsePriceToString(price)} đ
            </span>
            - {sale}%
          </span>
        </div>
        {quantity > 0 ? (
          <div
            onClick={() => {
              if (isExistInCart) {
                navigate("/cart");
              } else {
                addToCart(product);
              }
            }}
            className={`product__btn ${isExistInCart && "view__cart"}`}
          >
            {isExistInCart ? "Xem giỏ hàng" : "Thêm vào giỏ"}
          </div>
        ) : (
          <div className={`product__btn sout_out`}>Đã hết hàng</div>
        )}
      </div>
    </div>
  );
}

export default Product;
