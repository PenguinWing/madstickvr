import { useEffect } from "react";

// 이미지
import licon from "../img/licon.png"

const Leftmenu = ({ controlKrpano, closePopup }) => {
  

  return (

    <div className="leftmenu">
      <div className="l-menu" style={{ marginTop: '5px' }} onClick={closePopup} >
        <div className="l-text">매장 소개</div>
      <div className="l-iconbox">
          <img src={licon} alt="licon2" className="l-icon2"></img>
      </div>
      </div>
      <div className="l-menu" style={{ marginTop: '5px' }} onClick={() => controlKrpano("toggleKrpanoFullscreen")}>
        <div className="l-text">투어 확대</div>
      <div className="l-iconbox">
          <img src={licon} alt="licon3" className="l-icon3"></img>
      </div>
      </div>
    </div>
      
  ); 
};

export default Leftmenu;