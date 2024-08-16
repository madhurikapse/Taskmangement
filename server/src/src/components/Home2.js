import React, { useState, useEffect } from 'react';
import './Home2.css'; // Import your CSS file

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.animate-section');
      if (section.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <header className="hero">
        <h1>Vigit again on Website</h1>
      </header>
      <main>
        <section className={`animate-section ${isVisible ? 'visible' : 'hidden'}`}>
          <h2>Section 1</h2>
          <p>This is the first section of the homepage.</p>
        </section>
        <section className={`animate-section ${isVisible ? 'visible' : 'hidden'}`}>
          <h2>Section 2</h2>
          <p>This is the second section of the homepage.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
