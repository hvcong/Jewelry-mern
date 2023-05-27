import "./ProductPageList.scss";

import Product from "../../../components/product/Product";
import { useProductContext } from "../../../store/contexts/ProductContext";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";
import { useEffect, useState } from "react";

function ProductPageList({ category, filterPrice }) {
  const { products, pageState } = useGlobalContext();

  const [list, setList] = useState([]);

  useEffect(() => {
    let _list = [...products];
    console.log(_list);
    if (category != "all") {
      _list = _list.filter((item) => {
        return item.category == category;
      });
    }
    if (filterPrice.isUsing) {
      _list = _list.filter((item) => {
        return item.price >= filterPrice.min && item.price <= filterPrice.max;
      });
    }

    let start = (pageState.current - 1) * 8;
    let end = start + 8;

    if (end > _list.length - 1) {
      end = _list.length - 1;
    }

    _list = _list.slice(start, end);

    setList(_list);
    return () => {};
  }, [pageState, products, category, filterPrice]);

  return (
    <div className="product__list-container">
      <div className="row">
        {(list &&
          list.length > 0 &&
          list.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={product.id}
            >
              <Product product={product} />
            </div>
          ))) || (
          <div className="col-12 product__list-empty">
            Không tìm thấy sản phẩm nào.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPageList;
