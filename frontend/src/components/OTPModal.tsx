import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface OTPModalProps {
  email: string;
  onClose: () => void;
  onVerify: (otp: string) => void;
  error?: string;
  isVerifying?: boolean;
  onResend?: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ email, onClose, onVerify, error, isVerifying, onResend }) => {
  const [otpInput, setOtpInput] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (resendTimer > 0) {
      const id = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      setTimerId(id);
      return () => clearTimeout(id);
    } else if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  }, [resendTimer]);

  const handleResend = async () => {
    if (onResend) {
      await onResend();
      if (timerId) clearTimeout(timerId); // Clear any previous timer
      setResendTimer(30); // Start 30 sec timer
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-[90%] max-w-md relative border border-green-500">
        <button
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
          A 6-digit OTP has been sent to <strong>{email}</strong>
        </p>
        <input
          type="text"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          maxLength={6}
          className="w-full px-4 py-3 border border-green-300 rounded-lg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter OTP"
          disabled={isVerifying}
        />
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <button
          onClick={() => onVerify(otpInput)}
          className={`w-full mt-5 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all ${isVerifying ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Submit'}
        </button>
        <button
          type="button"
          onClick={handleResend}
          className="w-full mt-3 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 py-2 rounded-lg hover:bg-green-200 dark:hover:bg-green-700 transition-all border border-green-300 dark:border-green-600"
          disabled={isVerifying || resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
