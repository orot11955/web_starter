import { useToast } from '@/hooks/useToast';

export function ToastViewport() {
  const { toasts, remove } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast--${toast.type}`}
          onClick={() => remove(toast.id)}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
