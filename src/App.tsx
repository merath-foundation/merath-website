

import React from 'react';
import transparentLogo from './assets/merath_logo_transparent.png';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F9F3E0' }}>
      <img
        src={transparentLogo}
        alt="Merath Logo"
        style={{ maxWidth: '320px', width: '80vw', height: 'auto' }}
      />
    </div>
  );
}

export default App;
