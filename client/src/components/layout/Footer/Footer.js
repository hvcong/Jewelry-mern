import "./Footer.scss";

import logo from "../../../assets/images/logo_footer.png";

function Footer() {
  return (
    <>
      <div className="footer__container">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="footer__item">
                <div>
                  <span className="material-icons footer__item-icon">
                    location_on
                  </span>
                </div>
                <div className="footer__item-title">Địa chỉ</div>
                <div className="footer__item-des">
                  319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4"></div>
            <div className="col-12 col-md-4">
              <div className="footer__item">
                <div>
                  <span className="material-icons footer__item-icon">
                    email
                  </span>
                </div>
                <div className="footer__item-title">Email & phone</div>
                <div className="footer__item-des">Hvcong101201@gmail.com</div>
                <div className="footer__item-des">086 822 2222</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
