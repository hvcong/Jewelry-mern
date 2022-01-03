

import './Comment.scss'

function Comment() {

    return (
        <div className="comment__container">
            <div className="comment__avatar">
                <img className="comment__avatar-img" src="http://localhost:5000/images/avatar.jpg" />
            </div>

            <div className="comment__content">
                <div className="comment__content-group">
                    <div className="comment__content-name">Antony Lore</div>
                    <div className="comment__content-time">2 months ago</div>
                    <div className="comment__content-edit-btn">
                        <span className="material-icons">
                            edit
                        </span>
                    </div>
                </div>

                <div className="comment__content-group">
                    <p className="comment__content-des">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>

                <div className="comment__content-group">
                    <span className="material-icons comment__content-icon active">
                        thumb_up_off_alt
                    </span>
                    <span className="comment__content-total">10</span>

                    <span className="material-icons comment__content-icon">
                        thumb_down_off_alt
                    </span>
                    <span className="comment__content-total">2</span>
                </div>

            </div>
        </div>
    )
}

export default Comment