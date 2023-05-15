import "./IntroduceSection.scss";
import img from "../../../assets/images/ignore_water.jpg";
import { Link } from "react-router-dom";

function IntroduceSection() {
  return (
    <div className="introduce__container">
      <div className="introduce container">
        <div className="row">
          <div
            className="col-12 col-md-6"
            style={{
              marginTop: 90,
            }}
          >
            <img src={img} className="introduce__img" />
          </div>
          <div className="col-12 col-md-6">
            <div className="section__content">
              <div className="section__content-heading">
                GIỚI THIỆU <br />
                SẢN PHẨM
              </div>
              <div className="section__content-number">1</div>
              <div className="section__content-desc">
                Là loại máy đồng hồ chạy bằng năng lượng từ dây cót không sử
                dụng PIN, năng lượng của chiếc đồng hồ cơ (Automatic) được tạo
                thành bởi một nguồn năng lượng lấy từ cuộn dây cót chính được
                kết nối với một bánh tạ (có hình bán nguyệt). Sự chuyển động của
                cổ tay người đeo sẽ làm bánh tạ quay và lên dây cót cho đồng hồ.
              </div>
              <Link
                to="/products/category/all"
                className="section__content-btn"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroduceSection;
