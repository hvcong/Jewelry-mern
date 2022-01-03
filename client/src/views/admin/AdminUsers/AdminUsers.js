import './AdminUsers.scss'
import { useState, useEffect } from 'react'
import { useAdminContext } from '../../../store/contexts/AdminContext'

function AdminUsers() {
    const { navItem, setNavItem, users, deleteUser } = useAdminContext()

    useEffect(() => {
        setNavItem('users')
    }, [])



    //function
    async function handleDeleteUser(id) {
        const response = await deleteUser(id)

        if (!response.success) {
            alert('delete user not success' + response.message)
        }
    }


    return (
        <div className="admin__users">
            <div className='content__heading'>
                Tất cả nguời dùng
            </div>
            <table className="table table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Tài khoản</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Thuộc nhóm</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.length > 0 && users.map(user => {
                            const { _id, username, role, phonenumber, address } = user
                            return (
                                <tr key={_id}>
                                    <td>{username}</td>
                                    <td>{phonenumber}</td>
                                    <td>{address}</td>
                                    <td>{role}</td>
                                    <td className='more-btn'>
                                        <span class="material-icons">
                                            more_vert
                                        </span>
                                        <div className='more-btn-list' >
                                            <div className='more-btn-item'
                                                onClick={() => handleDeleteUser(_id)}
                                            >
                                                <span class="material-icons">
                                                    delete_forever
                                                </span>
                                                <span>Xóa</span>
                                            </div>
                                            <div className='more-btn-item'>
                                                <span class="material-icons">
                                                    manage_accounts
                                                </span>
                                                <span>Chi tiết</span>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default AdminUsers