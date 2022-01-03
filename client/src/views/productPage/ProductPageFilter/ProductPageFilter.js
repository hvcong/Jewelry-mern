import './ProductPageFilter.scss'
import { parsePriceToString } from '../../../utils'
import { Link } from 'react-router-dom'

const categories = {
    watch: 'Đồng hồ',
    ring: 'Nhẫn',
    earring: 'Bông tai',
    necklace: 'Dây chuyền',
}


function ProductPageFilter({ filterPrice, setFilterPrice, filter, setFilter, setIsOpenNavModal }) {

    function handleOnChangeSelect(e) {
        let value = e.target.value
        setFilter({
            ...filter,
            sort: 'price',
            order: value,
        })

    }

    return (
        <div className="filter-container d-flex flex-column flex-lg-row">
            <div className="filter__path d-flex flex-wrap justify-content-center">
                <Link to="/" className="filter__path-item">Trang chủ</Link>
                <span className='filter__path-item-flag'>/</span>

                {
                    filter.category ?
                        (<>
                            <Link to="/products/all" className="filter__path-item">Sản Phẩm</Link>
                            <span className='filter__path-item-flag'>/</span>
                            <a href="#" className="filter__path-item">{categories[filter.category]}</a>
                        </>)
                        :
                        (
                            <a className="filter__path-item">Sản Phẩm</a>
                        )
                }
            </div>

            <div className='filter__menu d-flex d-lg-none m-3 flex-column flex-sm-row'>

                <div className='filter__menu-wrap'>
                    <span className="material-icons filter__menu-icon"
                        onClick={() => {
                            setIsOpenNavModal(true)
                        }}
                    >
                        menu
                    </span>
                    <span className='filter__menu-text'>LỌC</span>
                </div>

                {
                    filterPrice.isUsing && filterPrice.min !== null
                        ?
                        (
                            <div className='filter__menu-item d-flex my-2'>
                                <span className="material-icons filter__menu-item-icon-close"
                                    onClick={() => {
                                        setFilterPrice({
                                            ...filterPrice,
                                            min: null,
                                            isChanged: true,
                                        })
                                    }}
                                >
                                    close
                                </span>
                                <span className='filter__menu-item-text'>Nhỏ nhất</span>
                                <span className='filter__menu-item-price'>{parsePriceToString(filterPrice.min)} đ</span>
                            </div>
                        )
                        :
                        ''
                }
                {
                    filterPrice.isUsing && filterPrice.max !== null
                        ?
                        (
                            <div className='filter__menu-item d-flex my-2'>
                                <span className="material-icons filter__menu-item-icon-close"
                                    onClick={() => {
                                        setFilterPrice({
                                            ...filterPrice,
                                            max: null,
                                            isChanged: true,
                                        })
                                    }}
                                >
                                    close
                                </span>
                                <span className='filter__menu-item-text'>Lớn nhất</span>
                                <span className='filter__menu-item-price'>{parsePriceToString(filterPrice.max)} đ</span>
                            </div>
                        )
                        :
                        ''
                }

            </div>

            <div className="filter__sort d-flex">
                <span className="filter__sort-label d-none d-lg-block">
                    Hiển thị 1–12 trong 17 kết quả
                </span>
                <select value={filter.order}
                    onChange={handleOnChangeSelect}
                    className="filter__sort-select">
                    <option value="" >Thứ tự mặc định</option>
                    {/* <option value="sale">Thứ tự theo giảm giá</option>
                    <option value="evaluate">Thứ tự theo điểm đánh giá</option> */}
                    <option value="asc">Thứ tự theo giá: thấp đến cao</option>
                    <option value="desc">Thứ tự theo giá: cao đến thấp</option>
                </select>
            </div>
        </div>
    )
}

export default ProductPageFilter