import "./ProductPageNav.scss";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { parsePriceToString } from "../../../utils";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function ProductPageNav(props) {
  const {
    filterPrice,
    category,
    setFilterPrice,
    maxPriceInit,
    setIsOpenNavModal,
    minPriceInit,
  } = props;

  const { categories } = useGlobalContext();

  const [rangeInput1, setRangeInput1] = useState(0);
  const [rangeInput2, setRangeInput2] = useState(100);

  function percentToPrice(percent) {
    return Math.floor(
      ((maxPriceInit - minPriceInit) / 100) * percent + minPriceInit
    );
  }

  function priceToPercent(price) {
    return Math.floor(
      (price - minPriceInit) / ((maxPriceInit - minPriceInit) / 100)
    );
  }

  function handleFilterPrice() {
    //close modal if it in a modal
    // if (setIsOpenNavModal) {
    //   setIsOpenNavModal(false);
    // }

    setFilterPrice({
      min: percentToPrice(
        rangeInput1 - rangeInput2 > 0 ? rangeInput2 : rangeInput1
      ),
      max: percentToPrice(
        rangeInput1 - rangeInput2 > 0 ? rangeInput1 : rangeInput2
      ),
      isUsing: true,
    });
  }

  useEffect(() => {
    setRangeInput1(filterPrice.min ? priceToPercent(filterPrice.min) : 0);
    setRangeInput2(filterPrice.max ? priceToPercent(filterPrice.max) : 100);
  }, [filterPrice.min, filterPrice.max]);

  return (
    <div className="product__nav-container">
      <div className="product__nav-item">
        <h3 className="product__nav-heading">Danh mục sản phẩm</h3>

        <div className="product__nav-body">
          <ul className="nav__menu">
            {categories &&
              categories.map((item) => {
                return (
                  <li className="nav__menu-item">
                    <Link
                      to={`/products/category/${item.id}`}
                      onClick={() => setIsOpenNavModal(false)}
                      className={
                        category == `${item.id}`
                          ? "nav__menu-link active"
                          : "nav__menu-link"
                      }
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            <li className="nav__menu-item">
              <Link
                to={`/products/category/all`}
                onClick={() => setIsOpenNavModal(false)}
                className={
                  category == "all" ? "nav__menu-link active" : "nav__menu-link"
                }
              >
                Tất cả
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="product__nav-item">
        <h3 className="product__nav-heading">Lọc theo giá</h3>

        <div className="product__nav-body">
          <div className="nav__filter">
            <div className="nav__filter-group">
              <div className="nav__filter-range-wrap">
                <input
                  id="input-left"
                  type="range"
                  min={0}
                  max={100}
                  onChange={(e) => {
                    setRangeInput1(e.target.value);
                    if (filterPrice.isUsing) {
                      setFilterPrice({
                        ...filterPrice,
                        isUsing: false,
                      });
                    }
                  }}
                  value={rangeInput1}
                />
                <input
                  id="input-right"
                  type="range"
                  min={0}
                  max={100}
                  onChange={(e) => {
                    if (filterPrice.isUsing) {
                      setFilterPrice({
                        ...filterPrice,
                        isUsing: false,
                      });
                    }
                    setRangeInput2(e.target.value);
                  }}
                  value={rangeInput2}
                />

                <div className="slider">
                  <div className="track"></div>
                  <div
                    className="range"
                    style={{
                      left:
                        (rangeInput1 - rangeInput2 > 0
                          ? rangeInput2
                          : rangeInput1) + "%",
                      width: Math.abs(rangeInput1 - rangeInput2) + "%",
                    }}
                  ></div>
                  <div
                    className="thumb left"
                    style={{
                      left: rangeInput1 + "%",
                    }}
                  ></div>
                  <div
                    className="thumb right"
                    style={{
                      left: rangeInput2 + "%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="nav__filter-group nav__filter-bottom">
              {filterPrice.isUsing ? (
                <div
                  className="nav__filter-btn"
                  onClick={() => {
                    setFilterPrice({
                      ...filterPrice,
                      isUsing: false,
                    });
                  }}
                >
                  BỎ LỌC
                </div>
              ) : (
                <div className="nav__filter-btn" onClick={handleFilterPrice}>
                  LỌC
                </div>
              )}
              <span className="nav__filter-price-group">
                Giá
                <span className="nav__filter-price-item">
                  {rangeInput1 - rangeInput2 > 0
                    ? parsePriceToString(percentToPrice(rangeInput2))
                    : parsePriceToString(percentToPrice(rangeInput1))}{" "}
                  đ
                </span>
                -
                <span className="nav__filter-price-item">
                  {rangeInput1 - rangeInput2 < 0
                    ? parsePriceToString(percentToPrice(rangeInput2))
                    : parsePriceToString(percentToPrice(rangeInput1))}{" "}
                  đ
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPageNav;
