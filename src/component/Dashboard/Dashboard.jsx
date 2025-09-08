import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";

/**
 * Dashboard (Home) - no header/footer, only body.
 * - Hero slider (auto slide every 0.8s, right->left)
 * - Featured split section (left image, right text + "Thêm Món Mới Ngay")
 * - 3-column signature grid (image + short description)
 *
 * NOTE: Replace the image URL strings with your actual links.
 */

const HERO_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVsQjnbNm6dTLOt8YGzC7-hV4DhXeUTVCXdg&s", // put your hero image URLs here (slot 1)
  "https://cdn.eva.vn/upload/3-2014/images/2014-07-14/1405310004-ca-hoi.jpg", // slot 2
  "https://cafefcdn.com/203337114487263232/2022/4/25/photo-2-1650859453358651661593.jpg"  // slot 3
];

const FEATURED = {
  id: "bun-cha-premium",
  title: "Bún Chả Hà Nội Cao Cấp",
  subtitle:
    "Phiên bản cao cấp của món bún chả truyền thống, trình bày nghệ thuật, phục vụ kèm nem cua bể và nước mắm pha tinh chỉnh.",
  image: "https://ik.imagekit.io/tvlk/blog/2024/10/bun-cha-ha-noi-1-1024x682.jpeg?tr=q-70,c-at_max,w-500,h-300,dpr-2" // image link for featured (left)
};

const SIGNATURES = [
  {////fafaf
    id: "pho-wagyu",
    title: "Phở Bò Wagyu",
    desc: "Phở bản xịn, nước dùng trong vắt, thịt Wagyu mềm tan.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9j4QxmiKICa0MJEpUUNG9txOsrAQJ1D9_oQ&s" // link
  },
  {
    id: "goi-cuon",
    title: "Gỏi Cuốn Tôm Thịt",
    desc: "Tươi mát, trình bày thanh lịch — perfect appetizer.",
    image: "https://heyyofoods.com/wp-content/uploads/2024/03/3-4.jpg"
  },
  {
    id: "ca-phe-trung",
    title: "Cà Phê Trứng Hà Nội",
    desc: "Truyền thống nhưng được nâng tầm, vị béo mượt như mousse.",
    image: "https://grandworld.vinhomes.vn/wp-content/uploads/2024/02/cafe-trung-doc-dao-hap-dan-tai-quan-cafe-nang.jpg"
  }
];

const CART_KEY = "fe_demo_cart_v1";

const Dashboard = () => {
  // slider index
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // small message when adding featured
  const [msg, setMsg] = useState("");
  const msgTimerRef = useRef(null);

  // cart count from localStorage
  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return 0;
      const arr = JSON.parse(raw);
      return arr.reduce((s, it) => s + (it.quantity || 0), 0);
    } catch {
      return 0;
    }
  });

  // slider autoplay: advance every 800ms (0.8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // add featured to cart (saved into localStorage)
  const addFeaturedToCart = () => {
    // sample item structure
    const item = {
      id: FEATURED.id,
      name: FEATURED.title,
      price: 120000, // demo price (VND) — you can change
      quantity: 1
    };

    try {
      const raw = localStorage.getItem(CART_KEY);
      let arr = raw ? JSON.parse(raw) : [];
      const found = arr.find((x) => x.id === item.id);
      if (found) {
        found.quantity += 1;
      } else {
        arr.push(item);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(arr));
      setCartCount(arr.reduce((s, it) => s + (it.quantity || 0), 0));
      // show little message
      setMsg("Đã thêm món mới vào order ✓");
      if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
      msgTimerRef.current = setTimeout(() => setMsg(""), 1800);
    } catch (err) {
      console.error("Cart error", err);
      setMsg("Lỗi lưu Order");
      if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
      msgTimerRef.current = setTimeout(() => setMsg(""), 1800);
    }
  };

  // cleanup timers
  useEffect(() => {
    return () => {
      if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
    };
  }, []);

  return (
    <div className="home-body">
      {/* Tiny floating cart badge (no header required) */}
      <div className="cart-badge">🛒 {cartCount}</div>

      {/* HERO SLIDER */}
      <section className="hero-section">
        <div
          className="hero-slider"
          ref={sliderRef}
          style={{
            width: `${HERO_IMAGES.length * 100}%`,
            transform: `translateX(-${index * (100 / HERO_IMAGES.length)}%)`,
            transition: "transform 0.6s ease" // slide animation
          }}
        >
          {HERO_IMAGES.map((src, i) => (
            <div
              className="hero-slide"
              key={i}
              style={{
                backgroundImage: `url(${src || ""})`
              }}
            >
              {/* Optional overlay, you can uncomment to show slogan */}
              {/* <div className="hero-overlay">
                <h1>Ngon chuẩn vị — Order liền tay</h1>
              </div> */}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SPLIT */}
      <section className="featured-section">
        <div className="featured-left">
          <div
            className="featured-image"
            style={{ backgroundImage: `url(${FEATURED.image || ""})` }}
            aria-hidden
          />
        </div>
        <div className="featured-right">
          <h2 className="featured-title">{FEATURED.title}</h2>
          <p className="featured-sub">{FEATURED.subtitle}</p>
          <button className="pill-btn" onClick={addFeaturedToCart}>
            ➕ Thêm Món Mới Ngay
          </button>
          {msg && <div className="add-msg">{msg}</div>}
        </div>
      </section>

      {/* SIGNATURE GRID */}
      <section className="signature-section">
        <div className="sig-grid">
          {SIGNATURES.map((s) => (
            <article className="sig-card" key={s.id}>
              <div
                className="sig-img"
                style={{ backgroundImage: `url(${s.image || ""})` }}
              />
              <div className="sig-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
