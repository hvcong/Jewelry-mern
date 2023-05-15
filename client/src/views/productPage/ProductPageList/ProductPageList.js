import "./ProductPageList.scss";

import Product from "../../../components/product/Product";
import { useProductContext } from "../../../store/contexts/ProductContext";
import { useGlobalContext } from "../../../store/contexts/GlobalContext";

function ProductPageList() {
  const { products } = useGlobalContext();

  return (
    <div className="product__list-container">
      <div className="row">
        {(products &&
          products.length > 0 &&
          products.map((product) => (
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
