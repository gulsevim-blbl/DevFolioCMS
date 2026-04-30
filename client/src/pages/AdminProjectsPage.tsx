import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createProject,
  deleteProject,
  getProjects
} from "../api/project.api";
import { useI18n } from "../i18n/useI18n";
import type { Project } from "../types/project";
import { ConfirmModal } from "../components/ConfirmModal";
import "../styles/pages/projects.css";

function getTechnologyList(technologies: string) {
  return technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

export default function AdminProjectsPage() {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; message: string } | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      setError("");
    } catch {
      setError(t("projects.loadError"));
    }
  }, [t]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadProjects]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await createProject({
        title,
        description,
        technologies,
        githubUrl,
        featured: false,
        published: true,
        sortOrder: projects.length + 1
      });

      setTitle("");
      setDescription("");
      setTechnologies("");
      setGithubUrl("");

      await loadProjects();
    } catch {
      setError(t("projects.addError"));
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(id: number) {
    setDeleteTarget({ id, message: t("projects.deleteConfirm") });
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    setError("");

    try {
      await deleteProject(deleteTarget.id);
      await loadProjects();
    } catch {
      setError(t("projects.deleteError"));
    } finally {
      setDeleteTarget(null);
    }
  }

  function handleCancelDelete() {
    setDeleteTarget(null);
  }

  return (
    <div className="page projects-page">
      <section className="projects-hero">
        <div>
          <p className="eyebrow">{t("projects.eyebrow")}</p>
          <h1>{t("projects.title")}</h1>
          <p>{t("projects.description")}</p>
        </div>

        <div className="projects-hero-metric">
          <span>{projects.length}</span>
          <p>{t("projects.title")}</p>
        </div>
      </section>

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      <div className="projects-layout">
        <form className="projects-form-card" onSubmit={handleSubmit}>
          <div className="projects-card-header">
            <div>
              <h2>{t("projects.newTitle")}</h2>
              <p>{t("projects.newDescription")}</p>
            </div>
            <span className="projects-card-badge">{t("common.published")}</span>
          </div>

          <div className="projects-form-body">
            <div className="field">
              <label htmlFor="project-title">{t("fields.title")}</label>
              <input
                id="project-title"
                className="input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="project-description">{t("fields.description")}</label>
              <textarea
                id="project-description"
                className="textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="field">
              <label htmlFor="project-technologies">{t("fields.technologies")}</label>
              <input
                id="project-technologies"
                className="input"
                value={technologies}
                onChange={(event) => setTechnologies(event.target.value)}
                required
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="field">
              <label htmlFor="project-github">{t("fields.githubUrl")}</label>
              <input
                id="project-github"
                className="input"
                value={githubUrl}
                onChange={(event) => setGithubUrl(event.target.value)}
                placeholder="https://github.com/..."
              />
            </div>

            <button className="btn btn-primary btn-full" type="submit" disabled={isLoading}>
              {isLoading ? t("projects.adding") : t("projects.add")}
            </button>
          </div>
        </form>

        <section className="projects-list-panel">
          <div className="projects-card-header">
            <div>
              <h2>{t("projects.listTitle")}</h2>
              <p>{t("projects.listDescription")}</p>
            </div>
            <span className="projects-card-badge">
              {t("projects.count", { count: projects.length })}
            </span>
          </div>

          <div className="projects-list-body">
            {projects.length === 0 ? (
              <div className="empty-state">{t("projects.empty")}</div>
            ) : (
              <div className="projects-list">
                {projects.map((project) => (
                  <article className="project-row-card" key={project.id}>
                    <div className="project-row-main">
                      <div className="project-row-title">
                        <span className="project-index">#{project.sortOrder}</span>
                        <div>
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                        </div>
                      </div>

                      <div className="project-tech-list">
                        {getTechnologyList(project.technologies).map((technology) => (
                          <span className="project-tech-chip" key={technology}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-row-side">
                      <span className={project.published ? "badge badge-live" : "badge badge-draft"}>
                        {project.published ? t("common.published") : t("common.draft")}
                      </span>

                      <div className="project-row-actions">
                        {project.githubUrl && (
                          <a
                            className="btn btn-secondary"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("common.github")}
                          </a>
                        )}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(project.id)}
                          type="button"
                        >
                          {t("common.delete")}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
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
    </div>
  );
}
