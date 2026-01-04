import "./topup.scss";
import Nav from "../nav/nav";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import headerImg from "../../assets/headerImg.gif";

const Topup = () => {
  // Tanlangan tugma indexini saqlash uchun state (dastlab birinchisi tanlangan)
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("click");

  const myBalance = "19 669 000";
  // Har xil summalar bo'lishi uchun massivni o'zgartirdim
  const presetAmounts = [10000, 20000, 50000, 100000];

  // Tugma bosilganda ishlaydi
  const handleSelectAmount = (index, value) => {
    setSelectedIdx(index); // Tanlangan tugma indexini saqlaymiz
    setCustomAmount(""); // Qo'lda kiritishni tozalaymiz
    console.log("Tanlangan summa:", value);
  };

  // Inputga yozilganda ishlaydi
  const handleCustomInput = (val) => {
    setCustomAmount(val);
    setSelectedIdx(null); // Tugmalardagi tanlovni bekor qilamiz
  };
  return (
    <>
      <div className="topup">
        <header>
          <div className="left">
            <h2>Balans to‘ldirish</h2>
            <p>Balansingizni tez va xavfsiz to'ldiring</p>
          </div>
          <div className="right">
            <img src={headerImg} alt="" width="100px" />
          </div>
        </header>
        <div className="payment-page">
          <div className="balance-info">
            <span>Mening balansim</span>
            <span className="amount-gold">{myBalance} UZS</span>
          </div>

          <div className="section">
            <p className="section-label">Tolov summasini tanlang</p>
            <div className="amount-grid">
              {presetAmounts.map((amt, idx) => (
                <button
                  key={idx}
                  // Agar index mos kelsa 'active' klassini qo'shamiz
                  className={`amount-btn ${
                    selectedIdx === idx ? "active" : ""
                  }`}
                  onClick={() => handleSelectAmount(idx, amt)}
                >
                  {amt.toLocaleString()} UZS
                </button>
              ))}
            </div>

            <input
              type="number"
              className={`custom-input ${customAmount ? "active" : ""}`}
              placeholder="Boshqa summani kiriting"
              value={customAmount}
              onChange={(e) => handleCustomInput(e.target.value)}
            />
          </div>

          <div className="section">
            <p className="section-label">Tolov usulini tanlang</p>

            <div
              className={`method-card ${
                paymentMethod === "click" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("click")}
            >
              <div className="icon-box">
                <CreditCard size={20} />
              </div>
              <div className="method-info">
                <span className="title">Clik / Avto tolov</span>
                <span className="desc">Tezkor va avtomatiktasdiqlanadi</span>
              </div>
            </div>

            <div
              className={`method-card ${
                paymentMethod === "admin" ? "selected" : ""
              }`}
              onClick={() => setPaymentMethod("admin")}
            >
              <div className="icon-box">
                <ShieldCheck size={20} />
              </div>
              <div className="method-info">
                <span className="title">Admin orqali to'lov</span>
                <span className="desc">Qolda tekshiriladi (5-30 daqiqa)</span>
              </div>
            </div>
          </div>

          <button
            className="main-action-btn"
            onClick={() => alert("To'lovga yuborildi!")}
          >
            To'lovni amalga oshirish
          </button>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Topup;
