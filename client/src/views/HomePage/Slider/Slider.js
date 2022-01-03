import './Slider.scss'

import slider1Img from '../../../assets/images/slider1.jpg'
import slider2Img from '../../../assets/images/slider2.jpg'
import logoFooter from '../../../assets/images/logo_footer.png'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'


function Slider() {

    const [currentSlider, setCurrentSlider] = useState(2)
    const [maxSlider, setMaxSlider] = useState(0)
    const [sliderItemWidth, setSliderItemWidth] = useState(0)

    const sliderItemRef = useRef()
    const sliderRef = useRef()


    useEffect(() => {
        setMaxSlider(document.getElementsByClassName('slider__item').length)
        setSliderItemWidth(sliderItemRef.current.clientWidth)

        let timeSlideSwitchId = setTimeout(() => {
            setCurrentSlider(currentSlider < maxSlider ? currentSlider + 1 : 1)
        }, 3000)

        return () => {
            clearTimeout(timeSlideSwitchId)
        }
    }, [currentSlider])


    return (
        <div className='slider-container'>
            <div className='slider'
                ref={sliderRef}
                style={{
                    transform: `translateX(-${(currentSlider - 1) * sliderItemWidth}px)`
                }}
            >
                <div className='slider__item' ref={sliderItemRef} style={{
                    backgroundImage: `url(${slider1Img})`,
                }}>
                    <div className='slider__item-content'>
                        <div className='slider__item-logo'>
                            <img src={logoFooter} />
                        </div>
                        <div className='slider__item-heading'>CÔNG TY GIA CÔNG TRANG SỨC <br />MONA JEWELRY</div>
                        <p className='slider__item-sub-text'>Chuyên gia công, chế tác các loại trang sức, đồng hồ thời trang theo xu hướng hiện đại</p>
                        <Link to='/' className='slider__item-link'>LIÊN HỆ</Link>
                    </div>
                </div>
                <div className='slider__item' style={{
                    backgroundImage: `url(${slider2Img})`,
                }}>
                    <div className='slider__item-content'>
                        <div className='slider__item-logo'>
                            <img src={logoFooter} />
                        </div>
                        <div className='slider__item-heading'>CÔNG TY GIA CÔNG TRANG SỨC <br />MONA JEWELRY</div>
                        <p className='slider__item-sub-text'>Chuyên gia công, chế tác các loại trang sức, đồng hồ thời trang theo xu hướng hiện đại</p>
                        <div className='slider__item-link'>LIÊN HỆ</div>
                    </div>
                </div>
            </div>

            <div className='slider__btn slider__btn-prev d-none d-sm-flex add-animation'
                onClick={() => {
                    setCurrentSlider(currentSlider > 1 ? currentSlider - 1 : maxSlider)
                }}
            >
                <span className="material-icons">
                    arrow_back_ios
                </span>
            </div>

            <div className='slider__btn slider__btn-next d-none d-sm-flex add-animation'
                onClick={() => {
                    setCurrentSlider(currentSlider < maxSlider ? currentSlider + 1 : 1)
                }}
            >
                <span className="material-icons">
                    arrow_forward_ios
                </span>
            </div>

            <div className='slider__dot'>
                <span className={currentSlider === 1 ? 'slider__dot-item active' : 'slider__dot-item'}
                    onClick={() => setCurrentSlider(1)}
                ></span>
                <span className={currentSlider === 2 ? 'slider__dot-item active' : 'slider__dot-item'}
                    onClick={() => setCurrentSlider(2)}
                ></span>
            </div>

        </div>
    )
}

export default Slider