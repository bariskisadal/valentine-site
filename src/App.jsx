import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
const EMAIL_TARGET = "kisadalbaris@gmail.com";

const FLOWERS_TIME = 4500;
const HEARTS_TIME = 3000;

const options = [
  "Romantik bir Date 💐",
  "Kokteyl Bar 🍸",
  "Evde Makarna + Şarap 🍝",
  "Sinema & Tiyatro 🎬",
];

const optionMeta = {
  "Romantik bir Date 💐": {
    theme: "date",
    emojis: ["💐", "🕯️", "🍝", "❤️", "✨"],
  },
   "Kokteyl Bar 🍸": {
    theme: "cocktail",
    emojis: ["🍸", "🍹", "🧊", "🍋", "✨"],
  },
  "Evde Makarna + Şarap 🍝": {
    theme: "homewine",
    emojis: ["🍷", "🧀", "🍝", "🕯️", "🏠"],
  },
  "Sinema & Tiyatro 🎬": {
    theme: "cinema",
    emojis: ["🎬", "🍿", "🎭", "⭐", "✨"],
  },
};



function ChoiceFX({ option, fxKey }) {
  const meta = optionMeta[option];
  if (!meta) return null;

  const spots = [
    { left: "12%", top: "18%", delay: "0ms" },
    { left: "72%", top: "20%", delay: "60ms" },
    { left: "18%", top: "66%", delay: "120ms" },
    { left: "70%", top: "68%", delay: "180ms" },
    { left: "46%", top: "42%", delay: "240ms" },
  ];

  return (
    <div key={fxKey} className="choice-fx" aria-hidden="true">
      <div className="fx-shine" />
      {meta.emojis.slice(0, 5).map((e, i) => (
        <span
          key={`${e}-${i}`}
          className="fx-emoji"
          style={{
            left: spots[i].left,
            top: spots[i].top,
            animationDelay: spots[i].delay,
          }}
        >
          {e}
        </span>
      ))}
    </div>
  );
}

function OptionCard({ option, openModalFor }) {
  const meta = optionMeta[option];
  const [fxKey, setFxKey] = useState(0);

  return (
    <button
      className="choice-card"
      data-theme={meta?.theme}
      onClick={() => openModalFor(option)}
      onMouseEnter={() => setFxKey((k) => k + 1)} // her hover girişinde yeniden tetikle
      onFocus={() => setFxKey((k) => k + 1)}      // keyboard ile de çalışsın
    >
      <div className="choice-title">{option}</div>
      <ChoiceFX option={option} fxKey={fxKey} />
    </button>
  );
}

const bonusOption =
  "Ben Trabzonspor & Fenerbahçe maçını izlerken bana meyve soyabilirsin :)";

const romanticMessage =
  "Bu yıl bol bol gezdiğimiz, yeni yerler keşfettiğimiz, saçma şeylere kahkaha attığımız, çok güzel anılar biriktirdiğimiz öncelikle sağlıklı ama çok mutlu bir yıl olsun. El ele yürüdüğümüz sokaklar, plansız çıktığımız yollar. Sadece güzel anları değil, sıradan günleri bile birlikte güzelleştirelim. Yan yana oldukça her şey daha güzel. Seninle geçen zaman bambaşka .İyi ki varsın. 💛";

const flowerPositions = [
  { left: "8%", delay: 0 },
  { left: "22%", delay: 0.3 },
  { left: "38%", delay: 0.15 },
  { left: "52%", delay: 0.45 },
  { left: "66%", delay: 0.1 },
  { left: "80%", delay: 0.35 },
  { left: "93%", delay: 0.25 },
];

function BloomFlower({ left, delay }) {
  const petalCount = 8;
  return (
    <div className="bloom-flower" style={{ left, "--fd": `${delay}s` }}>
      <div className="bloom-stem" />
      <div className="bloom-leaf bloom-leaf-l" />
      <div className="bloom-leaf bloom-leaf-r" />
      <div className="bloom-head">
        {Array.from({ length: petalCount }, (_, i) => (
          <div
            key={i}
            className="bloom-petal"
            style={{ "--pi": i, "--angle": `${i * (360 / petalCount)}deg` }}
          />
        ))}
        <div className="bloom-pistil" />
      </div>
    </div>
  );
}

