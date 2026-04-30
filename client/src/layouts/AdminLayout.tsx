import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import { useAuthStore } from "../store/auth.store";

const navItems = [
  { to: "/admin", labelKey: "nav.dashboard", icon: "DB", end: true },
  { to: "/admin/projects", labelKey: "nav.projects", icon: "PR" },
  { to: "/admin/skills", labelKey: "nav.skills", icon: "SK" },
  { to: "/admin/experiences", labelKey: "nav.experiences", icon: "EX" },
  { to: "/admin/profile", labelKey: "nav.profile", icon: "PF" }
];

export default function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { language, setLanguage, t } = useI18n();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">
          <div className="brand-mark">DF</div>
          <div>
            <h1 className="brand-title">{t("app.name")}</h1>
            <p className="brand-subtitle">{t("app.cms")}</p>
          </div>
        </div>

        <nav className="admin-nav" aria-label={t("app.cms")}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user">
            <strong>{t("common.admin")}</strong>
            <span>{user?.email ?? t("common.signedIn")}</span>
          </div>

          <div className="language-switcher" aria-label={t("common.language")}>
            <button
              className={language === "tr" ? "language-option active" : "language-option"}
              onClick={() => setLanguage("tr")}
              type="button"
            >
              TR
            </button>
            <button
              className={language === "en" ? "language-option active" : "language-option"}
              onClick={() => setLanguage("en")}
              type="button"
            >
              EN
            </button>
          </div>

          <button className="btn btn-secondary btn-full" onClick={handleLogout}>
            {t("common.logout")}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
