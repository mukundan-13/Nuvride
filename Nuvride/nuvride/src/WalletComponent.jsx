import React, { useEffect, useState } from 'react';
import axios from 'axios';

const walletComponent = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const userId = localStorage.getItem('userId');

  const fetchBalance = async () => {
    const res = await axios.get(`http://localhost:8085/api/wallet/${userId}`);
    setBalance(res.data.balance);
  };

  const rechargeWallet = async () => {
    await axios.post(`http://localhost:8085/api/wallet/recharge`, null, {
      params: { userId, amount },
    });
    setAmount('');
    fetchBalance();
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Wallet Balance: ${balance.toFixed(2)}</h2>
      <div className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-grow border p-2 rounded"
          placeholder="Enter amount"
        />
        <button
          onClick={rechargeWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Recharge
        </button>
      </div>
    </div>
  );
};

export default walletComponent;
