import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/overlay/Modal/Modal';
import { useConfirm } from '@/hooks/useConfirm';

export function ConfirmDialog() {
  const { state, resolve } = useConfirm();

  if (!state) {
    return null;
  }

  return (
    <Modal
      open={state.open}
      title={state.title}
      onClose={() => resolve(false)}
      footer={
        <>
          <Button type="button" variant="secondary" onClick={() => resolve(false)}>
            {state.cancelText ?? 'Cancel'}
          </Button>
          <Button
            type="button"
            variant={state.danger ? 'danger' : 'primary'}
            onClick={() => resolve(true)}
          >
            {state.confirmText ?? 'Confirm'}
          </Button>
        </>
      }
    >
      {state.message && <p>{state.message}</p>}
    </Modal>
  );
}
