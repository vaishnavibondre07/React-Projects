import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch currencies
  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => setCurrencies(Object.keys(data)));
  }, []);

  // Convert currency
  useEffect(() => {
    if (!amount) return;

    setLoading(true);
    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        setConvertedAmount(data.rates[toCurrency]);
        setLoading(false);
      });
  }, [amount, fromCurrency, toCurrency]);

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-[420px] text-gray-800 transition-colors">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Currency Converter</h1>
          <button
            onClick={swapCurrencies}
            className="bg-blue-300 hover:bg-blue-400 text-white px-3 py-1 rounded transition"
            title="Swap Currencies"
          >
            🔄 Swap
          </button>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="text-sm">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 p-2 rounded-lg border border-blue-300 focus:outline-blue-400"
          />
        </div>

        {/* Currency Select */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border border-blue-300 hover:border-blue-400"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border border-blue-300 hover:border-blue-400"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-blue-100 p-4 rounded-lg font-semibold text-blue-800 text-center hover:bg-blue-50 transition">
          {loading ? "Converting..." : `Converted Amount: ${convertedAmount}`}
        </div>

      </div>
    </div>
  );
}

export default App;

