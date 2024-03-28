import React, { useState } from 'react';

const StepThree: React.FC = () => {
    const [currentNAV, setCurrentNAV] = useState<number>(0);
    const [expectedROE, setExpectedROE] = useState<number>(0);
    const [futureNAV, setFutureNAV] = useState<number>(0);

    const calculateFutureNAV = () => {
        const futureROE = expectedROE / 100;
        const futureNAV = currentNAV * Math.pow(1 + futureROE, 10);
        setFutureNAV(futureNAV);
    };

    return (
        <div>
            <h2>Future Value Estimation Tool</h2>
            <h3>Future Net Asset Value Per Share Calculator</h3>
            <div>
                <label>Current Net Asset Value Per Share:</label>
                <input
                    type="number"
                    value={currentNAV}
                    onChange={(e) => setCurrentNAV(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Expected Return on Equity (ROE) (%):</label>
                <input
                    type="number"
                    value={expectedROE}
                    onChange={(e) => setExpectedROE(parseFloat(e.target.value))}
                />
            </div>
            <button onClick={calculateFutureNAV}>Calculate Future NAV</button>
            <div>
                <label>Future Net Asset Value Per Share in 10 years:</label>
                <span>{futureNAV}</span>
            </div>
            <h3>Scenario Analysis</h3>
            {/* Add scenario analysis component here */}
        </div>
    );
};

export default StepThree;