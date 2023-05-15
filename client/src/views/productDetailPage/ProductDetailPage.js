import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { useCartContext } from "../../store/contexts/CartContext";
import { parsePriceToString } from "../../utils";
import Comment from "./Comment";
import "./ProductDetailPage.scss";
import QuantityProduct from "../../components/QuantityProduct/QuantityProduct";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../store/contexts/GlobalContext";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { products, cart, addToCart, checkIsExistInCart, changeQuantity } =
    useGlobalContext();
  const [quantity, setQuantity] = useState(1);

  const [isExistInCart, setIsExistInCart] = useState(checkIsExistInCart(id));

  useEffect(() => {
    if (id) {
      let _product = null;
      products.map((item) => {
        if (item.id == id) {
          _product = item;
        }
      });
      setProduct(_product);
    }
    return () => {};
  }, [id]);

  useEffect(() => {
    if (checkIsExistInCart(id)) {
      changeQuantity(id, quantity);
    }
    return () => {};
  }, [quantity]);

  useEffect(() => {
    if (id) {
      cart.items.map((item) => {
        if (item.product.id == id) {
          setQuantity(item.quantity);
        }
      });
    }
    return () => {};
  }, []);

  useEffect(() => {
    setIsExistInCart(checkIsExistInCart(id));
    return () => {};
  }, [cart]);

  if (!product) {
    return <></>;
  }

  const { name, imageUrl, price, sale, category, material, description } =
    product;

  return (
    <div className="product__detail-container container">
      <div className="product__detail-section">
        <div className="product__info row">
          <div className="col-12 col-md-6">
            <img className="product__info-img" src={imageUrl} />
          </div>
          <div className="col-12 col-md-6">
            <div className="product__info-right">
              <div className="product__info-path">
                <Link to="/" className="product__info-path-link">
                  Trang chủ
                </Link>
                /
                <Link to="/products/all" className="product__info-path-link">
                  Sản phẩm
                </Link>
                /
                <Link to="" className="product__info-path-link">
                  {category || "đồng hồ"}
                </Link>
              </div>

              <h2 className="product__info-title">{name}</h2>
              <span className="line"></span>
              <div className="product__info-price-group">
                <span className="product__info-price-current">
                  {sale
                    ? parsePriceToString(
                        Math.floor(price - (price / 100) * sale)
                      )
                    : parsePriceToString(price)}{" "}
                  đ
                </span>
                <span className="product__info-price-old">
                  {sale ? parsePriceToString(price) + " đ" : ""}{" "}
                </span>
              </div>
              <div className="product__info-material">
                <span>Chất liệu: </span>
                <span>{material}</span>
              </div>
              <p className="product__info-des">{description}</p>

              <div className="product__info-group">
                <QuantityProduct
                  quantity={quantity}
                  setQuantity={(number) => {
                    if (number > product.quantity) {
                      toast.warn("Không đủ số lượng");
                    } else {
                      if (number > 0) {
                        setQuantity(number);
                      }
                    }
                  }}
                />
                {isExistInCart ? (
                  <Link
                    to="/cart"
                    className="product__info-btn"
                    style={{ backgroundColor: "green", textDecoration: "none" }}
                    onClick={async () => {}}
                  >
                    Xem giỏ hàng
                  </Link>
                ) : (
                  <div
                    className="product__info-btn"
                    onClick={async () => {
                      addToCart(product, quantity);
                    }}
                  >
                    Thêm vào giỏ hàng
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
