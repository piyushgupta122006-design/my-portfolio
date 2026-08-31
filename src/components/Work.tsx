import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import { FiExternalLink, FiGithub, FiZap } from "react-icons/fi";

const projects = [
  {
    title: "BNN CS Study Hub (FYCS Library)",
    category: "Academic Digital Vault & Real-Time Student Portal (107+ Active Users)",
    role: "Team: Rishikesh Shau (Lead / Primary) • Piyush Gupta (Secondary)",
    description:
      "A centralized digital repository and interactive academic portal built for Mumbai University CS students. Serves 107+ active students with 4 semesters of curated syllabus materials, in-browser PDF reader, and real-time Firestore analytics.",
    tools: "React 19, Vite 7, Firebase Firestore, Firebase Auth, Tailwind CSS 4, Framer Motion, PWA",
    image: "/assets/project-studyhub.png",
    link: "https://fycs-study-hub.vercel.app/",
    github: null,
    isPrivate: true,
    hasModal: true,
    modalType: "studyhub",
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
    modalType: "flashcrush",
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
    hasModal: false,
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
    hasModal: false,
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeModal, setActiveModal] = useState<"flashcrush" | "studyhub" | null>(null);

  useEffect(() => {
    if (activeModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeModal]);

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
                                onClick={() =>
                                  setActiveModal(
                                    project.modalType as "flashcrush" | "studyhub"
                                  )
                                }
                                data-cursor="disable"
                              >
                                <FiZap />
                                <span>
                                  {project.modalType === "flashcrush"
                                    ? "17+ Tools & Spec"
                                    : "Vault Spec & Features"}
                                </span>
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

      {/* BNN CS Study Hub Architecture & Vault Modal */}
      {activeModal === "studyhub" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="project-modal-overlay" onClick={() => setActiveModal(null)}>
            <div
              className="project-modal-card neo-window-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="neo-card-topbar">
                <div className="neo-window-dots">
                  <span className="neo-dot red" onClick={() => setActiveModal(null)}></span>
                  <span className="neo-dot yellow"></span>
                  <span className="neo-dot green"></span>
                </div>
                <span className="neo-card-filename">STUDYHUB_SYSTEM_SPEC.EXE ✦</span>
                <button
                  className="modal-close-btn"
                  onClick={() => setActiveModal(null)}
                  aria-label="Close modal"
                >
                  <MdClose />
                </button>
              </div>

              <div className="project-modal-body">
                <div className="modal-header-badge">
                  <span className="neo-badge-pink">⚡ ACADEMIC PLATFORM ARCHITECTURE</span>
                </div>
                <h3 className="modal-title">BNN CS Study Hub (FYCS Library)</h3>
                <p className="modal-subtitle">
                  Academic Digital Vault &bull; 107+ Active CS Students &bull; Real-Time Firestore Engine
                </p>

                {/* Feature Grid */}
                <div className="modal-tools-grid">
                  <div className="modal-tool-box">
                    <h4>📚 Semester-Wise Academic Vault</h4>
                    <ul>
                      <li><strong>4 Semesters Covered:</strong> Full syllabus materials for FYCS &amp; SYCS batches.</li>
                      <li><strong>Fast In-Browser PDF Reader:</strong> Integrated `pdfjs-dist` for instant document viewing.</li>
                      <li><strong>Curated Notes &amp; Practicals:</strong> Subject-wise unit notes, assignments &amp; Mumbai Univ PYQs.</li>
                    </ul>
                  </div>

                  <div className="modal-tool-box">
                    <h4>🔐 Google Auth &amp; Granular RBAC</h4>
                    <ul>
                      <li><strong>One-Tap OAuth Sign-In:</strong> Secure student authentication via Firebase Auth.</li>
                      <li><strong>Role-Based Access Control:</strong> Strict segregation between Admin &amp; Student permissions.</li>
                      <li><strong>Security &amp; Audit Logs:</strong> Automated downloader tracking and access moderation.</li>
                    </ul>
                  </div>

                  <div className="modal-tool-box full-width">
                    <h4>📊 Visitor &amp; Download Analytics Engine</h4>
                    <ul>
                      <li><strong>Firestore Atomic Counters:</strong> Real-time tracking of resource downloads &amp; active student sessions.</li>
                      <li><strong>Material Popularity Metrics:</strong> Identifies high-demand study topics before exams.</li>
                      <li><strong>Progressive Web App (PWA):</strong> Vite 7 service worker caching for offline access on mobile devices.</li>
                    </ul>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="modal-metrics-row">
                  <div className="modal-metric-card">
                    <span className="metric-num">107+</span>
                    <span className="metric-lbl">Active Students</span>
                  </div>
                  <div className="modal-metric-card">
                    <span className="metric-num">4 Semesters</span>
                    <span className="metric-lbl">Curriculum Vault</span>
                  </div>
                  <div className="modal-metric-card">
                    <span className="metric-num">0 ms</span>
                    <span className="metric-lbl">PDF Reader Delay</span>
                  </div>
                  <div className="modal-metric-card">
                    <span className="metric-num">Real-Time</span>
                    <span className="metric-lbl">Firestore Sync</span>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="modal-footer-actions">
                  <a
                    href="https://fycs-study-hub.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-action neo-btn-live"
                  >
                    <span>Launch BNN CS Study Hub</span>
                    <FiExternalLink />
                  </a>
                  <div className="private-repo-badge">
                    <span>🔒 Academic Private Repo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* FlashCrush Architecture & 17+ Tools Modal */}
      {activeModal === "flashcrush" &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="project-modal-overlay" onClick={() => setActiveModal(null)}>
            <div
              className="project-modal-card neo-window-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="neo-card-topbar">
                <div className="neo-window-dots">
                  <span className="neo-dot red" onClick={() => setActiveModal(null)}></span>
                  <span className="neo-dot yellow"></span>
                  <span className="neo-dot green"></span>
                </div>
                <span className="neo-card-filename">FLASHCRUSH_SYSTEM_SPEC.EXE ✦</span>
                <button
                  className="modal-close-btn"
                  onClick={() => setActiveModal(null)}
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



