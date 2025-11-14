import { useState } from 'react';
import { Crown } from 'lucide-react';
import { useRouter } from '../components/Router';
import { useToast } from '../components/Toast';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // HARD-CODED ADMIN CREDENTIALS
      if (email === 'admin' && password === 'admin') {
        showToast('Login successful', 'success');
        navigate('/admin');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      showToast('Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-
