
import ProductPageFilter from './ProductPageFilter/ProductPageFilter'
import ProductPageNav from './ProductPageNav/ProductPageNav'
import ProductPagePagination from './ProductPagePagination/ProductPagePagination'
import ProductPageList from './ProductPageList/ProductPageList'
import Modal from '../../components/layout/Modal/Modal'

import { useState, useEffect } from 'react'
import { useProductContext } from '../../store/contexts/ProductContext'


function ProductPage({ productRoute }) {

    const { filter, setFilter, maxPrice, minPrice } = useProductContext()
    const [isOpenNavModal, setIsOpenNavModal] = useState(false)
    const [filterPrice, setFilterPrice] = useState({
        min: minPrice,
        max: maxPrice,
        isUsing: false,
        isChanged: false,
    })

    useEffect(() => {

        if (filterPrice.isUsing && filterPrice.isChanged) {
            setFilter({
                ...filter,
                field: 'price',
                gte: filterPrice.min,
                lte: filterPrice.max,
            })

            setFilterPrice({
                ...filterPrice,
                isChanged: false
            })
        }


    }, [filterPrice.isUsing, filterPrice.isChanged])

    useEffect(() => {
        setFilter({
            ...filter,
            category: productRoute === 'all' ? '' : productRoute,
        })
    }, [productRoute])

    //function
    function setActiveMenuItem(value) {
        setFilter({
            ...filter,
            category: value,
        })
    }

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
                        category={filter.category}

                    />
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="col-12">
                            <ProductPageList />
                        </div>
                        <div className="col-12">
                            <ProductPagePagination />
                        </div>
                    </div>
                </div>
            </div>

            <div className='modal-nav'>

                {
                    !isOpenNavModal ? ''
                        :
                        (
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
                        )
                }
            </div>



        </div>
    )
}

export default ProductPage