function HeartsSky() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: `${2 + i * 4.4}%`,
        delay: `${(i * 0.35) % 4}s`,
        size: i % 5 === 0 ? "big" : i % 3 === 0 ? "med" : "",
        duration: `${3 + (i % 4)}s`,
      })),
    [],
  );

  return (
    <div className="hearts-sky" aria-hidden>
      {hearts.map((heart, index) => (
        <span
          key={index}
          className={`heart ${heart.size}`}
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function YesHearts() {
  const hearts = [
    { left: "8%", top: "65%", delay: "0s" },
    { left: "22%", top: "15%", delay: "0.2s" },
    { left: "40%", top: "55%", delay: "0.4s" },
    { left: "58%", top: "25%", delay: "0.3s" },
    { left: "75%", top: "70%", delay: "0.5s" },
    { left: "90%", top: "40%", delay: "0.15s" },
  ];

  return (
    <div className="yes-hearts" aria-hidden>
      {hearts.map((heart, index) => (
        <span key={index} style={{ ...heart, animationDelay: heart.delay }}>
          ♥
        </span>
      ))}
    </div>
  );
}

function FlyingBird() {
  return (
    <div className="bird-path" aria-hidden>
      <div className="flying-bird">
        <div className="fb-tail" />
        <div className="fb-body" />
        <div className="fb-wing" />
        <div className="fb-head">
          <div className="fb-eye" />
          <div className="fb-beak" />
        </div>
        <div className="fb-carried">✉</div>
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("flowers");
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [showYesHearts, setShowYesHearts] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [bonusRevealed, setBonusRevealed] = useState(false);
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [approved, setApproved] = useState(false);
  const [sending, setSending] = useState(false);
  const appRef = useRef(null);

  const showHearts = ["hearts", "letter", "invite", "options", "sent"].includes(
    stage,
  );

  useEffect(() => {
    if (stage === "flowers") {
      const timer = setTimeout(() => setStage("hearts"), FLOWERS_TIME);
      return () => clearTimeout(timer);
    }
    if (stage === "hearts") {
      const timer = setTimeout(() => setStage("letter"), HEARTS_TIME);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [stage]);

  useEffect(() => {
    if (stage === "letter") {
      const timer = setTimeout(() => setShowNextBtn(true), 7500);
      return () => clearTimeout(timer);
    }
    setShowNextBtn(false);
    return undefined;
  }, [stage]);

  const handleNoHover = () => {
    const el = appRef.current;
    if (!el) return;
    const maxX = window.innerWidth * 0.3;
    const maxY = window.innerHeight * 0.2;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    setNoPos({ x, y });
  };

  const openModalFor = (choice) => {
    setSelected(choice);
    setApproved(false);
    setShowModal(true);
  };

  const sendChoice = async () => {
    if (!selected) return;
    setSending(true);
    const timestamp = new Date().toLocaleString("tr-TR");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const hasEmailJs = Boolean(serviceId && templateId && publicKey);

    try {
      if (hasEmailJs) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: EMAIL_TARGET,
            choice: selected,
            timestamp,
          },
          publicKey,
        );
      } else {
        const subject = encodeURIComponent("14 Şubat seçim yanıtı");
        const body = encodeURIComponent(
          `Seçim: ${selected}\nTarih: ${timestamp}\nOnay: evet`,
        );
        window.location.href = `mailto:${EMAIL_TARGET}?subject=${subject}&body=${body}`;
      }
      setShowModal(false);
      setStage("sent");
    } catch (error) {
      console.error(error);
      alert("Mail gönderilirken sorun oluştu. Lütfen tekrar dene.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="app" ref={appRef}>
      {/* ===== FULL-SCREEN BACKGROUND LAYERS ===== */}

      {stage === "flowers" && (
        <div className="fs-flowers" aria-hidden>
          {flowerPositions.map((f, i) => (
            <BloomFlower key={i} left={f.left} delay={f.delay} />
          ))}
        </div>
      )}

      {showHearts && <HeartsSky />}

      {stage === "letter" && <FlyingBird />}

      {/* ===== CONTENT ===== */}

      {stage === "flowers" && (
        <div className="content-center">
          <h1 className="title-script flowers-title">
            Sevgililer Günümüz Kutlu olsun
          </h1>
        </div>
      )}

      {stage === "hearts" && (
        <div className="content-center">
          <p className="lead fade-in-up">Birazdan bir mektup geliyor...</p>
        </div>
      )}

      {stage === "letter" && (
        <div className="content-center letter-content">
          <div className="title-row letter-title-anim">
            <h2 className="title-script">Sevgilim</h2>
            <span className="title-heart">♥</span>
          </div>

          <div className="envelope-scene">
            <div className="paper-slider">
              <div className="letter-paper">
                <p className="letter-text">{romanticMessage}</p>
                <p className="signature">Seni Seviyorum</p>
              </div>
            </div>
            <div className="envelope">
              <div className="env-flap" />
              <div className="env-body" />
            </div>
          </div>

          {showNextBtn && (
            <button
              className="btn btn-primary fade-in-up"
              onClick={() => setStage("invite")}
            >
              Next
            </button>
          )}
        </div>
      )}

      {stage === "invite" && (
        <div className="content-center">
          <h2 className="title-serif">
            14 Şubat'ta bir şeyler yapmak ister misin?
          </h2>
          <div className="invite-actions flex gap-4">
            <button
              className="btn btn-primary"
              onMouseEnter={() => setShowYesHearts(true)}
              onMouseLeave={() => setShowYesHearts(false)}
              onClick={() => setStage("options")}
            >
              Evet
            </button>
            {showYesHearts && <YesHearts />}
            <button
              className="btn btn-ghost no-btn"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              }}
              onMouseEnter={handleNoHover}
            >
              Hayır
            </button>
          </div>
        </div>
      )}

      {stage === "options" && (
        <div className="content-center">
          <div className="options-card">
            <h2 className="title-serif">14 Şubat'ta ne yapalım istersin?</h2>
            <div className="choice-grid">
              {options.map((option) => (
  <OptionCard key={option} option={option} openModalFor={openModalFor} />
))}


              {bonusRevealed && (
                <button
                  className="choice-card bonus-card"
                  onClick={() => openModalFor(bonusOption)}
                >
                  <div className="choice-title">Bonus</div>
                  <div>{bonusOption}</div>
                </button>
              )}
            </div>

            {!bonusRevealed && (
              <button
                className="bonus-toggle"
                onClick={() => setBonusRevealed(true)}
              >
                Bonus sürprizi görmek ister misin?
              </button>
            )}
          </div>
        </div>
      )}

      {stage === "sent" && (
        <div className="content-center">
          <h2 className="title-script">Teşekkürler Güzellik!</h2>
          <p className="lead">
            Cevabın bana ulaştı. 14 Şubat için planımız hazır.
          </p>
          <p className="footer-note">Seni çok seviyorum.</p>
        </div>
      )}

      {/* ===== MODAL ===== */}

      {showModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Seçiminiz Barış beye iletilecek, onaylıyor musunuz?</h3>
            <p>
              Seçim: <strong>{selected}</strong>
            </p>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={approved}
                onChange={(event) => setApproved(event.target.checked)}
              />
              Okudum, onaylıyorum.
            </label>
            <div className="modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Vazgeç
              </button>
              <button
                className="btn btn-primary"
                onClick={sendChoice}
                disabled={!approved || sending}
              >
                {sending ? "Gönderiliyor..." : "Onayla ve Gönder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
