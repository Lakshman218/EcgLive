import React, { useState } from 'react';
import { Upload, Activity, ArrowLeft, Settings, Download, Maximize2, RotateCcw } from 'lucide-react';
import './styles.css';

// Navbar Component
const Navbar = ({ currentPage, onNavigate, selectedFiles }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Activity className="logo-icon" />
          <span className="brand-text">ECG Plotter</span>
        </div>
        
        <div className="navbar-content">
          {currentPage === 'graph' && (
            <div className="graph-tools">
              <button className="tool-btn" title="Expand">
                <Maximize2 size={20} />
              </button>
              <button className="tool-btn" title="Reset">
                <RotateCcw size={20} />
              </button>
              <button className="tool-btn" title="Download">
                <Download size={20} />
              </button>
              <button className="tool-btn" title="Settings">
                <Settings size={20} />
              </button>
              <button 
                className="back-btn"
                onClick={() => onNavigate('home')}
              >
                <ArrowLeft size={20} />
                Back to Home
              </button>
            </div>
          )}
          
          {currentPage === 'home' && (
            <div className="home-nav">
              <span className="nav-info">Ready to analyze ECG data</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Homepage Component
const Homepage = ({ onNavigate, onFilesSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePlot = () => {
    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles);
      onNavigate('graph');
    }
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">ECG Analysis Platform</h1>
            <p className="hero-subtitle">Professional electrocardiogram visualization and analysis</p>
            <p className="hero-description">Upload your ECG data files and visualize heart activity with precision diagnostics</p>
          </div>
          <div className="hero-illustration">
            <svg viewBox="0 0 200 100" className="ecg-wave">
              <path d="M0,50 L10,50 L15,30 L20,70 L25,50 L35,50 L40,45 L45,55 L50,50 L60,50 L65,20 L70,80 L75,50 L85,50 L90,48 L95,52 L100,50 L200,50" 
                    stroke="#00d4ff" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="upload-section">
        <div className="upload-card">
          <h2>Upload ECG Data Files</h2>
          <p className="upload-hint">Select one or multiple files to analyze</p>
          
          <div 
            className={`upload-area ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-icon">
              <Upload size={48} />
            </div>
            <h3>Drag and drop your files here</h3>
            <p>or</p>
            <label className="file-input-label">
              <span className="browse-btn">Browse Files</span>
              <input 
                type="file" 
                multiple
                onChange={handleFileChange}
                accept=".csv,.json,.dat,.txt"
              />
            </label>
            <p className="file-types">Supported: CSV, JSON, DAT, TXT</p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="file-list">
              <h3>Selected Files ({selectedFiles.length})</h3>
              <div className="files-container">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button 
                className="plot-btn"
                onClick={handlePlot}
              >
                <Activity size={20} />
                Plot ECG Data
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose ECG Plotter?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Visualization</h3>
            <p>Interactive D3.js charts for detailed ECG analysis</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Processing</h3>
            <p>Handle large datasets with optimized performance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>All data processing happens locally on your device</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on desktop and tablets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Graph Page Component
const GraphPage = ({ selectedFiles }) => {
  return (
    <div className="graph-page">
      <div className="graph-container">
        <div className="graph-header">
          <h2>ECG Graph Analysis</h2>
          <p className="file-count">{selectedFiles?.length || 0} file(s) loaded</p>
        </div>

        <div className="graph-canvas">
          <div className="placeholder">
            <Activity size={64} className="placeholder-icon" />
            <h3>ECG Graph Visualization</h3>
            <p>D3.js graph will be rendered here</p>
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="file-details">
                <h4>Loaded Files:</h4>
                <ul>
                  {selectedFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="graph-sidebar">
          <div className="sidebar-section">
            <h3>Analysis Tools</h3>
            <div className="tool-option">
              <label>Zoom Level</label>
              <input type="range" min="1" max="10" defaultValue="5" />
            </div>
            <div className="tool-option">
              <label>Display Mode</label>
              <select>
                <option>Standard</option>
                <option>12-Lead</option>
                <option>Rhythm Strip</option>
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Statistics</h3>
            <div className="stat-item">
              <span>Heart Rate (bpm)</span>
              <span className="stat-value">-- </span>
            </div>
            <div className="stat-item">
              <span>PR Interval (ms)</span>
              <span className="stat-value">-- </span>
            </div>
            <div className="stat-item">
              <span>QT Interval (ms)</span>
              <span className="stat-value">-- </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleFilesSelect = (files) => {
    setSelectedFiles(files);
  };

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedFiles={selectedFiles}
      />
      <main className="main-content">
        {currentPage === 'home' && (
          <Homepage 
            onNavigate={handleNavigate}
            onFilesSelect={handleFilesSelect}
          />
        )}
        {currentPage === 'graph' && (
          <GraphPage selectedFiles={selectedFiles} />
        )}
      </main>
    </div>
  );
}