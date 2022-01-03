import './IntroduceSection.scss'
import img from '../../../assets/images/introduce_section.jpg'
import { Link } from 'react-router-dom'

function IntroduceSection() {

    return (
        <div className='introduce__container'>
            <div className='introduce container'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <img src={img} className='introduce__img' />
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='section__content'>
                            <div className='section__content-heading'>
                                GIỚI THIỆU <br />SẢN PHẨM
                            </div>
                            <div className='section__content-number'>
                                1
                            </div>
                            <div className='section__content-desc'>
                                Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày
                                và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn
                                cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép
                                nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản.
                                Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà khi được
                                áp dụng vào tin học văn phòng, nội dung của nó vẫn không hề bị thay
                                đổi. Nó đã được phổ biến trong những năm 1960 nhờ việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker.
                            </div>
                            <Link to='/' className='section__content-btn'>Tìm hiểu thêm</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroduceSection