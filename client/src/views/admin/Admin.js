import './Admin.scss'
import { useState, useContext, useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import logoFooter from '../../assets/images/logo_footer.png'
import AdminNav from './AdminNav/AdminNav'
import AdminHeader from './AdminHeader/AdminHeader'
import { useAdminContext } from '../../store/contexts/AdminContext'
import { useAuthContext } from '../../store/contexts/AuthContext'
import Modal from '../../components/layout/Modal/Modal'

function Admin() {
    const { user } = useAuthContext()
    const [route, setRoute] = useState('')
    const [isOpenNav, setIsOpenNav] = useState(false)

    if (user && user.role !== 'admin') {
        return <Navigate to="/" />
    }

    return (

        <div className='admin__container container-fruid'>
            <div className='row no-gutters'>
                <div className='col-lg-2 d-none d-lg-block'>
                    <AdminNav
                        route={route}
                        setRoute={setRoute}
                        setIsOpenNav={setIsOpenNav}
                    />
                </div>
                <div className='col-12 col-lg-10'>
                    <div className='row'>
                        <div className='col-12'>
                            <AdminHeader
                                setIsOpenNav={setIsOpenNav}
                            />
                        </div>
                        <div className='col-12'>
                            <Outlet />
                        </div>
                    </div>
                </div>

            </div>

            {
                isOpenNav ?
                    (
                        <Modal
                            setIsOpen={setIsOpenNav}
                        >
                            <AdminNav
                                setIsOpenNav={setIsOpenNav}
                                route={route}
                                setRoute={setRoute}
                            />
                        </Modal>
                    )
                    : ''
            }

        </div>
    )
}

export default Admin