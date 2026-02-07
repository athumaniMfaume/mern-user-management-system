import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Donate = () => {
  const { auth } = useAuth(); 
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleDonate = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!phone.startsWith('255') || phone.length !== 12) {
      setError("Phone must start with 255 and be 12 digits long.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // NOTE: axios.defaults.baseURL handles the Local/Prod switch
      // Interceptors handle the Bearer token (if auth exists)
      const res = await axios.post('/api/payment/donate', { 
        amount, 
        accountNumber: phone 
      });
      
      if (res.data.success) {
        setSuccess("Initiated! Please enter your PIN on your phone to confirm.");
        setAmount('');
        setPhone('');
      } else {
        setError("Azampay was unable to start the transaction. Try again.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err.response?.data?.message || "Payment failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-600">
        
        <div className="bg-indigo-600 p-5">
          <h2 className="text-xl font-bold text-white text-center uppercase tracking-widest">
            Support Our Project
          </h2>
          <p className="text-[10px] text-indigo-100 text-center uppercase mt-1 tracking-widest">
            Secure Donation via AzamPay
          </p>
        </div>

        <form onSubmit={handleDonate} className="p-8 space-y-5">
          
          {success && (
            <div className="p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-[11px] font-bold rounded shadow-sm">
              <span className="block mb-1">✅ SUCCESS</span>
              {success}
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold rounded shadow-sm">
              <span className="block mb-1">❌ ERROR</span>
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Amount (TZS)
            </label>
            <input 
              type="number"
              className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition-all"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="100"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Phone Number (M-Pesa / TigoPesa / Airtel)
            </label>
            <input 
              type="text"
              className="w-full p-3 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition-all"
              placeholder="2557XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <div className="flex justify-between mt-1">
               <p className="text-[9px] text-gray-400 italic">Format: 255765112233</p>
               <p className="text-[9px] text-indigo-500 font-bold uppercase tracking-tight">TZ Network Only</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full flex justify-center items-center text-white font-bold py-4 rounded uppercase text-xs tracking-widest shadow-lg transition-all ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Donate Now'}
          </button>
          
          <div className="pt-4 border-t border-gray-100">
            <p className="text-center text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-3">
              Supported Networks
            </p>
            <div className="flex justify-center items-center space-x-6 opacity-40 grayscale hover:opacity-80 transition-opacity">
              <span className="font-black text-xs">M-PESA</span>
              <span className="font-black text-xs text-red-600">AIRTEL</span>
              <span className="font-black text-xs text-blue-600">TIGO</span>
              <span className="font-black text-xs text-orange-500">HALOPESA</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donate;
