import './Header.scss'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../../store/contexts/CartContext'

import header_logo from '../../../assets/images/header_logo.png'
import { useAuthContext } from '../../../store/contexts/AuthContext'

function Header({ setIsOpenMenuModal }) {

    const { products, getNumOfProductInCart } = useCartContext()
    const { user, isAuthenticated, logout } = useAuthContext()

    return (
        <div className='sticky'>
            <div className='header__wrap'>
                <div className="container header__container">

                    <div className='header__menu-icon d-md-none'
                        onClick={() => {
                            setIsOpenMenuModal(true)
                        }}
                    >
                        <span className="material-icons">
                            menu
                        </span>
                    </div>

                    <Link to='/' className="header__logo">
                        <img className="header__logo-img" src={header_logo} />
                    </Link>

                    <div className="header__nav d-none d-md-block">
                        <ul className="header__nav-list">
                            <li className="header__nav-item">
                                <Link to='/' className="header__nav-link">Trang Chủ</Link>
                            </li>
                            <li className="header__nav-item">
                                <Link to='/' className="header__nav-link">Giới thiệu</Link>
                            </li>
                            <li className="header__nav-item">
                                <Link to='/' className="header__nav-link">Liên hệ</Link>
                            </li>

                            <li className="header__nav-item">
                                <Link to='/products/all' className="header__nav-link">Sản phẩm</Link>
                            </li>
                            <li className="header__nav-item account">
                                <Link to='#' className="header__nav-link">
                                    <span className="material-icons">
                                        person
                                    </span>
                                </Link>
                                <div className='account__box arrow-top'>
                                    {
                                        isAuthenticated ?
                                            (
                                                <>
                                                    <a href='#'
                                                        onClick={logout}
                                                        className='account__box-item'>
                                                        <span class="material-icons">
                                                            logout
                                                        </span>
                                                        Đăng xuất</a>
                                                    <Link to="/profile" className='account__box-item'>
                                                        <span class="material-icons">
                                                            manage_accounts
                                                        </span>
                                                        {user && user.role === 'admin' ? 'Trang quản trị viên' : 'Thông tin của tôi'}
                                                    </Link>

                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <Link to="/login" className='account__box-item'>
                                                        <span class="material-icons">
                                                            login
                                                        </span>
                                                        Đăng nhập</Link>
                                                    <Link to="/register" className='account__box-item'>
                                                        <span class="material-icons">
                                                            person_add
                                                        </span>
                                                        Đăng kí</Link>


                                                </>
                                            )
                                    }
                                </div>
                            </li>

                        </ul>



                    </div>


                    <div className="header__cart-wrap">
                        <Link to='/cart' className="header__cart">
                            <span className="header__cart-icon"></span>
                            <span className="header__cart-container">
                                {
                                    products && products.length > 0 ?
                                        getNumOfProductInCart(products)
                                        :
                                        0
                                }
                            </span>
                        </Link>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Header
