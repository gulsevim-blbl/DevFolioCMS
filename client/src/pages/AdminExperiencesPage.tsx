import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  createExperience,
  deleteExperience,
  getExperiences
} from "../api/experience.api";
import { ConfirmModal } from "../components/ConfirmModal";
import type { Language } from "../i18n/types";
import { useI18n } from "../i18n/useI18n";
import type { Experience } from "../types/experience";
import "../styles/pages/experiences.css";

function formatDate(value: string | null, language: Language, fallback: string) {
  if (!value) return fallback;
  return new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", {
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export default function AdminExperiencesPage() {
  const { language, t } = useI18n();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; message: string } | null>(null);

  const currentCount = useMemo(
    () => experiences.filter((experience) => experience.isCurrent).length,
    [experiences]
  );

  const locationCount = useMemo(
    () => new Set(experiences.map((experience) => experience.location).filter(Boolean)).size,
    [experiences]
  );

  const loadExperiences = useCallback(async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
      setError("");
    } catch {
      setError(t("experiences.loadError"));
    }
  }, [t]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadExperiences();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadExperiences]);

  function resetForm() {
    setCompany("");
    setPosition("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setIsCurrent(false);
    setLocation("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await createExperience({
        company,
        position,
        description,
        startDate,
        endDate: isCurrent ? null : endDate,
        isCurrent,
        location,
        sortOrder: experiences.length + 1,
        published: true
      });

      resetForm();
      await loadExperiences();
    } catch {
      setError(t("experiences.addError"));
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(id: number) {
    setDeleteTarget({ id, message: t("experiences.deleteConfirm") });
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    setError("");

    try {
      await deleteExperience(deleteTarget.id);
      await loadExperiences();
    } catch {
      setError(t("experiences.deleteError"));
    } finally {
      setDeleteTarget(null);
    }
  }

  function handleCancelDelete() {
    setDeleteTarget(null);
  }

  return (
    <div className="page experiences-page">
      <section className="experiences-hero">
        <div>
          <p className="eyebrow">{t("experiences.eyebrow")}</p>
          <h1>{t("experiences.title")}</h1>
          <p>{t("experiences.description")}</p>
        </div>

        <div className="experiences-metrics">
          <div>
            <span>{experiences.length}</span>
            <p>{t("experiences.title")}</p>
          </div>
          <div>
            <span>{currentCount}</span>
            <p>{t("common.current")}</p>
          </div>
          <div>
            <span>{locationCount}</span>
            <p>{t("fields.location")}</p>
          </div>
        </div>
      </section>

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      <div className="experiences-layout">
        <form className="experiences-form-card" onSubmit={handleSubmit}>
          <div className="experiences-card-header">
            <div>
              <h2>{t("experiences.newTitle")}</h2>
              <p>{t("experiences.newDescription")}</p>
            </div>
            <span className="experiences-card-badge">{t("common.published")}</span>
          </div>

          <div className="experiences-form-body">
            <div className="field">
              <label htmlFor="experience-company">{t("fields.company")}</label>
              <input
                id="experience-company"
                className="input"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="experience-position">{t("fields.position")}</label>
              <input
                id="experience-position"
                className="input"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="experience-description">{t("fields.description")}</label>
              <textarea
                id="experience-description"
                className="textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div className="experience-date-grid">
              <div className="field">
                <label htmlFor="experience-start">{t("fields.startDate")}</label>
                <input
                  id="experience-start"
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="experience-end">{t("fields.endDate")}</label>
                <input
                  id="experience-end"
                  className="input"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  disabled={isCurrent}
                />
              </div>
            </div>

            <label className="experience-current-toggle">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(event) => setIsCurrent(event.target.checked)}
              />
              <span>{t("experiences.currentWork")}</span>
            </label>

            <div className="field">
              <label htmlFor="experience-location">{t("fields.location")}</label>
              <input
                id="experience-location"
                className="input"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Istanbul, Remote"
              />
            </div>

            <button className="btn btn-primary btn-full" type="submit" disabled={isLoading}>
              {isLoading ? t("experiences.adding") : t("experiences.add")}
            </button>
          </div>
        </form>

        <section className="experiences-list-panel">
          <div className="experiences-card-header">
            <div>
              <h2>{t("experiences.listTitle")}</h2>
              <p>{t("experiences.listDescription")}</p>
            </div>
            <span className="experiences-card-badge">
              {t("experiences.count", { count: experiences.length })}
            </span>
          </div>

          <div className="experiences-list-body">
            {experiences.length === 0 ? (
              <div className="empty-state">{t("experiences.empty")}</div>
            ) : (
              <div className="experiences-timeline">
                {experiences.map((experience) => {
                  const start = formatDate(experience.startDate, language, t("common.present"));
                  const end = experience.isCurrent
                    ? t("common.present")
                    : formatDate(experience.endDate, language, t("common.present"));

                  return (
                    <article className="experience-row-card" key={experience.id}>
                      <div className="experience-timeline-dot" aria-hidden="true" />

                      <div className="experience-row-main">
                        <div className="experience-row-title">
                          <div>
                            <h3>{experience.position}</h3>
                            <p>{experience.company}</p>
                          </div>
                          <span className={experience.isCurrent ? "badge badge-live" : "badge badge-draft"}>
                            {experience.isCurrent ? t("common.current") : t("common.past")}
                          </span>
                        </div>

                        <div className="experience-row-meta">
                          <span>{start} - {end}</span>
                          {experience.location && <span>{experience.location}</span>}
                        </div>

                        <p className="experience-description">{experience.description}</p>
                      </div>

                      <div className="experience-row-actions">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(experience.id)}
                          type="button"
                        >
                          {t("common.delete")}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title={t("common.confirmDelete")}
        message={deleteTarget?.message ?? ""}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
