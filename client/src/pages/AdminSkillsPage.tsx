import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createSkill, deleteSkill, getSkills, updateSkill } from "../api/skill.api";
import { ConfirmModal } from "../components/ConfirmModal";
import { useI18n } from "../i18n/useI18n";
import type { Skill } from "../types/skill";
import "../styles/pages/skills.css";

const categories = ["Frontend", "Backend", "Database", "DevOps", "Tools"];

export default function AdminSkillsPage() {
  const { t } = useI18n();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [level, setLevel] = useState(50);
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; message: string } | null>(null);

  const averageLevel = useMemo(() => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / skills.length);
  }, [skills]);

  const usedCategories = useMemo(
    () => new Set(skills.map((skill) => skill.category)).size,
    [skills]
  );

  const loadSkills = useCallback(async () => {
    try {
      const data = await getSkills();
      setSkills(data);
      setError("");
    } catch {
      setError(t("skills.loadError"));
    }
  }, [t]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadSkills();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadSkills]);

  function resetForm() {
    setName("");
    setCategory("Frontend");
    setLevel(50);
    setEditingSkillId(null);
  }

  function handleEdit(skill: Skill) {
    setName(skill.name);
    setCategory(skill.category);
    setLevel(skill.level);
    setEditingSkillId(skill.id);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      name,
      category,
      level
    };

    try {
      if (editingSkillId) {
        await updateSkill(editingSkillId, payload);
      } else {
        await createSkill({
          ...payload,
          sortOrder: skills.length + 1,
          published: true
        });
      }

      resetForm();
      await loadSkills();
    } catch {
      setError(editingSkillId ? t("skills.updateError") : t("skills.addError"));
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(id: number) {
    setDeleteTarget({ id, message: t("skills.deleteConfirm") });
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    setError("");

    try {
      await deleteSkill(deleteTarget.id);
      await loadSkills();
    } catch {
      setError(t("skills.deleteError"));
    } finally {
      setDeleteTarget(null);
    }
  }

  function handleCancelDelete() {
    setDeleteTarget(null);
  }

  return (
    <div className="page skills-page">
      <section className="skills-hero">
        <div>
          <p className="eyebrow">{t("skills.eyebrow")}</p>
          <h1>{t("skills.title")}</h1>
          <p>{t("skills.description")}</p>
        </div>

        <div className="skills-metrics">
          <div>
            <span>{skills.length}</span>
            <p>{t("skills.title")}</p>
          </div>
          <div>
            <span>{usedCategories}</span>
            <p>{t("fields.category")}</p>
          </div>
          <div>
            <span>{averageLevel}</span>
            <p>{t("fields.level")}</p>
          </div>
        </div>
      </section>

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      <div className="skills-layout">
        <form className="skills-form-card" onSubmit={handleSubmit}>
          <div className="skills-card-header">
            <div>
              <h2>{editingSkillId ? t("skills.editTitle") : t("skills.newTitle")}</h2>
              <p>{t("skills.newDescription")}</p>
            </div>
            <span className="skills-card-badge">{t("common.published")}</span>
          </div>

          <div className="skills-form-body">
            <div className="field">
              <label htmlFor="skill-name">{t("fields.skillName")}</label>
              <input
                id="skill-name"
                className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="React"
              />
            </div>

            <div className="field">
              <label htmlFor="skill-category">{t("fields.category")}</label>
              <select
                id="skill-category"
                className="select"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="skill-level-editor">
              <div className="skill-level-label">
                <span>{t("fields.level")}</span>
                <strong>{level}</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={level}
                onChange={(event) => setLevel(Number(event.target.value))}
              />
            </div>

            <button className="btn btn-primary btn-full" type="submit" disabled={isLoading}>
              {isLoading ? t("common.saving") : editingSkillId ? t("common.save") : t("skills.add")}
            </button>

            {editingSkillId && (
              <button className="btn btn-secondary btn-full" type="button" onClick={resetForm}>
                {t("common.cancel")}
              </button>
            )}
          </div>
        </form>

        <section className="skills-list-panel">
          <div className="skills-card-header">
            <div>
              <h2>{t("skills.listTitle")}</h2>
              <p>{t("skills.listDescription")}</p>
            </div>
            <span className="skills-card-badge">
              {t("skills.count", { count: skills.length })}
            </span>
          </div>

          <div className="skills-list-body">
            {skills.length === 0 ? (
              <div className="empty-state">{t("skills.empty")}</div>
            ) : (
              <div className="skills-list">
                {skills.map((skill) => (
                  <article className="skill-row-card" key={skill.id}>
                    <div className="skill-row-main">
                      <div className="skill-row-title">
                        <span className="skill-category-mark">{skill.category.slice(0, 2).toUpperCase()}</span>
                        <div>
                          <h3>{skill.name}</h3>
                          <p>{skill.category}</p>
                        </div>
                      </div>

                      <div className="skill-progress" aria-label={`${skill.name} ${skill.level}`}>
                        <span style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>

                    <div className="skill-row-side">
                      <span className={skill.published ? "badge badge-live" : "badge badge-draft"}>
                        {skill.published ? t("common.published") : t("common.draft")}
                      </span>
                      <strong>{skill.level}</strong>
                      <div className="skill-row-actions">
                        <button className="btn btn-secondary" onClick={() => handleEdit(skill)} type="button">
                          {t("common.edit")}
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(skill.id)} type="button">
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
