import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import { FiExternalLink, FiGithub, FiZap } from "react-icons/fi";

const projects = [
  {
    title: "BNN CS Study Hub (FYCS Library)",
    category: "Academic Digital Portal (107+ Active Student Users)",
    role: "Team: Rishikesh Shau (Lead / Primary) • Piyush Gupta (Secondary)",
    description:
      "A centralized digital repository and interactive academic portal built for Mumbai University CS students. Serves 107+ active students with organized syllabus materials, secure notes distribution, and semester question papers.",
    tools: "React.js, Firebase Auth, Firestore, Serverless",
    image: "/assets/project-studyhub.png",
    link: "https://fycs-study-hub.vercel.app/",
    github: null,
    isPrivate: true,
  },
  {
    title: "FlashCrush",
    category: "100% Client-Side File Studio, On-Device AI & Cloud Sync",
    role: "Lead Full-Stack Engineer & UI/UX Designer",
    description:
      "A high-performance, 100% client-side file manipulation powerhouse that compresses, converts, and processes PDFs & images locally using WebAssembly & on-device AI. Guarantees complete data privacy with zero server uploads, offline PWA capability, and seamless Google Drive sync.",
    tools: "React.js, Vite, WebAssembly (Wasm), ONNX AI, Tesseract OCR, Google Drive API, PWA, IndexedDB",
    image: "/assets/project-flashcrush.png",
    link: "https://piyush-flash-crush-files.vercel.app/",
    github: "https://github.com/piyushgupta122006-design/flash-crush-files",
    isPrivate: false,
    hasModal: true,
  },
  {
    title: "StressSense",
    category: "Biometric Telemetry & Stress Monitoring",
    role: "Full-Stack Prototype Engineer",
    description:
      "Real-time physiological telemetry dashboard tracking GSR, pulse metrics, and stress thresholds. Features interactive telemetry graphing, stress analytics, and cross-platform hardware connectivity.",
    tools: "JavaScript, Telemetry UI, Web Prototype, Android (In Dev)",
    image: "/assets/project-stresssense.png",
    link: "https://stress-sense-pvs.vercel.app/",
    github: null,
    isPrivate: false,
  },
  {
    title: "Quick QR Tool",
    category: "Fast Client-Side QR Generator Utility",
    role: "Frontend Developer",
    description:
      "Lightweight client-side QR generation engine with customizable color palettes, instant SVG/PNG raster downloads, and dynamic URL encoding.",
    tools: "JavaScript, REST API, Async / Await, Tooling",
    image: "/assets/project-qr.png",
    link: "https://piyushgupta122006-design.github.io/QR-Generator/",
    github: "https://github.com/piyushgupta122006-design/QR-Generator",
    isPrivate: false,
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFlashCrushModal, setShowFlashCrushModal] = useState(false);

  useEffect(() => {
    if (showFlashCrushModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [showFlashCrushModal]);

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
        <div className="work-badge-top">
          <span>🚀 PRODUCTION APPS &amp; TOOLS</span>
        </div>
        <h2>
          FEATURED <span>PROJECTS ✦</span>
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
                  <div className="carousel-neo-card">
                    <div className="neo-card-topbar">
                      <div className="neo-window-dots">
                        <span className="neo-dot red"></span>
                        <span className="neo-dot yellow"></span>
                        <span className="neo-dot green"></span>
                      </div>
                      <span className="neo-card-filename">
                        PROJECT_0{index + 1}.EXE ✦
                      </span>
                    </div>

                    <div className="carousel-content">
                      <div className="carousel-info">
                        <div className="carousel-number-box">
                          <span>0{index + 1}</span>
                        </div>
                        <div className="carousel-details">
                          <h4>{project.title}</h4>
                          <p className="carousel-category">
                            {project.category}
                          </p>
                          <div className="carousel-role-tag">
                            <span>👤 {project.role}</span>
                          </div>

                          <p className="carousel-description">
                            {project.description}
                          </p>

                          <div className="carousel-tools">
                            <span className="tools-label">TECH STACK</span>
                            <div className="carousel-tools-pills">
                              {project.tools.split(",").map((tool, tIdx) => (
                                <span className="neo-tool-pill" key={tIdx}>
                                  {tool.trim()}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="carousel-actions-row">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="neo-btn-action neo-btn-live"
                              data-cursor="disable"
                            >
                              <span>Live App</span>
                              <FiExternalLink />
                            </a>

                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="neo-btn-action neo-btn-github"
                                data-cursor="disable"
                              >
                                <FiGithub />
                                <span>Code</span>
                              </a>
                            )}

                            {project.isPrivate && (
                              <div className="private-repo-badge">
                                <span>🔒 Academic Private Repo</span>
                              </div>
                            )}

                            {project.hasModal && (
                              <button
                                type="button"
                                className="neo-btn-action neo-btn-spec"
                                onClick={() => setShowFlashCrushModal(true)}
                                data-cursor="disable"
                              >
                                <FiZap />
                                <span>17+ Tools &amp; Spec</span>
                              </button>
                            )}
                          </div>
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

      {/* FlashCrush Architecture & 17+ Tools Modal (Portal to body) */}
      {showFlashCrushModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="project-modal-overlay" onClick={() => setShowFlashCrushModal(false)}>
            <div
              className="project-modal-card neo-window-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="neo-card-topbar">
                <div className="neo-window-dots">
                  <span className="neo-dot red" onClick={() => setShowFlashCrushModal(false)}></span>
                  <span className="neo-dot yellow"></span>
                  <span className="neo-dot green"></span>
                </div>
                <span className="neo-card-filename">FLASHCRUSH_SYSTEM_SPEC.EXE ✦</span>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowFlashCrushModal(false)}
                  aria-label="Close modal"
                >
                  <MdClose />
                </button>
              </div>

              <div className="project-modal-body">
                <div className="modal-header-badge">
                  <span className="neo-badge-pink">⚡ PRODUCTION SYSTEM BREAKDOWN</span>
                </div>
                <h3 className="modal-title">FlashCrush — High-Performance File Suite</h3>
                <p className="modal-subtitle">
                  100% Client-Side WebAssembly Processing &bull; Zero Server Latency &bull; On-Device AI
                </p>

                {/* Tools Categories */}
                <div className="modal-tools-grid">
                  <div className="modal-tool-box">
                    <h4>📄 8+ PDF Super-Tools</h4>
                    <ul>
                      <li><strong>Lossless PDF Compressor:</strong> Up to 80% size reduction via custom DPI algorithms.</li>
                      <li><strong>PDF Merge &amp; Splitter:</strong> Drag-and-drop page organizer &amp; ZIP export.</li>
                      <li><strong>PDF to Image:</strong> 300 DPI high-res page rendering to JPG/PNG/WebP.</li>
                      <li><strong>AES-256 Security:</strong> Password encryption, unlocking &amp; watermark removal.</li>
                      <li><strong>In-Browser OCR:</strong> Optical Character Recognition supporting 12+ languages.</li>
                    </ul>
                  </div>

                  <div className="modal-tool-box">
                    <h4>🖼️ 7+ Image Power Tools</h4>
                    <ul>
                      <li><strong>Target KB Compressor:</strong> Exact byte-targeting with before/after preview.</li>
                      <li><strong>Bulk Image Compressor:</strong> Batch processes 20&ndash;50+ files with ZIP package.</li>
                      <li><strong>Multi-Format Converter:</strong> JPG, PNG, WebP, AVIF, SVG, BMP &amp; GIF.</li>
                      <li><strong>On-Device AI BG Remover:</strong> ONNX Runtime WebAssembly segmentation.</li>
                      <li><strong>Passport / Exam Studio:</strong> Standard dimensions for Passports, Visas &amp; SSC.</li>
                    </ul>
                  </div>

                  <div className="modal-tool-box full-width">
                    <h4>📱 Cloud &amp; Offline Architecture</h4>
                    <ul>
                      <li><strong>IndexedDB Offline Vault:</strong> 100% private in-browser persistent file history without tracking.</li>
                      <li><strong>Google Drive Sync:</strong> Seamless OAuth 2.0 integration to import &amp; backup directly to cloud.</li>
                      <li><strong>Progressive Web App (PWA):</strong> Service Worker caching for complete offline native app installation.</li>
                    </ul>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="modal-metrics-row">
                  <div className="modal-metric-card">
                    <span className="metric-num">17+</span>
                    <span className="metric-lbl">Power Tools</span>
                  </div>
                  <div className="modal-metric-card">
                    <span className="metric-num">0 ms</span>
                    <span className="metric-lbl">Server Upload Delay</span>
                  </div>
                  <div className="modal-metric-card">
                    <span className="metric-num">100%</span>
                    <span className="metric-lbl">Data Confidentiality</span>
                  </div>
                  <div className="modal-metric-card">
                    <span className="metric-num">$0 / mo</span>
                    <span className="metric-lbl">Server Compute Cost</span>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="modal-footer-actions">
                  <a
                    href="https://piyush-flash-crush-files.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-action neo-btn-live"
                  >
                    <span>Launch FlashCrush Web App</span>
                    <FiExternalLink />
                  </a>
                  <a
                    href="https://github.com/piyushgupta122006-design/flash-crush-files"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-action neo-btn-github"
                  >
                    <FiGithub />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Work;


