import './Modal.scss'


function Modal({ children, setIsOpen }) {

    return (
        <div className="modal__container"
            onClick={(e) => {
                if (e.target.matches('.modal__container'))
                    setIsOpen(false)
            }}
        >
            <div className="modal__content">
                <span className="material-icons modal__close-btn"
                    onClick={() => setIsOpen(false)}
                >
                    close
                </span>

                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal