import { useState } from 'react';
import { rechargeWallet } from './walletApi';

export default function RechargeWallet({ userId, onRecharge }) {
  const [amount, setAmount] = useState(0);

  const handleRecharge = async () => {
    const res = await rechargeWallet(userId, amount);
    onRecharge(res.balance);
    alert(`Recharged! New Balance: ₹${res.balance}`);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleRecharge}>Recharge Wallet</button>
    </div>
  );
}