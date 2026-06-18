import { Button } from '@/components/ui/Button/Button';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';

export function ForbiddenPage() {
  return (
    <EmptyState
      title="Access denied"
      description="You do not have permission to view this page."
      action={
        <Button type="button" onClick={() => history.back()}>
          Go back
        </Button>
      }
    />
  );
}
