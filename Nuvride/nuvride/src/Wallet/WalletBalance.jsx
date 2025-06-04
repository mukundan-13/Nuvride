import { useEffect, useState } from 'react';
import { fetchBalance } from './walletApi';

export default function WalletBalance({ userId }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance(userId).then(res => setBalance(res.balance));
  }, [userId]);

  return <h3>Wallet Balance: ₹{balance}</h3>;
}