import { useState } from 'react'
import './PaymentInfor.scss'


function PaymentInfor({ invoice, setInvoice }) {

    const { name, phonenumber, city, address, email, more } = invoice


    function handleOnChangeInput(e) {
        setInvoice({
            ...invoice,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className='information__container'>
            <div className='row'>
                <div className='col-12 infor__heading'>THÔNG TIN THANH TOÁN</div>
                <div className='col-12 col-lg-6'>
                    <label htmlFor='name'>Tên *</label>
                    <input className='name__input' name="name" id='name' placeholder='Ví dụ: Hoàng Văn Công'
                        value={name}
                        onChange={handleOnChangeInput}
                    />
                    <div className='message'>Bắt buộc phải nhập</div>
                </div>
                <div className='col-12 col-lg-6'>
                    <label htmlFor='phonenumber'>Số điện thoại *</label>
                    <input className='phonenumber__input' type='number' name="phonenumber" id='phonenumber' placeholder='Số điện thoại nhận hàng'
                        value={phonenumber}
                        onChange={handleOnChangeInput}
                    />
                    <div className='message'>Bắt buộc phải nhập</div>
                </div>
                <div className='col-12'>
                    <label htmlFor='city'>Tỉnh/ Thành phố *</label>
                    <input className='city__input' type='text' name="city" id='city' placeholder='Ví dụ: Thủ Đức'
                        value={city}
                        onChange={handleOnChangeInput}
                    />
                    <div className='message'>Bắt buộc phải nhập</div>
                </div>

                <div className='col-12'>
                    <label htmlFor='address'>Địa chỉ *</label>
                    <input className='address__input' type='text' name="address" id='address' placeholder='Ví dụ: số nhà 7, đường số 9, Hiệp Bình Chánh'
                        value={address}
                        onChange={handleOnChangeInput}
                    />
                    <div className='message'>Bắt buộc phải nhập</div>
                </div>

                <div className='col-12'>
                    <label htmlFor='email'>Địa chỉ Email *</label>
                    <input className='email__input' type='email' name="email" id='email' placeholder='Ví dụ: abc@gmail.com'
                        value={email}
                        onChange={handleOnChangeInput}
                    />
                    <div className='message'>Bắt buộc phải nhập</div>
                </div>
                <div className='col-12'>
                    <label htmlFor='more'>Ghi chú đơn hàng</label>
                    <textarea className='more__textarea' name='more' rows='5' placeholder='Ví dụ: Thời gian hay chỉ dẫn giao hàng chi tiết hơn'
                        value={more}
                        onChange={handleOnChangeInput}
                    />
                    <div className='message'>Bắt buộc phải nhập</div>
                </div>
            </div>
        </div>
    )
}


export default PaymentInfor