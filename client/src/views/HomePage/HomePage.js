import "./HomePage.scss";
import Slider from "./Slider/Slider";
import IntroduceSection from "./IntroduceSection/IntroduceSection";
import RingSection from "./RingSection/RingSection";

function HomePage() {
  return (
    <div className="homepage__container">
      <Slider />
      <IntroduceSection />
    </div>
  );
}

export default HomePage;
