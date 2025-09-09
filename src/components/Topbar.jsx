// Topbar.jsx
import { useEffect, useState, useCallback } from "react";
import menuct from "../img/menuct.png";
import introImg from "../img/soyang_intro.png"; // 장소 소개용 이미지

// 갤러리 이미지 (예시 1장)
import g1 from "../img/gallery/soyang_01.png";

const Topbar = ({
  topup,
  topbarUp,
  menubt,
  makeCall,
  showPopup,
  setShowPopup,
}) => {
  // ===== 장소 소개 =====
  const [infoOpen, setInfoOpen] = useState(false);

  // ===== 갤러리 & 라이트박스 =====
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // ===== 방문 후기 =====
  const [reviewOpen, setReviewOpen] = useState(false);
  const [placesOpen, setPlacesOpen] = useState(false); // 우측 패널 열기/닫기

  const reloadPage = () => window.location.reload();

  // 장소 소개 텍스트
  const PLACE_TITLE = "소양강 처녀상";
  const PLACE_DESC = `
소양강처녀상은 받침돌 5m, 조각상 7m로 총 높이 12m에 이르며, 치맛자락과 갈대를 잡은 모습으로 제작되었습니다.

1969년 작곡된 노래 소양강 처녀의 실제 주인공을 모델로 삼아 소양강의 아름다움과 소녀의 이미지를 담았으며, 1970년대 큰 인기를 얻어 춘천의 상징물이 되었습니다.

현재 연중무휴로 개방되어 있으며, 주변에는 소양강스카이워크와 오리보트 등 다양한 관광시설이 있어 많은 방문객이 찾는 명소입니다.
  `.trim();

  // 갤러리 이미지
  const GALLERY = [{ id: 1, src: g1, alt: "소양강 처녀상 1" }];

  // 방문 후기 내용 (여기에 네 후기 텍스트 넣어도 되고, 나중에 props/데이터로 빼도 됨)
  const REVIEW_TEXT = `
맑은 날에 방문했더니 강바람이 시원했고, 데크 위에서 바라보는 호수 뷰가 정말 좋았습니다.
VR 촬영 포인트도 많고, 스카이워크랑 연계해서 1~2시간 정도 산책하기에 딱 좋아요.
사진 찍기 좋은 시간은 해질녘. 역광이지만 하늘 색감이 은근히 잘 살아납니다.
  `.trim();

  // 주변 가볼만한 곳 (카카오맵 검색 링크로 열기)
  const PLACES = [
    { id: 1, name: "소양강 스카이워크" },
    { id: 2, name: "소양2교 전망" },
    { id: 3, name: "명동 닭갈비·막국수 거리" },
    { id: 4, name: "춘천 의암호자전거길" },
  ];

  const openKakao = (query) => {
    const url = `https://map.kakao.com/link/search/${encodeURIComponent(query)}`;
    window.open(
      url,
      "kakaoMap",
      "width=480,height=640,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes"
    );
  };

  // 소개 팝업
  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);

  // 갤러리 팝업
  const openGallery = () => setGalleryOpen(true);
  const closeGallery = () => setGalleryOpen(false);

  // 라이트박스
  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
    document.body.classList.add("no-click");
  };
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setLightboxSrc(null);
    document.body.classList.remove("no-click");
  }, []);

  // 방문 후기 팝업
  const openReview = () => {
    setReviewOpen(true);
    setPlacesOpen(false); // 열 때는 우측 패널 닫은 상태로 시작
  };
  const closeReview = () => setReviewOpen(false);

  // ESC 닫기 공통
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (lightboxOpen) closeLightbox();
        else if (galleryOpen) closeGallery();
        else if (reviewOpen) closeReview();
        else if (infoOpen) closeInfo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, galleryOpen, reviewOpen, infoOpen, closeLightbox]);

  return (
    <>
      <div className={"topbar " + topup}>
        <div className="topbar-box">
          <div className="topbar-logo" onClick={reloadPage}>
            <div className="logo">소양강 처녀상</div>
            <div className="logo2">ChunCheon</div>
          </div>
          <div className="topbar-empty"></div>

          <div className="topbar-menu">
            <div className="menu" onClick={openInfo}>장소 소개</div>
            <div className="menu" onClick={openGallery}>사진 보기</div>
            <div className="menu" onClick={openReview}>방문 후기</div>
          </div>
        </div>
      </div>

      <div className={"menuct " + topup} onClick={topbarUp}>
        <img src={menuct} alt="menuctbt" className={"menuctbt " + menubt} />
      </div>

      {/* 전화 팝업 (기존) */}
      {showPopup && (
        <div className="callpopup-overlay">
          <div className="callpopup-content">
            <p>전화 기능은 모바일에서만 사용할 수 있습니다.</p>
            <p>📞 문의: 053-763-8009</p>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* ===== 장소 소개 팝업 ===== */}
      {infoOpen && (
        <div className="popup-overlay" onClick={closeInfo}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closeInfo}>×</button>
            <img className="popup-image" src={introImg} alt={PLACE_TITLE} />
            <div className="popup-title">{PLACE_TITLE}</div>
            <div className="popup-text" style={{ whiteSpace: "pre-line", textAlign: "left" }}>
              {PLACE_DESC}
            </div>
          </div>
        </div>
      )}

      {/* ===== 갤러리 팝업 ===== */}
{galleryOpen && (
  <div className="popup-overlay" onClick={closeGallery}>
    {/* ⬇⬇ 기존 popup-content → gallery 클래스만 추가 */}
    <div className="popup-content gallery" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={closeGallery}>×</button>

      {/* ⬇ 헤더 + 개수 뱃지 */}
      <div className="popup-header">
        <div className="popup-title">사진 보기</div>
        <span className="badge">{GALLERY.length}</span>
      </div>

      {/* ⬇ 타이틀/갤러리 경계선 */}
      <div className="section-divider" />

      {/* 썸네일 그리드 */}
      <div className="gallery-grid modern">
        {GALLERY.map((it) => (
          <button
            key={it.id}
            className="gallery-thumb"
            onClick={() => openLightbox(it.src)}
            aria-label={`사진 확대: ${it.alt}`}
          >
            <img src={it.src} alt={it.alt} />
          </button>
        ))}
      </div>

      {/* (옵션) 비어있을 때 */}
      {GALLERY.length === 0 && (
        <div className="gallery-empty">아직 등록된 사진이 없어요.</div>
      )}
    </div>
  </div>
)}

      {/* ===== 라이트박스 ===== */}
      {lightboxOpen && (
        <div className="use-img-overlay" onClick={closeLightbox}>
          <div className="use-img-container" onClick={(e) => e.stopPropagation()}>
            <button className="use-img-close" onClick={closeLightbox}>×</button>
            <img className="use-img" src={lightboxSrc} alt="확대 이미지" />
          </div>
        </div>
      )}

      {/* ===== 방문 후기 팝업 ===== */}
      {reviewOpen && (
  <div className="popup-overlay" onClick={closeReview}>
    <div className="popup-content review" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={closeReview}>×</button>

      <div className="popup-title">방문 후기</div>

      <div className="review-body">
        <p className="review-text" style={{ whiteSpace: "pre-line" }}>
          {REVIEW_TEXT}
        </p>
      </div>

      {/* ⬇ 주변 가볼만한 곳: 텍스트 + 2열 버튼 그리드 */}
      <div className="nearby-wrap">
        <div className="nearby-title">주변 가볼만한 곳</div>
        <div className="nearby-grid">
          {PLACES.map((p) => (
            <button
              key={p.id}
              className="nearby-btn"
              onClick={() => openKakao(p.name)}
              title="카카오맵으로 열기"
            >
              <span className="nearby-name">{p.name}</span>
              <span className="nearby-open">↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Topbar;
