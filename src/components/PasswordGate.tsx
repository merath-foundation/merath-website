import { useState, useEffect } from 'react';
import './PasswordGate.css';
import logo from '../assets/merath_logo_transparent.png';

const SITE_PASSWORD = 'merath2026'; // Change this to your desired password
const STORAGE_KEY = 'merath-site-access';

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="password-gate">
      <div className="password-gate-content">
        <img src={logo} alt="Merath" className="password-gate-logo" />
        <p className="password-gate-tagline">
          merath is a research and design studio working on projects across the Sahara and the Sea
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
          />
          <button type="submit">Enter</button>
        </form>
        {error && <p className="error">Incorrect password</p>}
        <p className="password-gate-note">
          for access please input the password provided by the team or reach out to{' '}
          <a href="mailto:info@merath.ly">info@merath.ly</a>
        </p>
      </div>
    </div>
  );
}
