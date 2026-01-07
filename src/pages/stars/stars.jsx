import { useState, useEffect } from "react";
import "./stars.scss";
import Nav from "../nav/nav.jsx";
import headerImg from "../../assets/starsGif.mp4";
import { useTranslation } from 'react-i18next';
import useTelegramBack from "../../hooks/useTelegramBack";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import useGetStars from "../../hooks/useGetStars"; // Hookni import qildik
import PaymentModal from "../topup/PaymentModal"; // Topupda ishlatgan modalimiz
import api from "../../api/axios";
import loader from "../loader/loader";

const Stars = () => {
  useTelegramBack("/");
  const { t } = useTranslation();

  // 1. Backenddan paketlarni olamiz
  const { starsOptions, loading: starsLoading } = useGetStars();

  const [selected, setSelected] = useState(null);
  const [username, setUsername] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Modal uchun state'lar
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("loading");

  const tg = window.Telegram?.WebApp;
  const tgUser = tg?.initDataUnsafe?.user;

  // Star ikonkalari sonini aniqlash
  const getStarLayers = (amount) => {
    if (amount >= 2500) return 5;
    if (amount >= 1000) return 4;
    if (amount >= 250) return 3;
    return 2;
  };

  const isFormInvalid = !selected || username.trim().length === 0;

  // Ko'rsatiladigan paketlar (dinamik starsOptions dan oladi)
  const visibleOptions = showAll ? starsOptions : starsOptions.slice(0, 3);

  // SOTIB OLISH FUNKSIYASI
  const handleBuyStars = async () => {
    setModalOpen(true);
    setModalStatus("loading");

    try {
      // Tanlangan paket ma'lumotlarini topamiz
      const selectedPackage = starsOptions.find(p => p.id === selected);

      await api.post("/orders/", {
        telegram_id: tgUser?.id, // Kim sotib olyapti
        target_username: username, // Kimga yuborilyapti
        star_id: selected, // Qaysi paket
        amount: selectedPackage.amount
      });

      setModalStatus("success");
      // 3 soniyadan keyin modalni yopish
      setTimeout(() => setModalOpen(false), 3000);
    } catch (err) {
      console.error(err);
      setModalStatus("error");
    }
  };

  return (
    <>
      <div className="stars">
        <header>
          <div className="left">
            <h2>{t("stars_title")}</h2>
            <p>{t("stars_subtitle")}</p>
          </div>
          <div className="right">
            <video autoPlay muted loop playsInline className="gif-video">
              <source src={headerImg} type="video/mp4" />
            </video>
          </div>
        </header>

        <div className="send">
          <div className="forWho">
            <label htmlFor="name">
              {t("stars_forWho")}
              <button
                className="for-me-btn"
                onClick={() => setUsername(tgUser?.username || "")}
              >
                {t("forMe")}
              </button>
            </label>
            <input
              type="text"
              placeholder={t("enterUsername")}
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="main">
          <div className="stars-container">
            <h3>{t("stars_packages")}</h3>

            {starsLoading ? (
              <div className="stars-loader">
                <Loader2 className="spinner" />
                <p>Paketlar yuklanmoqda...</p>
              </div>
            ) : (
              <div className="options-list">
                {visibleOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`option-item ${selected === option.id ? "active" : ""}`}
                    onClick={() => setSelected(option.id)}
                  >
                    <div className="radio-circle">
                      {selected === option.id && <div className="inner-dot" />}
                    </div>

                    <div className="stars-info">
                      <div className="stars-stack">
                        {[...Array(getStarLayers(option.amount))].map((_, i) => (
                          <i key={i} className="star-icon"></i>
                        ))}
                      </div>
                      <span className="amount">
                        {option.amount.toLocaleString()} Stars
                      </span>
                    </div>

                    <div className="price">
                      {Number(option.price).toLocaleString()} UZS
                    </div>
                  </div>
                ))}
              </div>
            )}

            {starsOptions.length > 3 && (
              <button className="show-more" onClick={() => setShowAll(!showAll)}>
                {showAll ? (
                  <>{t("stars_showLess")} <ChevronUp size={18} /></>
                ) : (
                  <>{t("stars_showMore")} <ChevronDown size={18} /></>
                )}
              </button>
            )}

            <button 
              className="buy-button" 
              disabled={isFormInvalid || starsLoading}
              onClick={handleBuyStars}
            >
              {t("stars_buyButton")}
            </button>
          </div>
        </div>
      </div>

      {/* Topupda yaratgan modalimizni bu yerda ham ishlatamiz */}
      <PaymentModal 
        isOpen={modalOpen} 
        status={modalStatus} 
        onClose={() => setModalOpen(false)} 
      />
      
      <Nav />
    </>
  );
};

export default Stars;