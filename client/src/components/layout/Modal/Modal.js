import './Modal.scss'

function Modal({ children, setIsOpen }) {

    return (
        <div className="modal__wrap"
            onClick={(e) => {
                if (e.target.matches('.modal__wrap'))
                    setIsOpen(false)
            }}
        >
            <span className="material-icons modal__btn-close"
                onClick={() => {
                    setIsOpen(false)
                }}
            >
                close
            </span>

            <div className="modal__content">
                {children}
            </div>
        </div>
    )
}

export default Modal