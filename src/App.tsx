import { useState } from 'react';
import Spinners from './Spinners.tsx';

function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
  };

  return (
    <div className="App">
      <header>
        <h1>React Spinners Showcase</h1>
        <p>A demonstration of the different types and features of the Spinners component.</p>
      </header>

      <div className="showcase-grid">
        <div className="spinner-card">
          <h3>Default Circular</h3>
          <Spinners type="Circular" />
          <p><code>{'<Spinners />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Cupertino</h3>
          <Spinners type="Cupertino" color="#d32f2f" />
          <p><code>{'<Spinners type="Cupertino" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Single Circle</h3>
          <Spinners type="SingleCircle" color="#388e3c" />
          <p><code>{'<Spinners type="SingleCircle" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Double Circle</h3>
          <Spinners type="DoubleCircle" color="#1976d2" />
          <p><code>{'<Spinners type="DoubleCircle" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Custom Size (80px)</h3>
          <Spinners size={80} />
          <p><code>{'<Spinners size={80} />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Custom Thickness (8px)</h3>
          <Spinners type="DoubleCircle" thickness={8} color="#f57c00" />
          <p><code>{'<Spinners type="DoubleCircle" thickness={8} />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Slow Animation (4s)</h3>
          <Spinners animationDuration="4s" />
          <p><code>{'<Spinners animationDuration="4s" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Fast Animation (0.5s)</h3>
          <Spinners type="Cupertino" animationDuration="0.5s" color="#7b1fa2" />
          <p><code>{'<Spinners type="Cupertino" animationDuration="0.5s" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Label Below</h3>
          <Spinners label="Loading..." />
          <p><code>{'<Spinners label="Loading..." />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Label on Top</h3>
          <Spinners label="Processing..." labelPosition="top" />
          <p><code>{'<Spinners label="Processing..." labelPosition="top" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Label on Left</h3>
          <Spinners label="Fetching..." labelPosition="left" />
          <p><code>{'<Spinners label="Fetching..." labelPosition="left" />'}</code></p>
        </div>

        <div className="spinner-card">
          <h3>Label on Right</h3>
          <Spinners label="Saving..." labelPosition="right" />
          <p><code>{'<Spinners label="Saving..." labelPosition="right" />'}</code></p>
        </div>
      </div>

      <div className="overlay-demo">
        <h2>Overlay Feature</h2>
        <button onClick={toggleOverlay}>Show Overlay (3s)</button>
        {showOverlay && (
          <Spinners
            overlay
            visible={showOverlay}
            type="DoubleCircle"
            size={120}
            color="white"
            label="Loading... Please wait."
            labelColor="white"
            thickness={6}
          />
        )}
      </div>
    </div>
  );
}

export default App;
