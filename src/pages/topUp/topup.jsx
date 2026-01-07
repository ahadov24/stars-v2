import "./topup.scss";
import Nav from "../nav/nav";
import { CreditCard, ShieldCheck, Upload, Copy, Loader2 } from "lucide-react"; // Loader2 qo'shdik
import { useState } from "react";
import headerImg from "../../assets/topupGif.mp4";
import { useTranslation } from 'react-i18next';
import useTelegramBack from "../../hooks/useTelegramBack";
import useGetOrCreateUser from "../../hooks/useGetOrCreateUser"; // Userni olish uchun
import useTopup from "../../hooks/useTopup"; // Hookni import qilish

const Topup = () => {
  useTelegramBack("/settings");
  const { t } = useTranslation();
  
  // Telegram user va bizning DB dagi user ma'lumotlari
  const tg = window.Telegram?.WebApp;
  const tgUser = tg?.initDataUnsafe?.user;
  const { user } = useGetOrCreateUser(tgUser);
  
  // Topup hooki
  const { submitTopup, loading: isSubmitting, error, success } = useTopup();

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("click");
  const [receipt, setReceipt] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const cardHolderNumber = "9860 1234 5678 9012";
  const presetAmounts = [10000, 20000, 50000, 100000];

  const currentAmount = customAmount || (selectedIdx !== null ? presetAmounts[selectedIdx] : 0);

  const isFormValid = () => {
    if (paymentMethod === "click") {
      return currentAmount >= 5000; // Minimal summa 5000
    } else {
      return currentAmount >= 5000 && receipt !== null;
    }
  };

  const handleSelectAmount = (index, value) => {
    setSelectedIdx(index);
    setCustomAmount("");
  };

  const handleCustomInput = (val) => {
    setCustomAmount(val);
    setSelectedIdx(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardHolderNumber.replace(/\s/g, ''));
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  // TO'LOVNI YUBORISH
  const handlePayment = async () => {
    if (paymentMethod === "admin") {
      try {
        await submitTopup({
          user_id: tgUser?.id, // Telegram ID yuboramiz
          amount: currentAmount,
          file: receipt
        });
      } catch (err) {
        console.error("Topup error:", err);
      }
    } else {
      // Click uchun mantiq (masalan, Click billing havolasiga yo'naltirish)
      alert("Click xizmati tez kunda ishga tushadi. Hozircha 'Admin' orqali to'lov qiling.");
    }
  };

  return (
    <>
      <div className="topup">
        <header>
          <div className="left">
            <h2>{t("topup_title")}</h2>
            <p>{t("topup_subtitle")}</p>
          </div>
          <div className="right">
            <video autoPlay muted loop playsInline className="gif-video">
              <source src={headerImg} type="video/mp4" />
            </video>
          </div>
        </header>

        <div className="payment-page">
          <div className="balance-info">
            <span>{t("my_balance")}</span>
            <span className="amount-gold">
              {user ? Number(user.balance).toLocaleString('ru-RU').replace(/,/g, ' ') : "0"} UZS
            </span>
          </div>

          <div className="section">
            <p className="section-label">{t("select_amount")}</p>
            <div className="amount-grid">
              {presetAmounts.map((amt, idx) => (
                <button
                  key={idx}
                  className={`amount-btn ${selectedIdx === idx ? "active" : ""}`}
                  onClick={() => handleSelectAmount(idx, amt)}
                >
                  {amt.toLocaleString()} UZS
                </button>
              ))}
            </div>

            <input
              type="number"
              className={`custom-input ${customAmount ? "active" : ""}`}
              placeholder={t("enter_custom_amount")}
              value={customAmount}
              onChange={(e) => handleCustomInput(e.target.value)}
            />
          </div>

          <div className="section">
            <p className="section-label">{t("select_payment_method")}</p>

            <div className={`method-card ${paymentMethod === "click" ? "selected" : ""}`} onClick={() => setPaymentMethod("click")}>
              <div className="icon-box"><CreditCard size={20} /></div>
              <div className="method-info">
                <span className="title">{t("click_payment")}</span>
                <span className="desc">{t("click_payment_desc")}</span>
              </div>
            </div>

            <div className={`method-card ${paymentMethod === "admin" ? "selected" : ""}`} onClick={() => setPaymentMethod("admin")}>
              <div className="icon-box"><ShieldCheck size={20} /></div>
              <div className="method-info">
                <span className="title">{t("admin_payment")}</span>
                <span className="desc">{t("admin_payment_desc")}</span>
              </div>
            </div>

            {paymentMethod === "admin" && (
              <div className="admin-details-expand">
                <div className="card-copy-box">
                  <div className="card-number">
                    <label>{t("transfer_to_card")}</label>
                    <div className="number-row">
                      <span>{cardHolderNumber}</span>
                      <div className="copy-btn-wrapper">
                        {showTooltip && <span className="copy-tooltip">{t("copied")}</span>}
                        <button onClick={copyToClipboard}><Copy size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
                <p>Abdullajonov A.</p>

                <div className="upload-section">
                  <label htmlFor="receipt-upload" className="upload-label">
                    <Upload size={20} />
                    <span>{receipt ? receipt.name : t("upload_receipt")}</span>
                    <input id="receipt-upload" type="file" accept="image/*" onChange={handleFileChange} hidden />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Xatolik yoki Muvaffaqiyat xabarlari */}
          {error && <p className="error-text" style={{color: 'red', fontSize: '12px', marginBottom: '10px'}}>{error}</p>}
          {success && <p className="success-text" style={{color: '#4CAF50', fontSize: '13px', marginBottom: '10px'}}>{t("payment_sent")}</p>}

          <button
            className={`main-action-btn ${isFormValid() && !isSubmitting ? "active" : "disabled"}`}
            disabled={!isFormValid() || isSubmitting}
            onClick={handlePayment}
          >
            {isSubmitting ? <Loader2 className="spinner" size={20} /> : t("confirm_payment")}
          </button>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Topup;