import { useEffect, useState } from 'react';
import { fetchBalance } from './walletApi';
import RechargeWallet from './RechargeWallet';

export default function WalletBalance({ userId }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance(userId).then(res => setBalance(res.balance));
  }, [userId]);

  return (
  <div>
    <h3>Wallet Balance: ₹{balance}</h3>;
  <RechargeWallet userId={userId} onRecharge={setBalance}/>
  </div>
  );
}