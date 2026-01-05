import { useState } from "react";
import "./stars.scss";
import Nav from "../nav/nav.jsx";
import headerImg from "../../assets/headerImg.gif";
import { useTranslation } from 'react-i18next';
import useTelegramBack from "../../hooks/useTelegramBack";

const Stars = () => {
    useTelegramBack("/");
  const { t } = useTranslation();
  
  const starsOptions = [
    { id: 1, amount: 50, price: 5000 },
    { id: 2, amount: 150, price: 14000 },
    { id: 3, amount: 250, price: 22000 },
    { id: 4, amount: 500, price: 42000 },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="stars">
        <header>
          <div className="left">
            <h2>{t('stars_title')}</h2>
            <p>{t('stars_subtitle')}</p>
          </div>
          <div className="right">
            <img src={headerImg} alt="Header" width="100px" />
          </div>
        </header>

        <div className="send">
          <div className="forWho">
            <label htmlFor="name">
              {t('stars_forWho')}
              <a href="#">{t('forMe')}</a>
            </label>
            <input type="text" placeholder={t('enterUsername')} id="name" />
          </div>
          <div className="forWho">
            <label htmlFor="amount">{t('stars_amount')}</label>
            <input type="text" placeholder={t('stars_amount_placeholder')} id="amount" />
          </div>
        </div>

        <div className="main">
          <div className="stars-container">
            <h3>{t('stars_packages')}</h3>
            <div className="options-list">
              {starsOptions.map((option) => {
                // Har 50 ta uchun bitta yulduz, lekin ko'pi bilan 10 ta (joylashuv uchun)
                const starIconsCount = Math.min(Math.floor(option.amount / 50), 10);
                
                return (
                  <div
                    key={option.id}
                    className={`option-item ${selected === option.id ? "active" : ""}`}
                    onClick={() => setSelected(option.id)}
                  >
                    <div className="radio-circle">
                      {selected === option.id && <div className="inner-dot" />}
                    </div>

                    <div className="stars-info">
                      <div className="stars-row">
                        {/* Har bir 50 talik uchun bitta i tegi */}
                        {[...Array(starIconsCount)].map((_, index) => (
                          <i key={index} className="star-icon"></i>
                        ))}
                      </div>
                      <span className="amount">{option.amount.toLocaleString()}</span>
                    </div>

                    <div className="price">{option.price.toLocaleString()} UZS</div>
                  </div>
                );
              })}
            </div>

            {/* <button className="show-more">
              {t('stars_showMore')} <span>⌵</span>
            </button> */}

            <button className="buy-button">{t('stars_buyButton')}</button>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Stars;