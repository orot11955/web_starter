import { EmptyState } from '@/components/ui/EmptyState/EmptyState';

export function ServerErrorPage() {
  return <EmptyState title="Server error" description="Something went wrong on the server." />;
}
