import { useEffect } from "react";

const KrpanoViewer = ({ krpanoRef }) => {
  useEffect(() => {
    // 기존 krpano 컨테이너 제거 (중복 방지)
    if (document.getElementById("krpanoSWFObject")) {
      console.log("krpano 이미 로드됨");
      return; // 이미 로드된 경우 중단
    }

    // script 태그가 이미 추가되어 있는지 확인
    if (!document.getElementById("krpanoScript")) {
      const script = document.createElement("script");
      // ✅ vite.config.js 의 base 경로에 맞게 설정
      script.src = import.meta.env.BASE_URL + "tour.js";
      script.id = "krpanoScript"; // 중복 방지용 ID

      script.onload = () => {
        if (window.embedpano) {
          window.embedpano({
            swf: import.meta.env.BASE_URL + "tour.swf",
            xml: import.meta.env.BASE_URL + "tour.xml",
            target: "krpanoContainer",
            html5: "only",
            width: "100%",
            height: "100%",
            passQueryParameters: true,
            onready: function (krpano) {
              if (krpanoRef) {
                krpanoRef.current = krpano; // 부모 컴포넌트 접근 가능하도록 저장
              }
            },
          });
        }
      };

      document.body.appendChild(script);
    }
  }, [krpanoRef]);

  return (
    <div
      id="krpanoContainer"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default KrpanoViewer;
