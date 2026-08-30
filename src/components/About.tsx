import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me neo-window-card">
        <div className="neo-card-topbar">
          <div className="neo-window-dots">
            <span className="neo-dot red"></span>
            <span className="neo-dot yellow"></span>
            <span className="neo-dot green"></span>
          </div>
          <span className="neo-card-filename">ABOUT_ME.TXT ✦</span>
        </div>
        <div className="neo-card-body">
          <h3 className="title">About Me</h3>
          <p className="para">
            I am an undergraduate Computer Science student at{" "}
            <span className="neo-inline-pill pill-pink">BNN College (SYCS)</span>{" "}
            and a full-stack engineer passionate about building high-performance
            web systems,{" "}
            <span className="neo-inline-pill pill-blue">AI Tooling</span>, and clean
            intuitive digital products. I turn complex technical logic into
            seamless, production-ready applications.
          </p>
          <div className="about-badges-row">
            <span className="neo-badge">📍 MUMBAI, INDIA</span>
            <span className="neo-badge" style={{ background: "var(--neoGreenLight)" }}>
              ⚡ AVAILABLE FOR PROJECTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

