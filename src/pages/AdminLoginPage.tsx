import { useState } from 'react';
import { Crown } from 'lucide-react';
import { useRouter } from '../components/Router';
import { useToast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const { sendOtp, verifyOtp } = useAuth();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendOtp(email.trim().toLowerCase());
      setOtpSent(true);
      showToast('6-digit code sent to your email', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send code. Please try again.';
      console.error('OTP error:', error);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp(email.trim().toLowerCase(), otp.trim());
      showToast('Login successful', 'success');
      navigate('/admin');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid code. Please try again.';
      console.error('Verify OTP error:', error);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Little Kings & Queens Entertainment</p>
        </div>

        {otpSent ? (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium text-sm">6-digit code sent</p>
              <p className="text-blue-700 text-sm mt-1">
                Check your email at <strong>{email}</strong>
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter 6-Digit Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength="6"
                placeholder="000000"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setEmail('');
                setOtp('');
              }}
              className="w-full text-amber-600 hover:text-amber-700 font-medium"
            >
              Use different email
            </button>
          </form>
        ) : (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending code...' : 'Send 6-Digit Code'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
