import { useEffect } from "react";

// 이미지
import icon from "../img/icon.png"

const Bottommenu = ({ controlKrpano, autorotate, rotatebt, hidemenu, downmenu, upmenu, toggleUseImage }) => {
  

  return (

    <div className={'bottommenu ' + upmenu}>
      <div className="b-menu" onClick={() => controlKrpano("toggleBrowserFullscreen")}>
        <img src={icon} alt="bmenu1" className="b-menu1" />
      </div>
      <div className="b-menu" onClick={autorotate}>
        <img src={icon} alt="bmenu2" className={'b-menu2 ' + rotatebt} />
      </div>
      <div className="b-menu" onClick={hidemenu}>
        <img src={icon} alt="bmenu3" className="b-menu3" />
      </div>
      {/* <div className="b-menu">
        <img src={icon} alt="bmenu4" className="b-menu4" />
      </div> */}
      <div className="b-menu" onClick={toggleUseImage}>
        <img src={icon} alt="bmenu5" className="b-menu5" />
      </div>
      <div className="b-menu" onClick={downmenu}>
        <img src={icon} alt="bmenu6" className="b-menu6" />
      </div>
    </div>
      
  );
};

export default Bottommenu;