import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useI18n } from "../i18n/useI18n";
import { getExperiences } from "../api/experience.api";
import { getProfile } from "../api/profile.api";
import { getProjects } from "../api/project.api";
import { getSkills } from "../api/skill.api";
import type { Experience } from "../types/experience";
import type { Profile } from "../types/profile";
import type { Project } from "../types/project";
import type { Skill } from "../types/skill";
import type { Language } from "../i18n/types";
import GBLoader from "../components/GBLoader";
import "../styles/pages/home.css";

type HomeData = {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
};

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getTechnologies(technologies: string) {
  return technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

function formatDate(value: string | null, language: Language, fallback: string) {
  if (!value) return fallback;

  return new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", {
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function getLocalizedValue(
  language: Language,
  defaultValue: string,
  localizedValue?: string | null
) {
  if (language === "tr" && localizedValue?.trim()) {
    return localizedValue;
  }

  return defaultValue;
}

function getSkillMeta(name: string) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  const mappings: Record<string, { icon: string, color: string }> = {
    react: { icon: "devicon-react-original", color: "#61DAFB" },
    nextjs: { icon: "devicon-nextjs-plain", color: "#ffffff" },
    typescript: { icon: "devicon-typescript-plain", color: "#3178C6" },
    javascript: { icon: "devicon-javascript-plain", color: "#F7DF1E" },
    html: { icon: "devicon-html5-plain", color: "#E34F26" },
    html5: { icon: "devicon-html5-plain", color: "#E34F26" },
    css: { icon: "devicon-css3-plain", color: "#1572B6" },
    css3: { icon: "devicon-css3-plain", color: "#1572B6" },
    tailwind: { icon: "devicon-tailwindcss-plain", color: "#06B6D4" },
    tailwindcss: { icon: "devicon-tailwindcss-plain", color: "#06B6D4" },
    node: { icon: "devicon-nodejs-plain", color: "#339933" },
    nodejs: { icon: "devicon-nodejs-plain", color: "#339933" },
    git: { icon: "devicon-git-plain", color: "#F05032" },
    docker: { icon: "devicon-docker-plain", color: "#2496ED" },
    c: { icon: "devicon-c-plain", color: "#A8B9CC" },
    cplusplus: { icon: "devicon-cplusplus-plain", color: "#00599C" },
    cpp: { icon: "devicon-cplusplus-plain", color: "#00599C" },
    csharp: { icon: "devicon-csharp-plain", color: "#239120" },
    python: { icon: "devicon-python-plain", color: "#3776AB" },
    java: { icon: "devicon-java-plain", color: "#007396" },
    sql: { icon: "devicon-microsoftsqlserver-plain", color: "#CC2927" },
    mssql: { icon: "devicon-microsoftsqlserver-plain", color: "#CC2927" },
    microsoftsqlserver: { icon: "devicon-microsoftsqlserver-plain", color: "#CC2927" },
    mysql: { icon: "devicon-mysql-plain", color: "#4479A1" },
    postgresql: { icon: "devicon-postgresql-plain", color: "#336791" },
    mongodb: { icon: "devicon-mongodb-plain", color: "#47A248" },
    php: { icon: "devicon-php-plain", color: "#777BB4" },
    vue: { icon: "devicon-vuejs-plain", color: "#4FC08D" },
    vuejs: { icon: "devicon-vuejs-plain", color: "#4FC08D" },
    vue2: { icon: "devicon-vuejs-plain", color: "#4FC08D" },
    vue3: { icon: "devicon-vuejs-plain", color: "#4FC08D" },
    angular: { icon: "devicon-angularjs-plain", color: "#DD0031" },
    kubernetes: { icon: "devicon-kubernetes-plain", color: "#326CE5" },
    k8s: { icon: "devicon-kubernetes-plain", color: "#326CE5" },
    linux: { icon: "devicon-linux-plain", color: "#FCC624" },
    bootstrap: { icon: "devicon-bootstrap-plain", color: "#7952B3" },
    rust: { icon: "devicon-rust-plain", color: "#000000" },
    go: { icon: "devicon-go-original-wordmark", color: "#00ADD8" },
    ruby: { icon: "devicon-ruby-plain", color: "#CC342D" },
  };

  return mappings[normalized] || { icon: "devicon-devicon-plain", color: "#94a3b8" };
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerSection: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const hoverLift = { y: -6, scale: 1.01 };

export default function HomePage() {
  const { language, setLanguage, t } = useI18n();
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [profile, projects, skills, experiences] = await Promise.all([
          getProfile(),
          getProjects(),
          getSkills(),
          getExperiences()
        ]);

        setData({
          profile,
          projects: projects.filter((project) => project.published),
          skills: skills.filter((skill) => skill.published),
          experiences: experiences.filter((experience) => experience.published)
        });
      } catch {
        setError(t("home.loadError"));
      }
    }

    void loadData();
  }, [t]);

  if (error) {
    return (
      <main className="portfolio-page">
        <div className="portfolio-state">{error}</div>
      </main>
    );
  }

  if (!data) {
    return <GBLoader />;
  }

  const { profile, projects, experiences } = data;
  const skillCount = data.skills.length;
  const experienceCount = experiences.length;
  const projectCount = projects.length;
  const profileTitle = getLocalizedValue(language, profile.title, profile.titleTr);
  const profileShortBio = getLocalizedValue(language, profile.shortBio, profile.shortBioTr);
  const profileAbout = getLocalizedValue(language, profile.about, profile.aboutTr);

  return (
    <motion.main
      className="portfolio-page"
      initial="hidden"
      animate="visible"
      variants={staggerSection}
    >
      <motion.nav
        className="portfolio-nav"
        aria-label={t("home.navLabel")}
        variants={fadeInUp}
      >
        <a className="portfolio-brand" href="#home">
          {getInitials(profile.fullName) || "DF"}
        </a>
        <div className="portfolio-nav-actions">
          <div className="portfolio-nav-links">
            {[
              { label: t("home.nav.work"), href: "#work" },
              { label: t("home.nav.skills"), href: "#skills" },
              { label: t("home.nav.experience"), href: "#experience" },
              { label: t("profile.contactSection"), href: "#contact" }
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={fadeInUp}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="portfolio-language-switcher" aria-label={t("common.language")}>
            <button
              className={language === "tr" ? "portfolio-language-option active" : "portfolio-language-option"}
              type="button"
              onClick={() => setLanguage("tr")}
              aria-pressed={language === "tr"}
            >
              TR
            </button>
            <button
              className={language === "en" ? "portfolio-language-option active" : "portfolio-language-option"}
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </motion.nav>

      <motion.section
        className="portfolio-hero"
        id="home"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="portfolio-hero-content" variants={staggerSection}>
          <motion.p className="portfolio-eyebrow" variants={fadeInUp}>
            {t("home.heroEyebrow")}
          </motion.p>
          <motion.h1 variants={fadeInUp}>{profile.fullName}</motion.h1>
          <motion.h2 variants={fadeInUp}>{profileTitle}</motion.h2>
          <motion.p className="portfolio-copy" variants={fadeInUp}>
            {profileShortBio || t("home.heroText")}
          </motion.p>

          <motion.div className="portfolio-hero-pill-grid" variants={staggerSection}>
            {[
              { key: "design", label: t("home.heroPillA") },
              { key: "stack", label: t("home.heroPillB") },
              { key: "performance", label: t("home.heroPillC") }
            ].map((pill) => (
              <motion.span className="portfolio-hero-pill" key={pill.key} variants={fadeInUp} whileHover={{ y: -2 }}>
                {pill.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="portfolio-actions" variants={fadeInUp}>
            <motion.a
              className="portfolio-button primary"
              href="#work"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              {t("home.heroButtonWork")}
            </motion.a>
            {profile.cvUrl && (
              <motion.a
                className="portfolio-button secondary"
                href={profile.cvUrl}
                download
                whileHover={{ y: -2, scale: 1.02 }}
              >
                {t("home.heroButtonCV")}
              </motion.a>
            )}
          </motion.div>

          <motion.div className="portfolio-hero-stat-grid" variants={staggerSection}>
            {[
              { key: "projects", label: t("home.heroStatProjects"), value: projectCount },
              { key: "skills", label: t("home.heroStatSkills"), value: skillCount },
              { key: "experience", label: t("home.heroStatExperience"), value: experienceCount }
            ].map((stat) => (
              <motion.div className="portfolio-hero-stat" key={stat.key} variants={fadeInUp} whileHover={{ y: -4 }}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </motion.section>

      <motion.section
        className="portfolio-section portfolio-about"
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeInUp}
      >
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.aboutEyebrow")}</p>
            <h2>{t("home.aboutTitle")}</h2>
          </div>
        </div>

        <div className="portfolio-about-grid">
          <div className="portfolio-about-copy">
            <p>{profileAbout}</p>
          </div>

          <div className="portfolio-feature-grid">
            <motion.article className="portfolio-feature-card" variants={fadeInUp} whileHover={hoverLift}>
              <h3>{t("home.aboutFeature1Title")}</h3>
              <p>{t("home.aboutFeature1Text")}</p>
            </motion.article>
            <motion.article className="portfolio-feature-card" variants={fadeInUp} whileHover={hoverLift}>
              <h3>{t("home.aboutFeature2Title")}</h3>
              <p>{t("home.aboutFeature2Text")}</p>
            </motion.article>
            <motion.article className="portfolio-feature-card" variants={fadeInUp} whileHover={hoverLift}>
              <h3>{t("home.aboutFeature3Title")}</h3>
              <p>{t("home.aboutFeature3Text")}</p>
            </motion.article>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="portfolio-section"
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.workEyebrow")}</p>
            <h2>{t("home.workTitle")}</h2>
          </div>
        </div>

        <div className="portfolio-project-grid">
          {projects.map((project) => (
            <motion.article
              className="portfolio-project-card"
              key={project.id}
              variants={fadeInUp}
              whileHover={hoverLift}
            >
              <div className="project-card-head">
                <h3>{getLocalizedValue(language, project.title, project.titleTr)}</h3>
                <p>{getLocalizedValue(language, project.description, project.descriptionTr)}</p>
              </div>

              <div className="portfolio-chip-list">
                {getTechnologies(project.technologies).map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <div className="portfolio-card-actions">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    {t("common.github")}
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    {t("common.live")}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="portfolio-section"
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        variants={fadeInUp}
      >
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.skillsEyebrow")}</p>
            <h2>{t("home.skillsTitle")}</h2>
          </div>
        </div>

        <div className="new-skill-grid">
          {data.skills.map((skill) => {
            const meta = getSkillMeta(skill.name);
            return (
              <motion.div
                className="new-skill-card"
                key={skill.id}
                style={{ "--skill-color": meta.color } as React.CSSProperties}
                variants={fadeInUp}
                whileHover={hoverLift}
              >
                <div className="skill-icon-glow"></div>
                <div className="skill-icon-wrapper">
                  <i className={`${meta.icon} colored`}></i>
                </div>
                <span className="skill-name">{skill.name}</span>
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        className="portfolio-section"
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.experienceEyebrow")}</p>
            <h2>{t("home.experienceTitle")}</h2>
          </div>
        </div>

        <div className="portfolio-timeline">
          {experiences.map((experience) => (
            <motion.article
              className="portfolio-timeline-item"
              key={experience.id}
              variants={fadeInUp}
              whileHover={hoverLift}
            >
              <div className="portfolio-timeline-dot" aria-hidden="true" />
              <div>
                <h3>{getLocalizedValue(language, experience.position, experience.positionTr)}</h3>
                <p>{getLocalizedValue(language, experience.company, experience.companyTr)}</p>
                <span>
                  {formatDate(experience.startDate, language, t("home.present"))} - {experience.isCurrent ? t("home.present") : formatDate(experience.endDate, language, t("home.present"))}
                </span>
                <p>{getLocalizedValue(language, experience.description, experience.descriptionTr)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="portfolio-contact"
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeInUp}
      >
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("profile.contactSection")}</p>
            <h2>{t("home.contactTitle")}</h2>
          </div>
          <span>{profile.email}</span>
        </div>

        <div className="portfolio-contact-grid">
          <motion.article className="portfolio-contact-card" variants={fadeInUp} whileHover={hoverLift}>
            <h3>{t("home.contactCardTitle")}</h3>
            <p>{t("home.contactCardMessage")}</p>
            <motion.a
              className="portfolio-button primary"
              href={`mailto:${profile.email}`}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              {t("home.contactButtonEmail")}
            </motion.a>
          </motion.article>

          <motion.article className="portfolio-contact-card" variants={fadeInUp} whileHover={hoverLift}>
            <h3>{t("home.followTitle")}</h3>
            <p>{t("home.followMessage")}</p>
            <div className="portfolio-card-actions">
              {profile.githubUrl && (
                <motion.a
                  className="portfolio-button secondary"
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  {t("common.github")}
                </motion.a>
              )}
              {profile.linkedinUrl && (
                <motion.a
                  className="portfolio-button secondary"
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  LinkedIn
                </motion.a>
              )}
            </div>
          </motion.article>
        </div>
      </motion.section>
    </motion.main>
  );
}
