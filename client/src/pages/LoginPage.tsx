import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth.api";
import { useI18n } from "../i18n/useI18n";
import { useAuthStore } from "../store/auth.store";
import "../styles/pages/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { language, setLanguage, t } = useI18n();

  const [email, setEmail] = useState("admin@devfolio.com");
  const [password, setPassword] = useState("Admin123*");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginRequest({ email, password });
      login(response.data.token, response.data.user);
      navigate("/admin");
    } catch {
      setError(t("login.error"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-shell">
        <div className="login-hero-panel">
          <div className="login-brand-inline">
            <div className="login-mark">DF</div>
            <div>
              <p className="login-kicker">{t("app.cms")}</p>
              <h1>{t("login.title")}</h1>
            </div>
          </div>

          <div className="login-hero-copy">
            <p className="eyebrow">{t("login.heroEyebrow")}</p>
            <h2>{t("login.heroTitle")}</h2>
            <p>{t("login.heroDescription")}</p>
          </div>

          <div className="login-feature-list">
            <div>
              <span className="login-feature-icon">01</span>
              <strong>{t("login.featureContentTitle")}</strong>
              <p>{t("login.featureContentText")}</p>
            </div>
            <div>
              <span className="login-feature-icon">02</span>
              <strong>{t("login.featureSecureTitle")}</strong>
              <p>{t("login.featureSecureText")}</p>
            </div>
          </div>
        </div>

        <form className="login-form-panel" onSubmit={handleSubmit}>
          <div className="login-form-header">
            <div>
              <p className="eyebrow">{t("login.formEyebrow")}</p>
              <h2>{t("login.formTitle")}</h2>
              <p>{t("login.description")}</p>
            </div>

            <div className="login-language-switcher" aria-label={t("common.language")}>
              <button
                className={language === "tr" ? "login-language-option active" : "login-language-option"}
                onClick={() => setLanguage("tr")}
                type="button"
              >
                TR
              </button>
              <button
                className={language === "en" ? "login-language-option active" : "login-language-option"}
                onClick={() => setLanguage("en")}
                type="button"
              >
                EN
              </button>
            </div>
          </div>

          <div className="form-grid">

            {error && (
              <p className="alert" role="alert">
                {error}
              </p>
            )}

            <div className="field">
              <label htmlFor="email">{t("login.email")}</label>
              <input
                id="email"
                className="input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">{t("login.password")}</label>
              <div className="password-field">
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  {showPassword ? t("login.hidePassword") : t("login.showPassword")}
                </button>
              </div>
            </div>

            <button className="btn btn-primary btn-full" type="submit" disabled={isLoading}>
              {isLoading ? t("login.loading") : t("login.submit")}
            </button>

            <p className="login-helper">{t("login.helperText")}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
