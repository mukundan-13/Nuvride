import React, { useEffect, useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  // Load balance from localStorage on mount
  useEffect(() => {
    const storedBalance = localStorage.getItem('walletBalance');
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  const handleAddMoney = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const newBalance = balance + numAmount;
    setBalance(newBalance);
    localStorage.setItem('walletBalance', newBalance.toFixed(2));
    setAmount('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Wallet</h2>

      <div className="mb-4">
        <p className="text-lg font-semibold">Balance:</p>
        <p className="text-2xl text-green-600 font-bold">₹{balance.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Add Money</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter amount"
        />
      </div>

      <button
        onClick={handleAddMoney}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Add to Wallet
      </button>
    </div>
  );
};

export default Wallet;
