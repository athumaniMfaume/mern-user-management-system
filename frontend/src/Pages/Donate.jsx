import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('halopesa'); // HALOPESA / MPESA
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isMock, setIsMock] = useState(false);

  // Check if HALOPESA mock mode is active
  useEffect(() => {
    const checkMockMode = async () => {
      try {
        const res = await axios.get('/api/payment/check-mock');
        setIsMock(res.data.mock === true);
      } catch {
        setIsMock(false);
      }
    };
    checkMockMode();
  }, []);

  // Helper: convert TZ number to sandbox 2547XXXXXXXX
  const convertToSandboxNumber = (tzNumber) => {
    const last8 = tzNumber.slice(-8); // last 8 digits
    return `2547${last8}`; // safaricom sandbox format
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!phone.startsWith('255') || phone.length !== 12) {
      setError("Phone must start with 255 (e.g., 255627...)");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let endpoint = '';
      let payload = {};

      if (method === 'halopesa') {
        endpoint = '/api/payment/donate/halopesa';
        payload = { amount, phone };
      } else if (method === 'mpesa') {
        endpoint = '/api/payment/donate/mpesa';
        payload = {
          amount,
          phone: convertToSandboxNumber(phone), // convert TZ -> sandbox
        };
      }

      const res = await axios.post(endpoint, payload);

      if (res.data.success) {
        const modeNotice =
          method === 'halopesa' && isMock
            ? " (Simulation Mode: No real money charged)"
            : "";

        setSuccess(
          `Initiated via ${method.toUpperCase()}! Enter PIN on your phone.${modeNotice}`
        );
        setAmount('');
        setPhone('');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md border-t-4 border-indigo-600">
        <div className="bg-indigo-600 p-5 text-center">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">
            Support Us
          </h2>
          <p className="text-[10px] text-indigo-100 uppercase mt-1">
            Secure Mobile Donation
          </p>
          {isMock && (
            <p className="text-[9px] text-yellow-100 mt-1">
              ⚠️ HALOPESA Simulation Mode Active
            </p>
          )}
        </div>

        <form onSubmit={handleDonate} className="p-8 space-y-5">
          {success && (
            <div className="p-3 bg-green-50 text-green-700 text-[11px] font-bold border-l-4 border-green-500">
              {success}
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-[11px] font-bold border-l-4 border-red-500">
              {error}
            </div>
          )}

          {/* Method Selector */}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setMethod('halopesa')}
              className={`flex-1 py-2 text-[10px] font-bold rounded border ${
                method === 'halopesa'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-50'
              }`}
            >
              HALOPESA
            </button>
            <button
              type="button"
              onClick={() => setMethod('mpesa')}
              className={`flex-1 py-2 text-[10px] font-bold rounded border ${
                method === 'mpesa'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-50'
              }`}
            >
              MPESA
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
              Amount (TZS)
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded text-sm bg-gray-50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
              Phone (255...)
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded text-sm bg-gray-50"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="255XXXXXXXXX"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded text-xs tracking-widest hover:bg-indigo-700"
          >
            {loading ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
