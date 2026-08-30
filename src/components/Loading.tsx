import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100 && !loaded) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    }, 250);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        if (module.initialFX) {
          module.initialFX();
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      }
    });
  }, [isLoaded, setIsLoading]);

  return (
    <div className={`loading-screen ${clicked ? "loading-screen-out" : ""}`}>
      {/* Top Navbar Simulation */}
      <div className="neo-loader-header">
        <div className="neo-loader-logo">PG</div>
        <div className="neo-loader-status-pill">
          <span className="pulse-dot"></span> SYSTEM BOOTING
        </div>
      </div>

      {/* Center Neo-Brutalist Window Card */}
      <div className={`neo-loader-card ${loaded ? "neo-loader-complete" : ""}`}>
        <div className="neo-card-topbar">
          <div className="neo-window-dots">
            <span className="neo-dot red"></span>
            <span className="neo-dot yellow"></span>
            <span className="neo-dot green"></span>
          </div>
          <span className="neo-card-filename">SYSTEM_BOOT.EXE ✦</span>
        </div>

        <div className="neo-loader-body">
          <div className="neo-loader-badge">
            <span>✦ PIYUSH GUPTA</span>
          </div>

          <h2 className="neo-loader-title">
            {loaded ? "READY TO EXPLORE!" : "LAUNCHING PORTFOLIO"}
          </h2>

          <p className="neo-loader-subtitle">
            Full-Stack Engineering &amp; AI Systems
          </p>

          {/* Progress Bar */}
          <div className="neo-progress-container">
            <div
              className="neo-progress-fill"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* Bottom Info Row */}
          <div className="neo-loader-footer">
            <span className="neo-loader-pill">
              {loaded ? "WELCOME ↗" : `LOADING [ ${percent}% ]`}
            </span>
            <span className="neo-loader-subtext">
              {loaded ? "INITIALIZATION COMPLETE" : "BUILDING 3D CANVAS..."}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Marquee Strip */}
      <div className="neo-loader-marquee">
        <Marquee speed={50}>
          <span>✦ FULL-STACK DEVELOPER</span>
          <span>✦ AI TOOL BUILDER</span>
          <span>✦ BSc CS STUDENT</span>
          <span>✦ REACT &amp; THREE.JS</span>
          <span>✦ PROBLEM SOLVER</span>
        </Marquee>
      </div>
    </div>
  );
};

export default Loading;


export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  const interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = Math.min(percent + rand, 100);
      setLoading(percent);
    } else {
      clearInterval(interval);
      const secondInterval = setInterval(() => {
        percent = Math.min(percent + Math.round(Math.random() * 2), 100);
        setLoading(percent);
        if (percent >= 92) {
          clearInterval(secondInterval);
        }
      }, 300);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      const finishInterval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(finishInterval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};
