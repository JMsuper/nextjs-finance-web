import React from 'react';

interface StepTwoProps {
    roeData: number[];
}

const StepTwo: React.FC<StepTwoProps> = ({ roeData }) => {
    // Calculate average ROE
    const averageROE = roeData.reduce((sum, roe) => sum + roe, 0) / roeData.length;

    // Forecast ROE for the next 10 years
    const forecastedROE: number[] = [];
    for (let i = 0; i < 10; i++) {
        forecastedROE.push(averageROE);
    }

    return (
        <div>
            <h2>ROE Yield Forecaster - Step Two</h2>
            <h3>Forecasted ROE for the next 10 years:</h3>
            <ul>
                {forecastedROE.map((roe, index) => (
                    <li key={index}>{roe}</li>
                ))}
            </ul>
        </div>
    );
};

export default StepTwo;