// src/App.js
import React from 'react';
import FloorPlan from './components/FloorPlan/FloorPlan'; // Ensure this path is correct

function App() {
    return (
        <div className="App">
            <h1>3D Hospital Floor Plan</h1>
            <FloorPlan />
        </div>
    );
}

export default App;