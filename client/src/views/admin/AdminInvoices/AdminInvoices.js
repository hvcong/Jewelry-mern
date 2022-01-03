import { useAdminContext } from '../../../store/contexts/AdminContext'
import './AdminInvoices.scss'

function AdminInvoices() {

    const { invoices, deleteOneInvoice, switchShipping } = useAdminContext()


    //function
    async function handleDeleteInvoice(id) {
        const response = await deleteOneInvoice(id)

        if (!response.success) {
            alert('Delete invoice not success')
        }
    }

    async function handleShipping(id) {
        const response = await switchShipping(id)

        if (!response.success) {
            alert('Switch shipping not success')
        }
    }



    return (
        <div>
            <div>
                <div className="admin__invoices">
                    <div className='content__heading'>
                        Tất cả đơn hàng
                    </div>

                    <table className="table table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Người đặt</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thanh toán</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoices && invoices.length > 0 && invoices.map((invoice) => {
                                    const { _id, name, address, payBy, status, createdAt } = invoice
                                    return (
                                        <tr key={_id} className={'invoice__item ' + status}
                                        >
                                            <td>{name}</td>
                                            <td>{address}</td>
                                            <td>{status}</td>
                                            <td>{payBy}</td>
                                            <td>{createdAt}</td>
                                            <td className='more-btn'>
                                                <span class="material-icons">
                                                    more_vert
                                                </span>
                                                <div className='more-btn-list' >
                                                    <div className={status === 'processing' ? 'more-btn-item' : 'd-none'}
                                                        onClick={() => handleShipping(_id)}
                                                    >
                                                        <span class="material-icons">
                                                            task_alt
                                                        </span>
                                                        <span>Giao hàng</span>
                                                    </div>
                                                    <div className='more-btn-item'
                                                        onClick={() => handleDeleteInvoice(_id)}
                                                    >
                                                        <span class="material-icons">
                                                            delete_forever
                                                        </span>
                                                        <span>Xóa</span>
                                                    </div>
                                                    <div className='more-btn-item'>
                                                        <span class="material-icons">
                                                            feed
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

            </div >
        </div>
    )
}

export default AdminInvoices