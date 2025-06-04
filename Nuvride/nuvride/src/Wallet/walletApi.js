export const fetchBalance = (userId) =>
    fetch(`/api/wallet/${userId}`).then(res => res.json());
  
  export const rechargeWallet = (userId, amount) =>
    fetch(`/api/wallet/${userId}/recharge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    }).then(res => res.json());
  
  export const deductFromWallet = (userId, amount) =>
    fetch(`/api/wallet/${userId}/deduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    }).then(res => res.json());