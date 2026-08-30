import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <div className="neo-hero-tag">
            <span className="neo-star">✦</span> HELLO! I'M
          </div>
          <h1>
            PIYUSH
            <div className="neo-name-highlight">GUPTA</div>
          </h1>
        </div>
        <div className="landing-info">
          <div className="neo-hero-tag neo-tag-blue">
            <span className="neo-star">★</span> FULL-STACK &amp;
          </div>
          <div className="landing-rotator-wrapper">
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI Tools</div>
              <div className="landing-h2-2">Systems</div>
            </h2>
            <h2 className="landing-info-h2-sub">
              <div className="landing-h2-info">Systems</div>
              <div className="landing-h2-info-1">AI Tools</div>
            </h2>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;


