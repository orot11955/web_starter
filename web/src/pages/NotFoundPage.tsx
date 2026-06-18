import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';

export function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      description="The requested address does not exist."
      action={<Link to="/">Go home</Link>}
    />
  );
}
