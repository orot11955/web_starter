import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/navigation/Dropdown/Dropdown';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode, setMode } = useTheme();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="header">
      <div className="header__title">Web Starter</div>
      <div className="header__actions">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
          Theme
        </Button>
        <Dropdown
          trigger={<span>{user?.name ?? 'User'}</span>}
          items={[
            { label: 'Home', onClick: () => navigate('/') },
            { label: 'Logout', onClick: handleLogout, danger: true },
          ]}
        />
      </div>
    </header>
  );
}
