import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from '@/app/config/constants';
import { getApiErrorMessage } from '@/app/api/handleApiError';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { FormField } from '@/components/ui/form/FormField/FormField';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, devLogin } = useAuth();
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      toast.success('Logged in.');
      const from = (location.state as { from?: Location } | null)?.from?.pathname;
      navigate(from || routePath.home, { replace: true });
    } catch (caught) {
      const message = getApiErrorMessage(caught);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDevLogin() {
    if (!devLogin) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      await devLogin();
      toast.success('Logged in with dev account.');
      const from = (location.state as { from?: Location } | null)?.from?.pathname;
      navigate(from || routePath.home, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <div className="login-card__header">
        <h1>Login</h1>
        <p>Enter your account information.</p>
      </div>
      <FormField label="Username" required>
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />
      </FormField>
      <FormField label="Password" required error={error}>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <Button type="submit" fullWidth loading={loading}>
        Login
      </Button>
      {devLogin && (
        <Button type="button" variant="secondary" fullWidth onClick={handleDevLogin} disabled={loading}>
          Dev Login
        </Button>
      )}
    </form>
  );
}
