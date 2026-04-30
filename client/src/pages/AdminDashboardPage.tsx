import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";
import "../styles/pages/dashboard.css";

const modules = [
  {
    to: "/admin/projects",
    icon: "PR",
    titleKey: "nav.projects",
    descriptionKey: "dashboard.projectsDescription",
    statusKey: "dashboard.statusCrud",
    tone: "blue"
  },
  {
    to: "/admin/skills",
    icon: "SK",
    titleKey: "nav.skills",
    descriptionKey: "dashboard.skillsDescription",
    statusKey: "dashboard.statusLive",
    tone: "green"
  },
  {
    to: "/admin/experiences",
    icon: "EX",
    titleKey: "nav.experiences",
    descriptionKey: "dashboard.experiencesDescription",
    statusKey: "dashboard.statusLive",
    tone: "amber"
  },
  {
    to: "/admin/profile",
    icon: "PF",
    titleKey: "nav.profile",
    descriptionKey: "dashboard.profileDescription",
    statusKey: "dashboard.statusReady",
    tone: "violet"
  }
];

const quickLinks = [
  {
    to: "/admin/projects",
    titleKey: "dashboard.quickProjectTitle",
    descriptionKey: "dashboard.projectsDescription"
  },
  {
    to: "/admin/profile",
    titleKey: "dashboard.quickProfileTitle",
    descriptionKey: "dashboard.profileDescription"
  },
  {
    to: "/admin/skills",
    titleKey: "dashboard.quickSkillTitle",
    descriptionKey: "dashboard.skillsDescription"
  }
];

const nextSteps = [
  "dashboard.nextStepProjects",
  "dashboard.nextStepProfile",
  "dashboard.nextStepReview"
];

export default function AdminDashboardPage() {
  const { t } = useI18n();

  return (
    <div className="page dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-status">{t("dashboard.heroStatus")}</span>
          <p className="eyebrow">{t("dashboard.eyebrow")}</p>
          <h1>{t("dashboard.title")}</h1>
          <p>{t("dashboard.description")}</p>
        </div>

        <div className="dashboard-hero-actions">
          <Link className="btn btn-primary" to="/admin/projects">
            {t("dashboard.primaryAction")}
          </Link>
          <Link className="btn btn-secondary" to="/admin/profile">
            {t("dashboard.secondaryAction")}
          </Link>
        </div>
      </section>

      <section className="dashboard-module-grid" aria-label={t("dashboard.statusLabel")}>
        {modules.map((module) => (
          <Link className={`dashboard-module-card tone-${module.tone}`} key={module.to} to={module.to}>
            <div className="dashboard-module-top">
              <span className="dashboard-module-icon">{module.icon}</span>
              <span className="dashboard-module-status">{t(module.statusKey)}</span>
            </div>
            <h2>{t(module.titleKey)}</h2>
            <p>{t(module.descriptionKey)}</p>
          </Link>
        ))}
      </section>

      <section className="dashboard-workspace-grid">
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>{t("dashboard.quickActions")}</h2>
              <p>{t("dashboard.quickActionsDescription")}</p>
            </div>
          </div>

          <div className="dashboard-action-list">
            {quickLinks.map((link) => (
              <Link className="dashboard-action-item" key={link.to} to={link.to}>
                <div>
                  <h3>{t(link.titleKey)}</h3>
                  <p>{t(link.descriptionKey)}</p>
                </div>
                <span aria-hidden="true">{">"}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>{t("dashboard.nextStepsTitle")}</h2>
              <p>{t("dashboard.nextStepsDescription")}</p>
            </div>
          </div>

          <div className="dashboard-check-list">
            {nextSteps.map((stepKey) => (
              <div className="dashboard-check-item" key={stepKey}>
                <span aria-hidden="true" />
                <p>{t(stepKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
