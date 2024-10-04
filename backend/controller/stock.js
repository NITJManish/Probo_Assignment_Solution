


let balance = 1000.0; // Initial balance in USD
let stocksOwned = 0; // Number of stocks owned
let lastPrice = 199; // Last known stock price

// Buy or sell based on the trading strategy
async function trade(price) {
    const priceDrop = (lastPrice - price) / lastPrice * 100; // Percentage drop
    const priceRise = (price - lastPrice) / lastPrice * 100; // Percentage rise

    if (priceDrop >= 2.0 && balance >= price) {
        // Buy stocks
        const numStocks = Math.floor(balance / price);
        stocksOwned += numStocks;
        balance -= numStocks * price;
        console.log(`Bought ${numStocks} stocks at ${price}`);
    } else if (priceRise >= 3.0 && stocksOwned > 0) {
        // Sell stocks
        balance += stocksOwned * price;
        console.log(`Sold ${stocksOwned} stocks at ${price}`);
        stocksOwned = 0;
    }
    lastPrice = price; // Update last known price
}

async function tradeUtils(req,res) {
    const currentPrice = stockPrice; // Get the latest stock price
    trade(currentPrice); // Execute trading logic
    res.json({ message: 'Trade executed', currentPrice });
};

// Get a summary of the current profit/loss and balance
async function getSummary() {
    const totalValue = balance + (stocksOwned * stockPrice);
    return {
        balance,
        stocksOwned,
        totalValue,
        profitLoss: totalValue - 1000, // Profit or loss from initial balance of 1000
    };
}
-
async function summaryUtils(req,res){
    const summary = getSummary(); // Get performance summary
    res.json({message:summary});
}

async function fluctuatePrice(req, res) {
    try {
        let stockPrice=100;
        const change = (Math.random() * 2 - 1).toFixed(2);  // Simulates random price change
        stockPrice = Math.max(90, Math.min(110, stockPrice + parseFloat(change)));
        res.status(200).json({ price: stockPrice });
    } catch (error) {
        return res.status(500).json({
            message: error.message.error || error,
            error: true
        })
    }
}
// Simulate price fluctuation every 2 seconds
setInterval(fluctuatePrice, 2000);

module.exports = { tradeUtils, summaryUtils, fluctuatePrice };