import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Compass, ArrowLeft, Check, AlertCircle, Sparkles, MapPin, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [focusedField, setFocusedField] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      if (!formData.name.trim()) { setError('Please enter your name'); return; }
      if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
      if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    }

    if (!formData.email.includes('@')) { setError('Please enter a valid email'); return; }

    setLoading(true);
    setTimeout(() => {
      if (mode === 'login') {
        login(formData.email, formData.password);
        setSuccess('Login successful! Redirecting...');
      } else {
        signup(formData.name, formData.email, formData.password);
        setSuccess('Account created! Redirecting...');
      }
      setLoading(false);
      setTimeout(() => {
        const from = location.state?.from || '/dashboard';
        navigate(from);
      }, 1000);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('traveler@gmail.com', 'google-auth');
      setSuccess('Welcome! Redirecting...');
      setLoading(false);
      setTimeout(() => navigate('/dashboard'), 1000);
    }, 1500);
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>

        {/* Floating Images */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl"
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=300&q=80" alt="Manali" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 w-40 h-28 rounded-2xl overflow-hidden shadow-2xl"
          animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&q=80" alt="Goa" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 w-36 h-24 rounded-2xl overflow-hidden shadow-2xl"
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <img src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=300&q=80" alt="Kashmir" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-28 h-28 rounded-2xl overflow-hidden shadow-2xl"
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <img src="https://images.unsplash.com/photo-1545486332-9e59a7e4f9bd?w=300&q=80" alt="Pokhara" className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Compass size={24} className="text-white" />
              </div>
              <span className="font-display font-bold text-3xl">
                Trip<span className="text-teal-200">PAS</span>
              </span>
            </Link>

            <h1 className="text-5xl font-display font-bold mb-6 leading-tight">
              Your next adventure<br />
              <span className="text-teal-200">starts here</span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-md">
              Plan smarter trips, track budgets, and discover amazing destinations across India and Nepal.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: '27+ curated destinations' },
                { icon: Star, text: 'Real traveler experiences' },
                { icon: Sparkles, text: 'Smart budget planning' }
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon size={20} />
                  </div>
                  <span className="text-white/90">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            className="lg:hidden text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Compass size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-2xl text-gray-900">
                Trip<span className="text-teal-500">PAS</span>
              </span>
            </Link>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h1>
                <p className="text-gray-500">
                  {mode === 'login'
                    ? 'Sign in to access your trips and saved destinations.'
                    : 'Join thousands of smart travelers planning better trips.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex bg-gray-100 rounded-xl p-1 mb-6"
          >
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all relative"
              >
                {mode === m && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${mode === m ? 'text-teal-600' : 'text-gray-500 hover:text-gray-900'}`}>
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 mb-4"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-600 mb-4"
              >
                <Check size={18} />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Aman Tirkey"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                    {formData.name && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Check size={16} className="text-green-500" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
                {formData.email && formData.email.includes('@') && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Check size={16} className="text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {mode === 'signup' && formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength - 1] : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength <= 2 ? 'text-red-500' : strength <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {strengthLabels[strength - 1] || 'Very Weak'}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      onFocus={() => setFocusedField('confirm')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Check size={16} className="text-green-500" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500" />
                  <span className="text-sm text-gray-500">Remember me</span>
                </label>
                <button type="button" className="text-sm font-semibold text-teal-500 hover:text-teal-600 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all disabled:opacity-50 shadow-lg shadow-teal-500/25"
              whileHover={{ scale: 1.01, boxShadow: '0 10px 40px -10px rgba(13, 148, 136, 0.5)' }}
              whileTap={{ scale: 0.99 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 size={18} className="animate-spin" />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-gray-900 hover:bg-gray-50 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By continuing, you agree to TripPAS's{' '}
            <Link to="/terms" className="text-teal-500 hover:underline font-medium">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-teal-500 hover:underline font-medium">Privacy Policy</Link>.
          </p>

          {/* Bottom Features - Mobile */}
          <div className="lg:hidden mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: '🎯', text: 'Budget' },
              { icon: '🌍', text: '27+ Places' },
              { icon: '✨', text: 'Smart' }
            ].map((f) => (
              <div key={f.text} className="text-center py-3 bg-gray-50 rounded-xl">
                <div className="text-xl mb-1">{f.icon}</div>
                <p className="text-xs text-gray-500 font-medium">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
