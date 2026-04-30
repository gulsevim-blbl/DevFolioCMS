import "../styles/components/confirm-modal.css";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <div className="confirm-modal-panel">
        <div className="confirm-modal-header">
          <h2 id="confirm-modal-title">{title}</h2>
          <button className="confirm-modal-close" type="button" onClick={onCancel} aria-label={cancelText}>
            ×
          </button>
        </div>

        <p className="confirm-modal-message">{message}</p>

        <div className="confirm-modal-actions">
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-danger" type="button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
