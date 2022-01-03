import './ProfilePage.scss'
import { useAuthContext } from '../../store/contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function ProfilePage() {

    const { user, isAuthenticated, isLoadingAuth } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated && !isLoadingAuth) {
            toast.warning('Vui lòng đăng nhập trước')
            navigate('/login')
        } else if (user && user.role === 'admin') {
            navigate('/admin')
        }
    }, [isAuthenticated, isLoadingAuth])

    return (
        <div className='profile__container container spinner-loading'>
            Giao diện trang này sẽ sớm cập nhật, cám ơn bạn đã xem qua trang web

        </div>
    )
}

export default ProfilePage