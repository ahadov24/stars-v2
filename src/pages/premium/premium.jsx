import { useState, useEffect } from "react";
import "./premium.scss";
import Nav from "../nav/nav.jsx";
import starsImg from "../../assets/starspageImg.png";

const Premium = () => {
  const premiumOptions = [
    { id: 1, amount: 1, price: 5000 },
    { id: 2, amount: 3, price: 18000 },
    { id: 3, amount: 12, price: 180000 },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="premium">
        <header>
          <h2>Telegram Premium sotib olish</h2>
          <p>
            Visa kartasiz tez va qulay usulda telegram premium obunasini harid
            qiling!
          </p>
        </header>
        <div className="send">
          <div className="forWho">
            <label htmlFor="name">Kimga yuboramiz?</label>
            <input type="text" placeholder="@username kiriting..." id="name" />
          </div>
        </div>
        <div className="main">
          <div className="premium-container">
            <h3>Muddatni tanlang</h3>
            <div className="options-list">
              {premiumOptions.map((option) => (
                <div
                  key={option.id}
                  className={`option-item ${
                    selected === option.id ? "active" : ""
                  }`}
                  onClick={() => setSelected(option.id)}
                >
                  <div className="radio-circle">
                    {selected === option.id && <div className="inner-dot" />}
                  </div>

                  <div className="premium-info">
                    <span className="premium-icon">
                      <img src={starsImg} alt="" />
                    </span>
                    <span className="amount">{option.amount} Oy</span>
                  </div>

                  <div className="price">{option.price} UZS</div>
                </div>
              ))}
            </div>
            <button className="buy-button">Telegram Premium sotib olish</button>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Premium;
