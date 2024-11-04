import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Square Form Component
const SquareForm = ({ onResult }) => {
    const [length, setLength] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSquareArea = async (e) => {
        e.preventDefault();
        if (!length || length <= 0) {
            setError('Please enter a valid length');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios({
                method: 'post',
                url: 'http://34.228.146.13:8080/function/square-area',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    panjang: Number(length)
                }
            });
            onResult(response.data.luas);
            setLength('');
        } catch (error) {
            setError('Failed to calculate square area');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Calculate Square Area</h2>
            <form onSubmit={handleSquareArea}>
                <div className="input-section">
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Enter length"
                        className="input-field"
                        min="1"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className="calc-button"
                >
                    {loading ? 'Calculating...' : 'Calculate'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

// Cube Form Component
const CubeForm = ({ onResult }) => {
    const [length, setLength] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCubeSurfaceArea = async (e) => {
        e.preventDefault();
        if (!length || length <= 0) {
            setError('Please enter a valid length');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios({
                method: 'post',
                url: 'http://98.80.9.184:8080/function/cube-area',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    panjang: Number(length)
                }
            });
            onResult(response.data.luasPermukaan);
            setLength('');
        } catch (error) {
            setError('Failed to calculate cube surface area');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Calculate Cube Surface Area</h2>
            <form onSubmit={handleCubeSurfaceArea}>
                <div className="input-section">
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Enter length"
                        className="input-field"
                        min="1"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className="calc-button"
                >
                    {loading ? 'Calculating...' : 'Calculate'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

// Results Component
const Results = ({ squareArea, cubeArea }) => {
    return (
        <div className="results-container">
            <h2>Results</h2>
            <div className="results-grid">
                {squareArea !== null && (
                    <div className="result-card">
                        <h3>Square Area</h3>
                        <p>{squareArea} square units</p>
                    </div>
                )}
                {cubeArea !== null && (
                    <div className="result-card">
                        <h3>Cube Surface Area</h3>
                        <p>{cubeArea} square units</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App Component
function App() {
    const [squareArea, setSquareArea] = useState(null);
    const [cubeArea, setCubeArea] = useState(null);

    return (
        <div className="container">
            <h1>Area Calculator</h1>
            <h2>Muhammad Akmal Hakim - 2106750383 - Lab 7 Kowan</h2>
            <div className="forms-grid">
                <SquareForm onResult={setSquareArea} />
                <CubeForm onResult={setCubeArea} />
            </div>
            <Results squareArea={squareArea} cubeArea={cubeArea} />
        </div>
    );
}

export default App;