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

export default GraphPage;