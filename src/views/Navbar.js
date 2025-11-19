import { Upload, Activity, ArrowLeft, Settings, Download, Maximize2, RotateCcw } from 'lucide-react';

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

export default Navbar;