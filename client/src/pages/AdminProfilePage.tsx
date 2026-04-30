import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { getProfile, updateProfile, uploadProfileCv, uploadProfileImage } from "../api/profile.api";
import { useI18n } from "../i18n/useI18n";
import type { Profile } from "../types/profile";
import "../styles/pages/profile.css";

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdminProfilePage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setError("");
    } catch {
      setError(t("profile.loadError"));
    }
  }, [t]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadProfile();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadProfile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      let profileWithUpload = profile;

      if (cvFile) {
        profileWithUpload = await uploadProfileCv(cvFile);
      }

      if (imageFile) {
        profileWithUpload = await uploadProfileImage(imageFile);
      }

      const updatedProfile = await updateProfile({
        ...profile,
        cvUrl: profileWithUpload.cvUrl,
        imageUrl: profileWithUpload.imageUrl
      });

      setProfile(updatedProfile);
      setCvFile(null);
      setImageFile(null);
      setSuccess(t("profile.success"));
    } catch {
      setError(t("profile.saveError"));
    } finally {
      setIsLoading(false);
    }
  }

  if (!profile && !error) {
    return (
      <div className="page">
        <div className="empty-state">{t("profile.loading")}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page">
        <p className="alert" role="alert">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="page profile-page">
      <section className="profile-hero">
        <div>
          <p className="eyebrow">{t("profile.eyebrow")}</p>
          <h1>{t("profile.title")}</h1>
          <p>{t("profile.description")}</p>
        </div>
        <span className="profile-status">{t("common.editable")}</span>
      </section>

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="profile-success" role="status">
          {success}
        </p>
      )}

      <form className="profile-layout" onSubmit={handleSubmit}>
        <section className="profile-form-card">
          <div className="profile-card-header">
            <div>
              <h2>{t("profile.infoTitle")}</h2>
              <p>{t("profile.infoDescription")}</p>
            </div>
          </div>

          <div className="profile-form-body">
            <div className="profile-section">
              <span className="profile-section-label">{t("profile.identitySection")}</span>
              <div className="profile-field-grid">
                <div className="field">
                  <label htmlFor="profile-full-name">{t("fields.fullName")}</label>
                  <input
                    id="profile-full-name"
                    className="input"
                    value={profile.fullName}
                    onChange={(event) =>
                      setProfile({ ...profile, fullName: event.target.value })
                    }
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="profile-title">{t("fields.title")}</label>
                  <input
                    id="profile-title"
                    className="input"
                    value={profile.title}
                    onChange={(event) =>
                      setProfile({ ...profile, title: event.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <span className="profile-section-label">{t("profile.bioSection")}</span>
              <div className="field">
                <label htmlFor="profile-short-bio">{t("fields.shortBio")}</label>
                <textarea
                  id="profile-short-bio"
                  className="textarea"
                  value={profile.shortBio}
                  onChange={(event) =>
                    setProfile({ ...profile, shortBio: event.target.value })
                  }
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="profile-about">{t("fields.about")}</label>
                <textarea
                  id="profile-about"
                  className="textarea"
                  value={profile.about}
                  onChange={(event) =>
                    setProfile({ ...profile, about: event.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="profile-section">
              <span className="profile-section-label">{t("profile.contactSection")}</span>
              <div className="profile-field-grid">
                <div className="field">
                  <label htmlFor="profile-email">{t("login.email")}</label>
                  <input
                    id="profile-email"
                    className="input"
                    type="email"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile({ ...profile, email: event.target.value })
                    }
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="profile-phone">{t("fields.phone")}</label>
                  <input
                    id="profile-phone"
                    className="input"
                    value={profile.phone || ""}
                    onChange={(event) =>
                      setProfile({ ...profile, phone: event.target.value })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="profile-location">{t("fields.location")}</label>
                <input
                  id="profile-location"
                  className="input"
                  value={profile.location || ""}
                  onChange={(event) =>
                    setProfile({ ...profile, location: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="profile-section">
              <span className="profile-section-label">{t("profile.linksSection")}</span>
              <div className="profile-field-grid">
                <div className="field">
                  <label htmlFor="profile-github">{t("fields.githubUrl")}</label>
                  <input
                    id="profile-github"
                    className="input"
                    value={profile.githubUrl || ""}
                    onChange={(event) =>
                      setProfile({ ...profile, githubUrl: event.target.value })
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="profile-linkedin">{t("fields.linkedinUrl")}</label>
                  <input
                    id="profile-linkedin"
                    className="input"
                    value={profile.linkedinUrl || ""}
                    onChange={(event) =>
                      setProfile({ ...profile, linkedinUrl: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="profile-side-panel">
          <div className="profile-preview-card">
            {profile.imageUrl ? (
              <img className="profile-avatar" src={profile.imageUrl} alt="" />
            ) : (
              <div className="profile-avatar-placeholder">{getInitials(profile.fullName)}</div>
            )}

            <h2>{profile.fullName}</h2>
            <p>{profile.title}</p>

            <div className="profile-preview-meta">
              {profile.location && <span>{profile.location}</span>}
              {profile.email && <span>{profile.email}</span>}
            </div>
          </div>

          <div className="profile-media-card">
            <div className="profile-card-header compact">
              <div>
                <h2>{t("profile.mediaTitle")}</h2>
                <p>{t("profile.mediaDescription")}</p>
              </div>
            </div>

            <div className="profile-media-body">
              <div className="profile-upload-grid">
                <div className="profile-upload-card">
                  <div className="field">
                    <label htmlFor="profile-image">{t("profile.avatarFile")}</label>
                    <input
                      id="profile-image"
                      className="input"
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                    />
                  </div>
                  {imageFile && <p className="field-help">{t("profile.selectedFile", { name: imageFile.name })}</p>}
                </div>

                <div className="profile-upload-card">
                  <div className="field">
                    <label htmlFor="profile-cv">{t("profile.cvFile")}</label>
                    <input
                      id="profile-cv"
                      className="input"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                    />
                  </div>
                  {cvFile && <p className="field-help">{t("profile.selectedFile", { name: cvFile.name })}</p>}

                  {profile.cvUrl && (
                    <a className="btn btn-secondary btn-full" href={profile.cvUrl} download>
                      {t("profile.downloadCv")}
                    </a>
                  )}
                </div>
              </div>

              <button className="btn btn-primary btn-full" type="submit" disabled={isLoading}>
                {isLoading ? t("common.saving") : t("common.save")}
              </button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
