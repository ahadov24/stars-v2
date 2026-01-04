import "./referal.scss";
import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";
import Nav from "../nav/nav.jsx";
import headerImg from "../../assets/headerImg.gif";

const Referal = () => {
  const [activeTab, setActiveTab] = useState("stars"); // 'stars' yoki 'gifts'
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralId = "stares216565462";
  const referralLink = "https://t.me/starte?start=123";

  // Nusxa ko'chirish funksiyasi
  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "id") {
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error("Nusxa ko‘chirib bo‘lmadi", err);
    }
  };

  // Telegramda ulashish funksiyasi
  const handleShare = () => {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent("Men bilan birga Telegram Stars ishlang!")}`;
    window.open(shareUrl, "_blank");
  };
  return (
    <>
      <div className="referal">
        <header>
          <div className="left">
            <h2>Referral dasturi</h2>
            <p>
              Har bir taklif qilgan do'stingiz uchun mukofotlarga ega bo'ling
            </p>
          </div>
          <div className="right">
            <img src={headerImg} alt="" width="100px" />
          </div>
        </header>

        <div className="referral-page">
          {/* Balans qismi */}
          <div className="balance-card">
            <div className="balance-item">
              <div className="value">⭐ 0 = 0 UZS</div>
              <div className="sub-text">Yechib olishingiz mumkin</div>
            </div>
            <div className="divider"></div>
            <div className="balance-item">
              <div className="value">⭐ 0 = 0 UZS</div>
              <div className="sub-text">Jami balans</div>
            </div>
          </div>

          {/* Withdraw Section */}
          <div className="withdraw-card">
            <div className="tab-buttons">
              <button
                className={activeTab === "stars" ? "active" : ""}
                onClick={() => setActiveTab("stars")}
              >
                Stars
              </button>
              <button
                className={activeTab === "gifts" ? "active" : ""}
                onClick={() => setActiveTab("gifts")}
              >
                Gifts
              </button>
            </div>

            {activeTab === "stars" ? (
              <div className="stars-content">
                <form className="input-row">
                  <div className="input-wrapper">
                    <span className="input-icon">⭐</span>
                    <input type="number" placeholder="Miqdorni kiriting" />
                  </div>
                  <button className="withdraw-btn">Yechib olish</button>
                </form>
                <p className="min-withdraw">
                  Minimal yechish miqdori: 50 Stars
                </p>
              </div>
            ) : (
              <div className="gifts-content">
                <div className="gifts-grid">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="gift-box"></div>
                  ))}
                </div>
                <p className="min-withdraw">Sizda hali sovg'alar mavjud emas</p>
              </div>
            )}
          </div>

          {/* Copy & Share Section */}
          <div className="links-row">
            <div className="link-box">
              <span>Referral Id</span>
              <button
                onClick={() => handleCopy(referralId, "id")}
                className="copy-btn"
              >
                {copiedId ? <Check size={16} /> : <Copy size={16} />}
                {copiedId && <span className="tooltip">Nusxalandi!</span>}
              </button>
            </div>
            <div className="link-box">
              <span>Referral Link</span>
              <button
                onClick={() => handleCopy(referralLink, "link")}
                className="copy-btn"
              >
                {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                {copiedLink && <span className="tooltip">Nusxalandi!</span>}
              </button>
            </div>
          </div>

          <button className="share-btn" onClick={handleShare}>
            <Share2 size={18} /> Havolani ulashish
          </button>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Referal;
