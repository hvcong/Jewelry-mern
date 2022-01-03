import './ProductPagePagination.scss'
import { useState } from 'react'
import { useProductContext } from '../../../store/contexts/ProductContext'


function ProductPagePagination() {

    const { page, setPage } = useProductContext()

    const { current, total } = page

    function renderBody() {
        return Array.from('x'.repeat(4)).map((item, index) => {

            if (current > 3 && total > 4) {
                if (current === total) {
                    return (
                        <div
                            className={
                                `pagination__item ${index === 3 ? 'active' : ''}`
                            }
                            onClick={() => {
                                setPage({
                                    ...page,
                                    current: current - 3 + index,
                                })
                            }}
                        >{current - 3 + index}</div>
                    )
                }

                if (current === total - 1) {
                    return (
                        <div
                            className={
                                `pagination__item ${index === 2 ? 'active' : ''}`
                            }
                            onClick={() => {
                                setPage({
                                    ...page,
                                    current: current - 2 + index,
                                })
                            }}
                        >{current - 2 + index}</div>
                    )
                }

                // repeate only three loops
                if (index < 3) {


                    return (
                        <div
                            className={
                                `pagination__item ${index === 1 ? 'active' : ''}`
                            }
                            onClick={() => {
                                setPage({
                                    ...page,
                                    current: current - 1 + index,
                                })
                            }}
                        >{current - 1 + index}</div>
                    )
                }

                return <></>
            }
            else {
                if (index < total) {
                    return (
                        <div
                            className={
                                `pagination__item ${index + 1 === current ? 'active' : ''}`
                            }
                            onClick={() => {
                                setPage({
                                    ...page,
                                    current: index + 1
                                })
                            }}
                        >{index + 1}</div>
                    )
                }
                return <></>
            }

        })
    }

    let html = <div className='pagination__container'>
        <div className='pagination__btn pagination__item'
            onClick={() => {
                if (current === 1) return
                setPage({
                    ...page,
                    current: current - 1
                })
            }}
        >
            <span className="material-icons">
                arrow_back_ios
            </span>
        </div>

        {
            current > 3 && total > 4 ?
                (<div className='pagination__item pagination__item-dot'>...</div>)
                : ''
        }

        {
            renderBody()
        }

        {
            total - current > 1 && total > 4 ?
                (<div className='pagination__item pagination__item-dot'>...</div>)
                : ''
        }

        <div className='pagination__btn pagination__item'
            onClick={() => {
                if (current === total) return
                setPage({
                    ...page,
                    current: current + 1
                })
            }}
        >
            <span className="material-icons">
                arrow_forward_ios
            </span>
        </div>
    </div>

    return (
        <>
            {total <= 1 ? '' : html}
        </>
    )
}

export default ProductPagePagination