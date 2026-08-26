import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "BNN CS Study Hub (FYCS Library)",
    category: "Academic Digital Portal (107+ Active Student Users)",
    role: "Team: Rishikesh Shau (Lead / Primary) • Piyush Gupta (Secondary)",
    tools: "React.js, Firebase Auth, Firestore, Serverless",
    image: "/assets/project-studyhub.png",
    link: "https://fycs-study-hub.vercel.app/",
    isPrivate: true,
  },
  {
    title: "Flash Crush-Files",
    category: "Client-Side Compression & Drive Integration",
    role: "Full-Stack Engineer",
    tools: "React.js, Vite, Google Drive API, OAuth 2.0",
    image: "/assets/project-flashcrush.png",
    link: "https://piyush-flash-crush-files.vercel.app/",
    isPrivate: false,
  },
  {
    title: "StressSense",
    category: "Biometric Telemetry & Stress Monitoring",
    role: "Full-Stack Prototype Engineer",
    tools: "JavaScript, Telemetry UI, Web Prototype, Android (In Dev)",
    image: "/assets/project-stresssense.png",
    link: "https://stress-sense-pvs.vercel.app/",
    isPrivate: false,
  },
  {
    title: "Quick QR Tool",
    category: "Fast Client-Side QR Generator Utility",
    role: "Frontend Developer",
    tools: "JavaScript, REST API, Async / Await, Tooling",
    image: "/assets/project-qr.png",
    link: "https://piyushgupta122006-design.github.io/QR-Generator/",
    isPrivate: false,
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="carousel-role-tag">
                          {project.role}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tech Stack</span>
                          <p>{project.tools}</p>
                        </div>
                        {project.isPrivate && (
                          <div className="private-repo-badge">
                            <span>🔒 Private Academic Codebase</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
