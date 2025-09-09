import { useState, useEffect, useRef } from 'react'
import './App.css'
import Topbar from "./components/Topbar";
import Bottommenu from "./components/Bottommenu";
import Leftmenu from "./components/Leftmenu";
import KrpanoViewer from "./components/KrpanoViewer";
import KrpanoControls from "./components/KrpanoControls";

// 이미지
import popupimg from "./img/soyang_intro.png"
import icon from "./img/icon.png"
import useImg from "./img/use.png"


const controlKrpano = (action, e) => {
  if (e) e.stopPropagation();

  const krpano = document.getElementById("krpanoSWFObject");
  if (krpano) {
    switch (action) {
      case "loadScene1":
        krpano.call("gopano3(scene_111, 0, 0);"); // 씬 1 이동
        break;
      case "loadScene2":
        krpano.call("gopano3(scene_113, 0, 0);"); // 씬 2 이동
        break;
      case "toggleKrpanoFullscreen":
        krpano.call("switch(fullscreen);"); // krpano만 전체화면 모드

        // 0.3초 후에 전체화면 상태 확인 후 mapbox 이동
        setTimeout(() => updateMapboxPosition(krpano), 300);

        break;
      case "toggleBrowserFullscreen":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen(); // 브라우저 전체화면
        } else {
          document.exitFullscreen(); // 전체화면 해제
        }
        break;
      case "startRotation":
        krpano.call("set(autorotate.enabled, true);"); // 자동 회전 시작
        break;
      case "stopRotation":
        krpano.call("set(autorotate.enabled, false);"); // 자동 회전 중지
        break;
      default:
        break;
    }
  }
};

function App() {
  const [topup, setTopup] = useState('');
  const [menubt, setMenubt] = useState('');

  const [rotate, setRotate] = useState(true);
  const [rotatebt, setRotatebt] = useState('');

  const [hide, setHide] = useState(false);
  const [unhide, setUnhide] = useState('');

  const [down, setDown] = useState(false);
  const [upmenu, setUpmenu] = useState('');
  const [upbt, setUpbt] = useState('');

  const [popclose, setPopclose] = useState('close');
  const [showPopup, setShowPopup] = useState(false);


  const [showUseImg, setShowUseImg] = useState(false);

  const krpanoRef = useRef(null);

  const toggleUseImage = () => {
    setShowUseImg(prev => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowUseImg(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  



  // 액션
  // 🔹 전체화면 변경될 때 mapbox 위치 업데이트 함수
const updateMapboxPosition = (krpano) => {
  if (!krpano) return;

  const isFullscreen = krpano.get("fullscreen"); // krpano 전체화면 여부 확인
  const isMobile = window.innerWidth <= 932; // 모바일 여부 판단

  // 전체화면 상태에 따라 mapbox.y 위치 변경
  const newB = isFullscreen ? 3 : (isMobile ? 75 : 103);

  krpano.call(`tween(layer[mapbox].y, ${newB}, 0.5);`);
};

// 🔹 ESC 키로 전체화면 해제 시 자동으로 `mapbox.y` 조정
document.addEventListener("fullscreenchange", () => {
  const krpano = document.getElementById("krpanoSWFObject");
  if (krpano) {
    setTimeout(() => updateMapboxPosition(krpano), 300);
  }
});



  
  const closePopup = (e) => {
    e.stopPropagation();

    let a = (popclose === '' ? 'close' : '');

    setPopclose(a);

  };

  const topbarUp = (e) => {
    e.stopPropagation();

    let a = (topup === '' ? 'up' : '');
    setTopup(a);
    setMenubt(a === '' ? '' : 'menuctbt2');

    // 화면 크기에 따라 Y값 다르게 설정
    const isMobile = window.innerWidth <= 932; // 모바일 여부 판단
    const newY = a === 'up' ? 3 : (isMobile ? 75 : 103); // 모바일: 3 ↔ 75, 데스크톱: 3 ↔ 103

    // krpano 객체가 존재하는지 확인 후 tween() 적용
    if (krpanoRef.current) {
        krpanoRef.current.call(`tween(layer[mapbox].y, ${newY}, 0.5);`);
    }
};



  const autorotate = (e) => {
    e.stopPropagation();

    if (rotate) {
      controlKrpano("startRotation");
      setRotatebt('b-menu2-1');

    } else {
      controlKrpano("stopRotation");
      setRotatebt('');
    }

    setRotate(!rotate);
  }

  const hidemenu = (e) => {
    e.stopPropagation();

    const newHideState = !hide;
    setHide(newHideState);

    if (newHideState) {
      setUnhide("find"); // hide가 true일 때 'find'로 변경
    } else {
      setUnhide(""); // hide가 false일 때 다시 초기화
    }

    const newA = newHideState ? 'false' : 'true';

    // krpano 객체가 존재하는지 확인 후 tween() 적용
    if (krpanoRef.current) {
        krpanoRef.current.call(`set(layer[mapbox].visible, ${newA});`);
    }
  }

  const downmenu = (e) => {
    e.stopPropagation();

    const newDownState = !down;
    setDown(newDownState);

    if (newDownState) {
      setUpmenu("down-active");
      setUpbt("visible");
    } else {
      setUpmenu("");
      setUpbt(""); // 투명도 애니메이션 끝난 후 클래스 제거
    }
  }



  const makeCall = (phoneNumber) => {
    if (window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      setShowPopup(true);
    }
  };


  return (
    <div className={`allbox ${showUseImg ? "no-click" : ""}`}>

      {!hide && <Topbar topup={topup} topbarUp={topbarUp} menubt={menubt} makeCall={makeCall} setShowPopup={setShowPopup} showPopup={showPopup} />}

      {!hide && <Bottommenu controlKrpano={controlKrpano} autorotate={autorotate} rotatebt={rotatebt} hidemenu={hidemenu} downmenu={downmenu} upmenu={upmenu} toggleUseImage={toggleUseImage} />}

        <div className={'b-menu-h ' + unhide} onClick={hidemenu}>
          <img src={icon} alt="bmenu7" className="b-menu7" />
        </div>

        <div className={'b-menu-d ' + upbt} onClick={downmenu}>
          <img src={icon} alt="bmenu8" className="b-menu8"  />
        </div>

      {!hide && <Leftmenu controlKrpano={controlKrpano} closePopup={closePopup} />}

      <KrpanoViewer krpanoRef={krpanoRef} topbarUp={topbarUp} />
      <KrpanoControls controlKrpano={controlKrpano} />




    <div className={'popup-overlay ' + popclose } >
      <div className="popup-content">
        <button className="popup-close" onClick={closePopup}>x</button>
        <img src={popupimg} alt="소양강 처녀상" className="popup-image" />
        <h2 className="popup-title">소양강 처녀상</h2>
        <p className="popup-text">📞 전화번호: <strong>053-763-8009</strong></p>
        <p className="popup-text">📍 위치: 대구광역시 수성구 동대구로 129</p>
        <p className="popup-text">🕒 영업시간: <strong>평일 09:00 ~ 20:00</strong></p>
        <p className="popup-text">주말/공휴일: <strong>09:00 ~ 20:00</strong></p>
      </div>
    </div>

    {showUseImg && (
        <div className="use-img-overlay"> {/* ✅ 배경 클릭 방지 */}
          <div className="use-img-container">
            <button className="use-img-close" onClick={() => setShowUseImg(false)}>×</button> {/* ✅ 닫기 버튼 추가 */}
            <img src={useImg} alt="사용 설명" className="use-img" />
          </div>
        </div>
      )}

    </div>
  )
}

export default App
