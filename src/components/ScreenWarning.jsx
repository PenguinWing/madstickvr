import { useState, useEffect } from "react";

const ScreenWarning = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 760);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 760);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isSmallScreen && (
        <div style={warningStyle}>
          원활한 투어를 위해 760px 이상의 창으로 진행해 주세요.
        </div>
      )}
    </>
  );
};

// 스타일 (원하는 디자인으로 변경 가능)
const warningStyle = {
  display: "flex",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  fontSize: "18px",
  textAlign: "center",
  zIndex: 9999,
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center"
};

export default ScreenWarning;
