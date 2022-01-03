import { findParentElement } from '../../utils'
import { Link } from 'react-router-dom'
import Modal from '../layout/Modal/Modal'

import './MenuModal.scss'
import { useProductContext } from '../../store/contexts/ProductContext'

function MenuModal({ isOpenMenuModal, setIsOpenMenuModal }) {

    const { filter, setFilter } = useProductContext()

    return (
        <>
            {
                !isOpenMenuModal ? ''
                    :
                    <Modal setIsOpen={setIsOpenMenuModal} >
                        <div className='menu__modal-container'>
                            <div className='menu__search'>
                                <div className='menu__search-group'>
                                    <input className="menu__search-input" type="text" name="search" placeholder='Tìm kiếm...' />
                                    <div className='menu__search-btn'>
                                        <span className="material-icons">
                                            search
                                        </span>
                                    </div>
                                </div>
                                <div className='menu__search-result d-none'>
                                    result container
                                </div>

                            </div>
                            <div className='menu__body'>
                                <ul className='menu__body-list'>
                                    <li className='menu__body-item'>
                                        <Link to='/' className='menu__body-link'
                                            onClick={() => {
                                                setIsOpenMenuModal(false)
                                            }}
                                        >Trang chủ</Link>
                                    </li>
                                    <li className='menu__body-item'>
                                        <Link to='/' className='menu__body-link'
                                            onClick={() => {
                                                setIsOpenMenuModal(false)
                                            }}
                                        >Giới thiệu</Link>
                                    </li>
                                    <li className='menu__body-item'>
                                        <div className='menu__body-item-sub-group'>
                                            <Link to='/products/all' className='menu__body-link'
                                                onClick={() => {
                                                    setIsOpenMenuModal(false)
                                                }}
                                            >Sản phẩm</Link>
                                            <span className="material-icons menu__body-icon"
                                                onClick={(e) => {
                                                    let parent = findParentElement(e.target, '.menu__body-item');
                                                    if (parent) {
                                                        parent.classList.toggle('active')
                                                    }
                                                }}
                                            >
                                                expand_more
                                            </span>
                                        </div>

                                        <div className='menu__body-sub-list'>
                                            <Link to="/products/ring" className='menu__body-link menu__body-sub-link'
                                                onClick={() => {
                                                    setIsOpenMenuModal(false)
                                                }}
                                            >Nhẫn</Link>
                                            <Link to="/products/earring" className='menu__body-link menu__body-sub-link'
                                                onClick={() => {
                                                    setIsOpenMenuModal(false)
                                                }}
                                            >Bông tai</Link>
                                            <Link to="/products/necklace" className='menu__body-link menu__body-sub-link'
                                                onClick={() => {
                                                    setIsOpenMenuModal(false)
                                                }}
                                            >Dây chuyền</Link>
                                            <Link to="/products/watch" className='menu__body-link menu__body-sub-link'
                                                onClick={() => {
                                                    setIsOpenMenuModal(false)
                                                }}
                                            >Đồng hồ</Link>
                                        </div>
                                    </li>
                                    <li className='menu__body-item'>
                                        <Link to='/' className='menu__body-link'
                                            onClick={() => {
                                                setIsOpenMenuModal(false)
                                            }}
                                        >Liên hệ</Link>
                                    </li>
                                    <li className='menu__body-item'>
                                        <Link to='/profile' className='menu__body-link'
                                            onClick={() => {
                                                setIsOpenMenuModal(false)
                                            }}
                                        >Thông tin của tôi</Link>

                                    </li>
                                </ul>
                            </div>

                            <div className='menu__social-media'>
                                <Link to="/" className='menu__social-media-link'>
                                    <i className="fab fa-facebook-f"></i>
                                    <span className='menu__social-media-text-sub'>Follow on Facebook</span>
                                </Link>
                                <Link to="/" className='menu__social-media-link'>
                                    <i className="fab fa-instagram"></i>
                                    <span className='menu__social-media-text-sub '>Follow on Instagram</span>
                                </Link>
                                <Link to="/" className='menu__social-media-link'>
                                    <i className="fab fa-twitter"></i>
                                    <span className='menu__social-media-text-sub '>Follow on Twitter</span>
                                </Link>

                            </div>
                        </div>
                    </Modal>
            }
        </>
    )

}

export default MenuModal