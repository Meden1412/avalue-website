import { useEffect, useState } from "react";
import { getStaffBySlug, Staff } from "./staffService";

const AVALUE_LOGO = "/logo-avalue.png";
const DEFAULT_COVER = "/covers/avalue-cover.png";

export default function EcardPage() {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadStaff() {
      try {
        const slug = window.location.pathname.replace("/", "").trim();
        const data = await getStaffBySlug(slug);

        if (!data) {
          setNotFound(true);
          return;
        }

        setStaff(data);
      } catch (error) {
        console.error("Lỗi tải e-card:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  if (loading) {
    return (
      <div style={styles.centerPage}>
        <div style={styles.loadingCard}>
          <img src={AVALUE_LOGO} alt="Avalue" style={styles.loadingLogo} />
          <p>Đang tải e-card...</p>
        </div>
      </div>
    );
  }

  if (notFound || !staff) {
    return (
      <div style={styles.centerPage}>
        <div style={styles.loadingCard}>
          <img src={AVALUE_LOGO} alt="Avalue" style={styles.loadingLogo} />
          <h2>Không tìm thấy e-card</h2>
          <p>Đường dẫn nhân sự chưa tồn tại hoặc đã ngừng kích hoạt.</p>
          <a href="/" style={styles.primaryButton}>
            Về trang chủ Avalue
          </a>
        </div>
      </div>
    );
  }

  const phoneHref = `tel:${staff.phone}`;
  const emailHref = `mailto:${staff.email}`;
  const zaloNumber = staff.zalo ? staff.zalo.replace(/\D/g, "") : "";
  const zaloHref = zaloNumber ? `https://zalo.me/${zaloNumber}` : "";
  const mapHref = staff.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        staff.address
      )}`
    : "";
  const websiteHref = staff.website || "https://avalue.vn";
  const vcardHref = `/vcards/${staff.slug}.vcf`;
  const shareUrl = `https://avalue.vn/${staff.slug}`;

  async function shareProfile() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: staff?.name,
          text: `${staff?.name} - ${staff?.position}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Đã copy link e-card.");
      }
    } catch (error) {
      console.error("Không thể chia sẻ:", error);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.phoneCard}>
        <header style={styles.topBar}>
          <a href="/" style={styles.brandWrap}>
            <img src={AVALUE_LOGO} alt="Avalue" style={styles.logo} />
          </a>

          <div style={styles.topActions}>
            <button style={styles.iconGhostButton} onClick={shareProfile} title="Chia sẻ">
              ↗
            </button>
            <span style={styles.langBadge}>VN</span>
          </div>
        </header>

        <section style={styles.coverSection}>
          <img
            src={staff.cover || DEFAULT_COVER}
            alt="Avalue cover"
            style={styles.coverImage}
          />
          <div style={styles.coverOverlay}></div>
        </section>

        <section style={styles.profilePanel}>
          <div style={styles.avatarOuter}>
            <img
              src={staff.avatar || AVALUE_LOGO}
              alt={staff.name}
              style={staff.avatar ? styles.avatar : styles.avatarLogo}
            />
          </div>

          <div style={styles.profileText}>
            <h1 style={styles.name}>{staff.name}</h1>
            <p style={styles.position}>{staff.position}</p>
            <p style={styles.company}>{staff.company}</p>
          </div>

          <div style={styles.quickActionGrid}>
            <a href={phoneHref} style={styles.quickAction}>
              <span style={styles.quickIcon}>☎</span>
              <span>Gọi</span>
            </a>

            {zaloHref && (
              <a href={zaloHref} target="_blank" rel="noreferrer" style={styles.quickAction}>
                <span style={styles.quickIcon}>Z</span>
                <span>Zalo</span>
              </a>
            )}

            <a href={emailHref} style={styles.quickAction}>
              <span style={styles.quickIcon}>✉</span>
              <span>Email</span>
            </a>

            {mapHref && (
              <a href={mapHref} target="_blank" rel="noreferrer" style={styles.quickAction}>
                <span style={styles.quickIcon}>⌖</span>
                <span>Vị trí</span>
              </a>
            )}

            <a href={websiteHref} target="_blank" rel="noreferrer" style={styles.quickAction}>
              <span style={styles.quickIcon}>◎</span>
              <span>Web</span>
            </a>
          </div>

          <div style={styles.mainButtons}>
            <a href={vcardHref} download={`${staff.slug}.vcf`} style={styles.saveButton}>
              ⤓ Lưu danh bạ
            </a>

            <button onClick={shareProfile} style={styles.shareButton}>
              ⤴ Chia sẻ
            </button>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Giới thiệu</h2>
          <p style={styles.bio}>
            {staff.bio || `${staff.name} - ${staff.position} tại ${staff.company}.`}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Thông tin liên hệ</h2>

          <div style={styles.contactCard}>
            <div style={styles.contactRow}>
              <div>
                <span style={styles.contactLabel}>Điện thoại</span>
                <a href={phoneHref} style={styles.contactValue}>
                  {staff.phone}
                </a>
              </div>
              <a href={phoneHref} style={styles.rowButton}>
                Gọi
              </a>
            </div>

            <div style={styles.contactRow}>
              <div>
                <span style={styles.contactLabel}>Email</span>
                <a href={emailHref} style={styles.contactValue}>
                  {staff.email}
                </a>
              </div>
              <a href={emailHref} style={styles.rowButton}>
                Gửi
              </a>
            </div>

            {zaloHref && (
              <div style={styles.contactRow}>
                <div>
                  <span style={styles.contactLabel}>Zalo</span>
                  <a href={zaloHref} target="_blank" rel="noreferrer" style={styles.contactValue}>
                    {staff.zalo}
                  </a>
                </div>
                <a href={zaloHref} target="_blank" rel="noreferrer" style={styles.rowButton}>
                  Mở
                </a>
              </div>
            )}

            {staff.address && (
              <div style={styles.contactRow}>
                <div>
                  <span style={styles.contactLabel}>Địa chỉ</span>
                  <a href={mapHref} target="_blank" rel="noreferrer" style={styles.contactValue}>
                    {staff.address}
                  </a>
                </div>
                <a href={mapHref} target="_blank" rel="noreferrer" style={styles.rowButton}>
                  Map
                </a>
              </div>
            )}

            <div style={styles.contactRow}>
              <div>
                <span style={styles.contactLabel}>Website</span>
                <a href={websiteHref} target="_blank" rel="noreferrer" style={styles.contactValue}>
                  {websiteHref}
                </a>
              </div>
              <a href={websiteHref} target="_blank" rel="noreferrer" style={styles.rowButton}>
                Xem
              </a>
            </div>
          </div>
        </section>

        {staff.services && staff.services.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Dịch vụ Avalue</h2>

            <div style={styles.serviceGrid}>
              {staff.services.map((service) => (
                <div key={service} style={styles.serviceItem}>
                  <span style={styles.serviceDot}></span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer style={styles.footer}>
          <img src={AVALUE_LOGO} alt="Avalue" style={styles.footerLogo} />
          <p style={styles.footerText}>
            Công ty Cổ phần Thẩm định giá Avalue Việt Nam
          </p>
        </footer>
      </div>
    </main>
  );
}

const AVALUE_RED = "#B5121B";
const AVALUE_DARK_RED = "#A81C1C";
const DARK = "#151515";
const TEXT = "#2d2d2d";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(181,18,27,0.16), transparent 30%), linear-gradient(145deg, #f6f6f6 0%, #ffffff 45%, #f1f1f1 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "18px 10px 32px",
    fontFamily:
      "Arial, 'Helvetica Neue', Helvetica, sans-serif",
    color: TEXT,
  },

  phoneCard: {
    width: "100%",
    maxWidth: 430,
    background: "#ffffff",
    borderRadius: 32,
    overflow: "hidden",
    boxShadow:
      "0 26px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(181,18,27,0.08)",
    position: "relative",
  },

  topBar: {
    height: 62,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 18px",
    background: "rgba(255,255,255,0.96)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    position: "relative",
    zIndex: 2,
  },

  brandWrap: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },

  logo: {
    height: 36,
    objectFit: "contain",
  },

  topActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  iconGhostButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    color: DARK,
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 18,
  },

  langBadge: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: AVALUE_RED,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 800,
    boxShadow: "0 8px 18px rgba(181,18,27,0.28)",
  },

  coverSection: {
    height: 235,
    position: "relative",
    overflow: "hidden",
    background: "#ddd",
  },

  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transform: "scale(1.02)",
  },

  coverOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.15) 100%)",
  },

  profilePanel: {
    position: "relative",
    background: "#f8f8f8",
    padding: "28px 22px 24px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  avatarOuter: {
    position: "absolute",
    right: 22,
    top: -64,
    width: 128,
    height: 128,
    borderRadius: "50%",
    border: "7px solid #fff",
    background: "#fff",
    boxShadow: "0 14px 32px rgba(0,0,0,0.22)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  avatarLogo: {
    width: "78%",
    height: "78%",
    objectFit: "contain",
  },

  profileText: {
    paddingRight: 132,
    minHeight: 96,
  },

  name: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.15,
    color: DARK,
    fontWeight: 900,
    letterSpacing: "-0.3px",
  },

  position: {
    margin: "8px 0 0",
    fontSize: 17,
    lineHeight: 1.35,
    color: AVALUE_RED,
    fontWeight: 800,
  },

  company: {
    margin: "6px 0 0",
    fontSize: 14.5,
    lineHeight: 1.4,
    color: "#333",
    fontWeight: 500,
  },

  quickActionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 10,
    marginTop: 22,
  },

  quickAction: {
    textDecoration: "none",
    color: DARK,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 700,
  },

  quickIcon: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    background:
      "linear-gradient(145deg, #B5121B 0%, #7e0e14 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 900,
    boxShadow: "0 10px 18px rgba(181,18,27,0.25)",
  },

  mainButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 26,
  },

  saveButton: {
    border: "none",
    borderRadius: 999,
    padding: "14px 10px",
    background:
      "linear-gradient(145deg, #B5121B 0%, #8f1118 100%)",
    color: "#fff",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 900,
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(181,18,27,0.28)",
  },

  shareButton: {
    border: `1px solid ${AVALUE_RED}`,
    borderRadius: 999,
    padding: "14px 10px",
    background: "#fff",
    color: AVALUE_RED,
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
  },

  section: {
    padding: "24px 22px",
    background: "#ffffff",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  sectionTitle: {
    margin: "0 0 16px",
    fontSize: 22,
    lineHeight: 1.2,
    color: DARK,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  bio: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.65,
    color: "#333",
    whiteSpace: "pre-line",
  },

  contactCard: {
    borderRadius: 22,
    background: "#fafafa",
    border: "1px solid rgba(0,0,0,0.06)",
    overflow: "hidden",
  },

  contactRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: "15px 14px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  contactLabel: {
    display: "block",
    fontSize: 12,
    color: "#777",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    marginBottom: 4,
  },

  contactValue: {
    display: "block",
    color: "#1f1f1f",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
    wordBreak: "break-word",
  },

  rowButton: {
    minWidth: 54,
    textAlign: "center",
    background: AVALUE_RED,
    color: "#fff",
    textDecoration: "none",
    padding: "9px 10px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 900,
    flexShrink: 0,
  },

  serviceGrid: {
    display: "grid",
    gap: 10,
  },

  serviceItem: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    background:
      "linear-gradient(145deg, #ffffff 0%, #f7f7f7 100%)",
    border: "1px solid rgba(181,18,27,0.12)",
    borderRadius: 16,
    padding: "13px 14px",
    color: "#222",
    fontSize: 15,
    fontWeight: 700,
    boxShadow: "0 8px 18px rgba(0,0,0,0.04)",
  },

  serviceDot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: AVALUE_RED,
    marginTop: 6,
    flexShrink: 0,
  },

  footer: {
    background:
      "linear-gradient(145deg, #2b2b2b 0%, #111111 100%)",
    color: "#fff",
    padding: "24px 22px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  footerLogo: {
    height: 34,
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
    opacity: 0.95,
  },

  footerText: {
    margin: "10px 0 0",
    fontSize: 13,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.82)",
  },

  centerPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: 20,
    fontFamily:
      "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  },

  loadingCard: {
    maxWidth: 380,
    background: "#fff",
    borderRadius: 24,
    padding: 28,
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
  },

  loadingLogo: {
    width: 160,
    marginBottom: 16,
  },

  primaryButton: {
    display: "inline-block",
    marginTop: 16,
    background: AVALUE_RED,
    color: "#fff",
    textDecoration: "none",
    borderRadius: 999,
    padding: "12px 18px",
    fontWeight: 900,
  },
};