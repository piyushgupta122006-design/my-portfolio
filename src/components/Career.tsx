import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="education">
      <div className="career-container">
        <h2>
          Education <span>&amp;</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack &amp; AI Builder</h4>
                <h5>Independent Engineering</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Engineering production-grade applications, AI tooling with Gemini API,
              and client-side compression systems. Shipped BNN CS Study Hub adopted by 107+ college students.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BSc Computer Science</h4>
                <h5>BNN College, Bhiwandi (SYCS)</h5>
              </div>
              <h3>2024–27</h3>
            </div>
            <p>
              2nd Year undergraduate curriculum with deep focus on Data Structures &amp;
              Algorithms, Database Management Systems (DBMS), Computer Networks, and Web Engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
