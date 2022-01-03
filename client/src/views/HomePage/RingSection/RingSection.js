import './RingSection.scss'
import ring1Img from '../../../assets/images/ring_1.jpg'
import ring2Img from '../../../assets/images/ring_2.jpg'
import ringMiddle1Img from '../../../assets/images/ring_middle_1.jpg'
import ringMiddle2Img from '../../../assets/images/ring_middle_2.jpg'
import ringMiddle3Img from '../../../assets/images/ring_middle_3.jpg'
import ringMiddle4Img from '../../../assets/images/ring_middle_4.jpg'
import { Link } from 'react-router-dom'


function RingSection() {

    return (
        <div className='ring__container'>
            <div className='ring container'>
                <div className='ring__heading'>SẢN PHẨM NHẪN</div>
                <div className='ring__line'></div>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <div className='ring__product'>
                            <div className='ring__product-title'>Nhẫn vàng hồng</div>
                            <img className='ring__product-img' src={ring1Img} />
                            <div className='ring__product-mass'>Trọng lương: 24 cara</div>
                            <Link to='/' className='ring__product-btn'>Chi tiết</Link>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='ring__middle'>
                            <div className='ring__middle-img'>
                                <img src={ringMiddle1Img} />
                            </div>
                            <div className='ring__middle-img'>
                                <img src={ringMiddle2Img} />
                            </div>
                            <div className='ring__middle-img'>
                                <img src={ringMiddle3Img} />
                            </div>
                            <div className='ring__middle-img'>
                                <img src={ringMiddle4Img} />
                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='ring__product'>
                            <div className='ring__product-title'>Nhẫn vàng hồng</div>
                            <img className='ring__product-img' src={ring2Img} />
                            <div className='ring__product-mass'>Trọng lương: 24 cara</div>
                            <div className='ring__product-btn'>Chi tiết</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RingSection