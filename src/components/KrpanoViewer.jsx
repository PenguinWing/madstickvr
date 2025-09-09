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
      script.src = "/tour.js"; // krpano JavaScript 파일 경로
      script.id = "krpanoScript"; // 중복 방지를 위한 ID 추가
      script.onload = () => {
        if (window.embedpano) {
          window.embedpano({
            swf: "/tour.swf",
            xml: "/tour.xml",
            target: "krpanoContainer",
            html5: "only",
            width: "100%",
            height: "100%",
            passQueryParameters: true,
            onready: function (krpano) {
              if (krpanoRef) {
                krpanoRef.current = krpano; // 부모 컴포넌트에서 접근 가능하도록 저장
              }
            },
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [krpanoRef]);

  return <div id="krpanoContainer" style={{ width: "100vw", height: "100vh" }} />;
};

export default KrpanoViewer;
