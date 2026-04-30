import { useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n/useI18n";
import { getExperiences } from "../api/experience.api";
import { getProfile } from "../api/profile.api";
import { getProjects } from "../api/project.api";
import { getSkills } from "../api/skill.api";
import type { Experience } from "../types/experience";
import type { Profile } from "../types/profile";
import type { Project } from "../types/project";
import type { Skill } from "../types/skill";
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

function formatDate(value: string | null) {
  if (!value) return "Present";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export default function HomePage() {
  const { t } = useI18n();
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
        setError("Portfolio content could not be loaded.");
      }
    }

    void loadData();
  }, []);

  const groupedSkills = useMemo(() => {
    if (!data) return [];

    return Object.entries(
      data.skills.reduce<Record<string, Skill[]>>((groups, skill) => {
        groups[skill.category] = [...(groups[skill.category] ?? []), skill];
        return groups;
      }, {})
    );
  }, [data]);

  if (error) {
    return (
      <main className="portfolio-page">
        <div className="portfolio-state">{error}</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="portfolio-page">
        <div className="portfolio-state">Loading portfolio...</div>
      </main>
    );
  }

  const { profile, projects, experiences } = data;
  const skillCount = data.skills.length;
  const experienceCount = experiences.length;
  const projectCount = projects.length;

  return (
    <main className="portfolio-page">
      <nav className="portfolio-nav" aria-label={t("home.navLabel")}>
        <a className="portfolio-brand" href="#home">
          {getInitials(profile.fullName) || "DF"}
        </a>
        <div className="portfolio-nav-links">
          <a href="#work">{t("home.nav.work")}</a>
          <a href="#skills">{t("home.nav.skills")}</a>
          <a href="#experience">{t("home.nav.experience")}</a>
          <a href="#contact">{t("profile.contactSection")}</a>
        </div>
      </nav>

      <section className="portfolio-hero" id="home">
        <div className="portfolio-hero-content">
          <p className="portfolio-eyebrow">{t("home.heroEyebrow")}</p>
          <h1>{profile.fullName}</h1>
          <h2>{profile.title}</h2>
          <p className="portfolio-copy">{profile.shortBio || t("home.heroText")}</p>

          <div className="portfolio-hero-pill-grid">
            <span className="portfolio-hero-pill">{t("home.heroPillA")}</span>
            <span className="portfolio-hero-pill">{t("home.heroPillB")}</span>
            <span className="portfolio-hero-pill">{t("home.heroPillC")}</span>
          </div>

          <div className="portfolio-actions">
            <a className="portfolio-button primary" href="#work">
              {t("home.heroButtonWork")}
            </a>
            {profile.cvUrl && (
              <a className="portfolio-button secondary" href={profile.cvUrl} download>
                {t("home.heroButtonCV")}
              </a>
            )}
          </div>

          <div className="portfolio-hero-stat-grid">
            <div className="portfolio-hero-stat">
              <span>Projects shipped</span>
              <strong>{projectCount}</strong>
            </div>
            <div className="portfolio-hero-stat">
              <span>Skill focus</span>
              <strong>{skillCount}</strong>
            </div>
            <div className="portfolio-hero-stat">
              <span>Experience cards</span>
              <strong>{experienceCount}</strong>
            </div>
          </div>
        </div>

        <aside className="portfolio-hero-card">
          {profile.imageUrl ? (
            <img src={profile.imageUrl} alt={profile.fullName} />
          ) : (
            <div className="portfolio-avatar">{getInitials(profile.fullName)}</div>
          )}

          <div className="portfolio-hero-card-meta">
            <span className="badge">{t("home.availableForHire")}</span>
            <strong>{profile.location || t("home.remote")}</strong>
          </div>

          <div className="portfolio-hero-card-list">
            <div>
              <p>{t("home.primaryFocus")}</p>
              <strong>{profile.title}</strong>
            </div>
            <div>
              <p>{t("home.contactLabel")}</p>
              <strong>{profile.email}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="portfolio-section portfolio-about" id="about">
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.aboutEyebrow")}</p>
            <h2>{t("home.aboutTitle")}</h2>
          </div>
          <span>{profile.location || t("home.remote")}</span>
        </div>

        <div className="portfolio-about-grid">
          <div className="portfolio-about-copy">
            <p>{profile.about}</p>
          </div>

          <div className="portfolio-feature-grid">
            <article className="portfolio-feature-card">
              <h3>{t("home.aboutFeature1Title")}</h3>
              <p>{t("home.aboutFeature1Text")}</p>
            </article>
            <article className="portfolio-feature-card">
              <h3>{t("home.aboutFeature2Title")}</h3>
              <p>{t("home.aboutFeature2Text")}</p>
            </article>
            <article className="portfolio-feature-card">
              <h3>{t("home.aboutFeature3Title")}</h3>
              <p>{t("home.aboutFeature3Text")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="work">
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.workEyebrow")}</p>
            <h2>{t("home.workTitle")}</h2>
          </div>
          <span>{t("home.workSubtitle", { count: projectCount })}</span>
        </div>

        <div className="portfolio-project-grid">
          {projects.map((project) => (
            <article className="portfolio-project-card" key={project.id}>
              <div className="project-card-head">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="portfolio-chip-list">
                {getTechnologies(project.technologies).map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <div className="portfolio-card-actions">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="skills">
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.skillsEyebrow")}</p>
            <h2>{t("home.skillsTitle")}</h2>
          </div>
          <span>{t("home.skillsSubtitle", { count: skillCount })}</span>
        </div>

        <div className="portfolio-skill-grid">
          {groupedSkills.map(([category, skills]) => (
            <article className="portfolio-skill-group" key={category}>
              <h3>{category}</h3>
              <div className="portfolio-skill-list">
                {skills.map((skill) => (
                  <div className="portfolio-skill-item" key={skill.id}>
                    <div>
                      <span>{skill.name}</span>
                      <strong>{skill.level}</strong>
                    </div>
                    <div className="portfolio-skill-bar">
                      <span style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="experience">
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("home.experienceEyebrow")}</p>
            <h2>{t("home.experienceTitle")}</h2>
          </div>
          <span>{t("home.experienceSubtitle", { count: experienceCount })}</span>
        </div>

        <div className="portfolio-timeline">
          {experiences.map((experience) => (
            <article className="portfolio-timeline-item" key={experience.id}>
              <div className="portfolio-timeline-dot" aria-hidden="true" />
              <div>
                <h3>{experience.position}</h3>
                <p>{experience.company}</p>
                <span>
                  {formatDate(experience.startDate)} - {experience.isCurrent ? t("home.present") : formatDate(experience.endDate)}
                </span>
                <p>{experience.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-contact" id="contact">
        <div className="portfolio-section-header">
          <div>
            <p className="portfolio-eyebrow">{t("profile.contactSection")}</p>
            <h2>{t("home.contactTitle")}</h2>
          </div>
          <span>{profile.email}</span>
        </div>

        <div className="portfolio-contact-grid">
          <article className="portfolio-contact-card">
            <h3>{t("home.contactCardTitle")}</h3>
            <p>{t("home.contactCardMessage")}</p>
            <a className="portfolio-button primary" href={`mailto:${profile.email}`}>
              {t("home.contactButtonEmail")}
            </a>
          </article>

          <article className="portfolio-contact-card">
            <h3>{t("home.followTitle")}</h3>
            <p>{t("home.followMessage")}</p>
            <div className="portfolio-card-actions">
              {profile.githubUrl && (
                <a className="portfolio-button secondary" href={profile.githubUrl} target="_blank" rel="noreferrer">
                  {t("common.github")}
                </a>
              )}
              {profile.linkedinUrl && (
                <a className="portfolio-button secondary" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
