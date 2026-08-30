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
          <div className="landing-ticker-box">
            <div className="landing-ticker-track">
              <div className="landing-ticker-item">AI TOOLS ✦</div>
              <div className="landing-ticker-item">SYSTEMS ✦</div>
              <div className="landing-ticker-item">WEB APPS ✦</div>
              <div className="landing-ticker-item">AI TOOLS ✦</div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;



