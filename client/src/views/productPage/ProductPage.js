import ProductPageFilter from "./ProductPageFilter/ProductPageFilter";
import ProductPageNav from "./ProductPageNav/ProductPageNav";
import ProductPagePagination from "./ProductPagePagination/ProductPagePagination";
import ProductPageList from "./ProductPageList/ProductPageList";

import { useState, useEffect } from "react";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import { useParams } from "react-router-dom";

function ProductPage({ productRoute, ...route }) {
  const minPrice = 0;
  const maxPrice = 10000;
  const [isOpenNavModal, setIsOpenNavModal] = useState(false);
  const [filterPrice, setFilterPrice] = useState({
    min: minPrice,
    max: maxPrice,
    isUsing: false,
    isChanged: false,
  });
  const { cate } = useParams();
  const [filter, setFilter] = useState({
    order: "",
  });

  return (
    <div className="container px-3">
      <div className="row">
        <div className="col-12">
          <ProductPageFilter
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            filter={filter}
            setFilter={setFilter}
            setIsOpenNavModal={setIsOpenNavModal}
            category={cate || "all"}
          />
        </div>
      </div>

      <div className="row">
        <div className="d-none d-lg-block col-md-3">
          <ProductPageNav
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            maxPriceInit={maxPrice}
            minPriceInit={minPrice}
            setIsOpenNavModal={setIsOpenNavModal}
            category={cate || "all"}
          />
        </div>
        <div className="col-12 col-lg-9">
          <div className="row">
            <div className="col-12">
              <ProductPageList />
            </div>
            <div className="col-12">{<ProductPagePagination />}</div>
          </div>
        </div>
      </div>

      {/* <div className="modal-nav">
        {!isOpenNavModal ? (
          ""
        ) : (
          <Modal setIsOpen={setIsOpenNavModal}>
            <ProductPageNav
              filterPrice={filterPrice}
              setFilterPrice={setFilterPrice}
              maxPriceInit={maxPrice}
              minPriceInit={minPrice}
              setIsOpenNavModal={setIsOpenNavModal}
              category={filter.category}
            />
          </Modal>
        )}
      </div> */}
    </div>
  );
}

export default ProductPage;
