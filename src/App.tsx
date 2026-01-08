import React from 'react';
import logo from './assets/merath_logo_transparent.png';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      width: '100%', 
      maxWidth: '1210px', 
      margin: '0 auto',
      flexDirection: 'column', 
      alignItems: 'center',
      background: '#F9F3E0',
      minHeight: '100vh'
    }}>
      {/* Nav Bar */}
      <nav style={{ 
        display: 'flex', 
        height: '221px', 
        padding: '0 59px', 
        alignItems: 'center',
        alignSelf: 'stretch',
        background: '#F9F3E0'
      }}>
        <div style={{ display: 'flex', width: '20px', alignItems: 'flex-end', gap: '10px' }}>
          <div style={{ width: '4px', height: '50px', background: '#3215CC' }}></div>
          <div style={{ width: '4px', height: '50px', background: '#3215CC' }}></div>
          <div style={{ width: '4px', height: '50px', background: '#3215CC' }}></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        display: 'flex',
        padding: '68px 0', 
        background: '#F9F3E0',
        width: '100%',
        justifyContent: 'center'
      }}>
        <div style={{ width: '1200px', minHeight: '513px', position: 'relative' }}>
          <img 
            src={logo} 
            alt="Merath Logo" 
            style={{ 
              width: '282px', 
              height: '315px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '0'
            }} 
          />
          
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '347px',
            width: '487px',
            color: 'rgba(12, 12, 13, 1)',
            textAlign: 'center',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '120%'
          }}>
            merath operates between research and production.
          </div>
          
          <div style={{
            width: '748px',
            color: '#000',
            textAlign: 'center',
            fontFamily: "'IBM Plex Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: '20px',
            fontWeight: '400',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '403px'
          }}>
            It engages archives, exhibitions, and collective study as methods for approaching how art can document, translate, and transform lived experience.
          </div>
          
          <div style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: "'IBM Plex Sans', -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: '20px',
            fontWeight: '400',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '487px',
            width: '660px'
          }}>
            The collective's work extends across Libya and its neighbouring countries.
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section style={{ 
        display: 'flex', 
        padding: '64px',
        flexDirection: 'column',
        alignSelf: 'stretch',
        background: '#F9F3E0'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '64px',
          flexWrap: 'wrap'
        }}>
          {/* Card 1 */}
          <div style={{ display: 'flex', minWidth: '240px', gap: '24px', flex: '1 0 0', maxWidth: '350px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 21.3334V16.0001M16 10.6667H16.0133M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63616 29.3334 2.66663 23.3639 2.66663 16.0001C2.66663 8.63628 8.63616 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ flex: '1' }}>
              <h3 style={{ 
                color: 'rgba(30, 30, 30, 1)',
                fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '120%',
                marginBottom: '8px'
              }}>
                Projects
              </h3>
              <p style={{ 
                color: 'rgba(117, 117, 117, 1)',
                fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '140%'
              }}>
                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ display: 'flex', minWidth: '240px', gap: '24px', flex: '1 0 0', maxWidth: '350px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 21.3334V16.0001M16 10.6667H16.0133M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63616 29.3334 2.66663 23.3639 2.66663 16.0001C2.66663 8.63628 8.63616 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ flex: '1' }}>
              <h3 style={{ 
                color: 'rgba(30, 30, 30, 1)',
                fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '120%',
                marginBottom: '8px'
              }}>
                Archives/Exhibitions
              </h3>
              <p style={{ 
                color: 'rgba(117, 117, 117, 1)',
                fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '140%'
              }}>
                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ display: 'flex', minWidth: '240px', gap: '24px', flex: '1 0 0', maxWidth: '350px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 21.3334V16.0001M16 10.6667H16.0133M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63616 29.3334 2.66663 23.3639 2.66663 16.0001C2.66663 8.63628 8.63616 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ flex: '1' }}>
              <h3 style={{ 
                color: 'rgba(30, 30, 30, 1)',
                fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '120%',
                marginBottom: '8px'
              }}>
                About Us
              </h3>
              <p style={{ 
                color: 'rgba(117, 117, 117, 1)',
                fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '140%'
              }}>
                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section style={{ 
        display: 'flex', 
        padding: '64px',
        gap: '48px',
        alignSelf: 'stretch',
        background: '#F9F3E0'
      }}>
        <div style={{ 
          flex: '1',
          minHeight: '300px',
          background: 'rgba(227, 227, 227, 1)'
        }}></div>
        <div style={{ 
          flex: '1',
          minHeight: '300px',
          background: 'rgba(227, 227, 227, 1)'
        }}></div>
      </section>

      {/* Footer */}
      <footer style={{ 
        display: 'flex',
        padding: '32px 32px 160px 32px',
        justifyContent: 'center',
        gap: '16px',
        alignSelf: 'stretch',
        flexWrap: 'wrap',
        borderTop: '1px solid rgba(217, 217, 217, 1)',
        background: '#ECF716'
      }}>
        <div style={{ width: '262px' }}>
          <div style={{ 
            paddingBottom: '16px',
            color: 'rgba(30, 30, 30, 1)',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Use cases
          </div>
        </div>
        <div style={{ width: '262px' }}>
          <div style={{ 
            paddingBottom: '16px',
            color: 'rgba(30, 30, 30, 1)',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Explore
          </div>
        </div>
        <div style={{ width: '262px' }}>
          <div style={{ 
            paddingBottom: '16px',
            color: 'rgba(30, 30, 30, 1)',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Resources
          </div>
        </div>
        <div>
          <img 
            src={logo} 
            alt="Merath Logo" 
            style={{ width: '99px', height: '111px' }} 
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
