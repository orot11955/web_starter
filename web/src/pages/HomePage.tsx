import { Page } from '@/components/ui/layout/Page/Page';
import { Panel } from '@/components/ui/layout/Panel/Panel';
import { useAuth } from '@/hooks/useAuth';

export function HomePage() {
  const { user } = useAuth();

  return (
    <Page>
      <Panel title="Dashboard">
        <p>Welcome, {user?.name ?? 'user'}.</p>
      </Panel>
    </Page>
  );
}
