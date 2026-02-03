import { useState, useEffect } from 'react';
import './PasswordGate.css';

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
        <h1>🚧 Under Construction</h1>
        <p>This site is currently under development.</p>
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
      </div>
    </div>
  );
}
