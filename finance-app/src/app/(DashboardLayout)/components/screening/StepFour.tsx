import React, { useState } from 'react';

const StepFour: React.FC = () => {
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [navps, setNavps] = useState<number>(0);
    const [expectedReturn, setExpectedReturn] = useState<number>(0);
    const [targetReturn, setTargetReturn] = useState<number>(0);

    const calculateExpectedReturn = () => {
        const expectedReturn = (navps - currentPrice) / currentPrice;
        setExpectedReturn(expectedReturn);
    };

    const analyzePointOfBuy = () => {
        if (expectedReturn >= targetReturn) {
            console.log('Point of buy analysis: Buy the stock');
        } else {
            console.log('Point of buy analysis: Do not buy the stock');
        }
    };

    return (
        <div>
            <h2>Expected Return Calculator</h2>
            <label htmlFor="currentPrice">Current Stock Price:</label>
            <input
                type="number"
                id="currentPrice"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
            />

            <label htmlFor="navps">Net Asset Value per Share (NAVPS) in 10 years:</label>
            <input
                type="number"
                id="navps"
                value={navps}
                onChange={(e) => setNavps(Number(e.target.value))}
            />

            <button onClick={calculateExpectedReturn}>Calculate Expected Return</button>

            <h2>Point-of-Buy Analysis</h2>
            <label htmlFor="targetReturn">Target Rate of Return:</label>
            <input
                type="number"
                id="targetReturn"
                value={targetReturn}
                onChange={(e) => setTargetReturn(Number(e.target.value))}
            />

            <button onClick={analyzePointOfBuy}>Analyze Point of Buy</button>
        </div>
    );
};

export default StepFour;