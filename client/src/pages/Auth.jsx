import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  Compass,
  ArrowLeft,
  Check,
  AlertCircle,
  MapPin,
  Star,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

/* =========================================================
   AUTH PAGE — Login & Register
   ========================================================= */

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated } = useAuth();

  // ---- form state ----
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // field-level errors
  const [globalError, setGlobalError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // ---- redirect if already authenticated ----
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  // ---- helpers ----
  const updateField = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // clear field-level error for this field
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setGlobalError('');
      setSuccess('');
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setGlobalError('');
    setSuccess('');
    setShowPassword(false);
  }, []);

  // ---- validation ----
  const validate = () => {
    const errs = {};

    if (mode === 'signup' && !formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // password
    if (!formData.password) {
      errs.password = 'Please enter a password.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    // confirm password (signup only)
    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        errs.confirmPassword = 'Please confirm your password.';
      } else if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = 'Passwords do not match.';
      }
    }

    return errs;
  };

  // ---- password strength ----
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
  ];
  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Fair',
    'Strong',
    'Very Strong',
  ];

  // ---- submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setSuccess('');

    // validate
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(
          formData.email.trim(),
          formData.password
        );
        setSuccess('Login successful! Redirecting...');
        // small delay so user sees the success state
        await new Promise((r) => setTimeout(r, 600));
        const from = location.state?.from || '/dashboard';
        navigate(from, { replace: true });
      } else {
        const result = await signup(
          formData.name.trim(),
          formData.email.trim(),
          formData.password
        );
        setSuccess('Account created! Redirecting...');
        await new Promise((r) => setTimeout(r, 600));
        const from = location.state?.from || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Use the user-friendly message from the API layer
      const msg =
        err?.message || 'Something went wrong. Please try again.';
      // Map known server messages to field or global
      if (
        msg.toLowerCase().includes('email') &&
        msg.toLowerCase().includes('already')
      ) {
        setErrors({ email: 'An account with this email already exists.' });
      } else if (
        msg.toLowerCase().includes('invalid email or password')
      ) {
        setGlobalError('Invalid email or password. Please try again.');
      } else if (msg.toLowerCase().includes('network')) {
        setGlobalError(
          'Unable to connect to the server. Please check your connection.'
        );
      } else {
        setGlobalError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ---- mode switch ----
  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    resetForm();
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="min-h-screen flex bg-surface pt-20">
      {/* -------------------------------------------------- */}
      {/* LEFT PANEL — Brand                                  */}
      {/* -------------------------------------------------- */}
      <div className="hidden lg:flex lg:w-[55%] lg:min-h-[calc(100vh-5rem)] relative overflow-hidden bg-gradient-to-br from-dark via-slate-900 to-primary-900 lg:-mt-20 lg:pt-20">
        {/* decorative glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-24 w-[500px] h-[500px] bg-primary-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* floating destination images */}
        <DestinationFloat
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80"
          alt="Manali"
          className="top-24 left-6 w-48 h-32"
          duration={5}
          delay={0}
        />
        <DestinationFloat
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80"
          alt="Goa"
          className="top-32 right-10 w-52 h-36"
          duration={6}
          delay={0.8}
        />
        <DestinationFloat
          src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&q=80"
          alt="Kashmir"
          className="bottom-40 left-14 w-56 h-32"
          duration={4.5}
          delay={1.6}
        />
        <DestinationFloat
          src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&q=80"
          alt="Pokhara"
          className="bottom-24 right-6 w-44 h-44"
          duration={5.5}
          delay={0.4}
        />

        {/* brand content */}
        <div className="relative z-10 flex flex-col justify-center px-14 xl:px-20 text-white w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* logo */}
            <Link to="/" className="flex items-center gap-3 mb-14">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                <Compass size={24} className="text-white" />
              </div>
              <span className="font-display font-bold text-3xl tracking-tight">
                Trip<span className="text-primary-200">PAS</span>
              </span>
            </Link>

            {/* headline */}
            <h1 className="text-4xl xl:text-5xl font-display font-bold text-white leading-[1.15] mb-5">
              Your next adventure
              <br />
              <span className="text-primary-200">starts here</span>
            </h1>

            <p className="text-lg text-white/75 mb-10 max-w-md leading-relaxed">
              Plan smarter trips, track budgets, and discover amazing
              destinations across India and Nepal.
            </p>

            {/* feature bullets */}
            <div className="space-y-5">
              {[
                { icon: MapPin, text: '27+ curated destinations' },
                { icon: Star, text: 'Real traveler experiences' },
                { icon: Sparkles, text: 'Smart budget planning' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12, ease: 'easeOut' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ring-1 ring-white/10">
                    <item.icon size={18} />
                  </div>
                  <span className="text-white/85 text-[15px]">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* RIGHT PANEL — Form                                  */}
      {/* -------------------------------------------------- */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-4 sm:p-8 lg:p-10 bg-surface min-h-full">
        <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-200/80 shadow-elevated p-6 sm:p-8 lg:p-9">
          {/* mobile logo */}
          <motion.div
            className="lg:hidden text-center mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                <Compass size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-2xl text-gray-900">
                Trip<span className="text-primary-500">PAS</span>
              </span>
            </Link>
          </motion.div>

          {/* back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>
          </motion.div>

          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-1.5">
                  {mode === 'login'
                    ? 'Welcome back'
                    : 'Create your account'}
                </h1>
                <p className="text-gray-500 text-[15px]">
                  {mode === 'login'
                    ? 'Sign in to access your trips and saved destinations.'
                    : 'Join thousands of smart travelers planning better trips.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* mode toggle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex bg-gray-100/80 rounded-xl p-1 mb-7 ring-1 ring-gray-200/70"
          >
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative select-none"
                aria-selected={mode === m}
                role="tab"
              >
                {mode === m && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md ring-1 ring-gray-900/5"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    mode === m
                      ? 'text-primary-600 font-bold'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            ))}
          </motion.div>

          {/* global messages */}
          <AnimatePresence>
            {globalError && (
              <MessageBanner
                type="error"
                icon={<AlertCircle size={16} />}
                text={globalError}
                onDismiss={() => setGlobalError('')}
              />
            )}
            {success && (
              <MessageBanner
                type="success"
                icon={<Check size={16} />}
                text={success}
              />
            )}
          </AnimatePresence>

          {/* ---- FORM ---- */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-0"
          >
            {/* name (signup only) */}
            <AnimatedField show={mode === 'signup'}>
              <FormField
                label="Full Name"
                htmlFor="auth-name"
                error={errors.name}
              >
                <div className="relative">
                  <FieldIcon>
                    <User size={16} />
                  </FieldIcon>
                  <input
                    id="auth-name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Aman Tirkey"
                    className={`input-field pl-11 pr-10 py-3.5 rounded-xl bg-gray-50/70 hover:border-gray-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 ${
                      errors.name ? 'input-error' : ''
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'auth-name-error' : undefined}
                  />
                  {formData.name.trim() && !errors.name && (
                    <FieldCheck />
                  )}
                </div>
                {errors.name && (
                  <FieldError id="auth-name-error" text={errors.name} />
                )}
              </FormField>
            </AnimatedField>

            {/* email */}
            <div className="pt-4">
              <FormField
                label="Email Address"
                htmlFor="auth-email"
                error={errors.email}
              >
                <div className="relative">
                  <FieldIcon>
                    <Mail size={16} />
                  </FieldIcon>
                  <input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      updateField('email', e.target.value)
                    }
                    placeholder="you@example.com"
                    className={`input-field pl-11 pr-10 py-3.5 rounded-xl bg-gray-50/70 hover:border-gray-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 ${
                      errors.email ? 'input-error' : ''
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? 'auth-email-error' : undefined
                    }
                  />
                  {formData.email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                      formData.email
                    ) && <FieldCheck />}
                </div>
                {errors.email && (
                  <FieldError
                    id="auth-email-error"
                    text={errors.email}
                  />
                )}
              </FormField>
            </div>

            {/* password */}
            <div className="pt-4">
              <FormField
                label="Password"
                htmlFor="auth-password"
                error={errors.password}
              >
                <div className="relative">
                  <FieldIcon>
                    <Lock size={16} />
                  </FieldIcon>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={
                      mode === 'login'
                        ? 'current-password'
                        : 'new-password'
                    }
                    value={formData.password}
                    onChange={(e) =>
                      updateField('password', e.target.value)
                    }
                    placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                    className={`input-field pl-11 pr-11 py-3.5 rounded-xl bg-gray-50/70 hover:border-gray-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 ${
                      errors.password ? 'input-error' : ''
                    }`}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password
                        ? 'auth-password-error'
                        : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((v) => !v)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <FieldError
                    id="auth-password-error"
                    text={errors.password}
                  />
                )}

                {/* strength indicator (signup only) */}
                {mode === 'signup' && formData.password.length > 0 && (
                  <PasswordStrength
                    strength={strength}
                    colors={strengthColors}
                    labels={strengthLabels}
                  />
                )}
              </FormField>
            </div>

            {/* confirm password (signup only) */}
            <AnimatedField show={mode === 'signup'}>
              <FormField
                label="Confirm Password"
                htmlFor="auth-confirm"
                error={errors.confirmPassword}
              >
                <div className="relative">
                  <FieldIcon>
                    <Lock size={16} />
                  </FieldIcon>
                  <input
                    id="auth-confirm"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateField(
                        'confirmPassword',
                        e.target.value
                      )
                    }
                    placeholder="Re-enter your password"
                    className={`input-field pl-11 pr-10 py-3.5 rounded-xl bg-gray-50/70 hover:border-gray-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10 ${
                      errors.confirmPassword
                        ? 'input-error'
                        : ''
                    }`}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? 'auth-confirm-error'
                        : undefined
                    }
                  />
                  {formData.confirmPassword &&
                    formData.password ===
                      formData.confirmPassword && (
                      <FieldCheck />
                    )}
                </div>
                {errors.confirmPassword && (
                  <FieldError
                    id="auth-confirm-error"
                    text={errors.confirmPassword}
                  />
                )}
              </FormField>
            </AnimatedField>

            {/* remember me / forgot (login only) */}
            {mode === 'login' && (
              <div className="flex items-center justify-between pt-2 pb-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 transition"
                  />
                  <span className="text-sm text-gray-500">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* submit */}
            <div className="pt-5">
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full h-13 py-3.5 rounded-xl font-bold text-white
                  bg-gradient-to-r from-primary-500 to-primary-600
                  hover:from-primary-600 hover:to-primary-700
                  active:from-primary-700 active:to-primary-800
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg shadow-primary-500/30
                  transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                whileHover={loading ? {} : { scale: 1.01 }}
                whileTap={loading ? {} : { scale: 0.99 }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      {mode === 'login'
                        ? 'Signing in…'
                        : 'Creating account…'}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {mode === 'login'
                        ? 'Sign In'
                        : 'Create Account'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>

          {/* divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* google */}
          <button
            type="button"
            onClick={() => {
              setGlobalError(
                'Google Sign-In is not yet connected. Use email & password to sign in.'
              );
            }}
            disabled={loading}
            className="w-full h-13 py-3.5 flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* terms */}
          <p className="text-center text-[11px] text-gray-400 mt-5 leading-relaxed">
            By continuing, you agree to TripPAS's{' '}
            <Link
              to="/terms"
              className="text-primary-500 hover:underline font-medium"
            >
              Terms
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className="text-primary-500 hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {/* mobile feature chips */}
          <div className="lg:hidden mt-8 grid grid-cols-3 gap-3">
            {[
              { emoji: '🎯', text: 'Budget' },
              { emoji: '🌍', text: '27+ Places' },
              { emoji: '✨', text: 'Smart' },
            ].map((f) => (
              <div
                key={f.text}
                className="text-center py-4 bg-gradient-to-b from-primary-50 to-white rounded-2xl border border-primary-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-xl mb-1">{f.emoji}</div>
                <p className="text-[12px] text-primary-600 font-bold">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SUB-COMPONENTS
   ========================================================= */

/** Floating destination image on the left brand panel */
function DestinationFloat({
  src,
  alt,
  className,
  duration = 5,
  delay = 0,
}) {
  return (
    <motion.div
      className={`absolute rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 ${className}`}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

/** Animated field wrapper — expands/collapses for signup-only fields */
function AnimatedField({ show, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Label + input wrapper */
function FormField({ label, htmlFor, error, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-bold text-gray-700 mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/** Icon inside input */
function FieldIcon({ children }) {
  return (
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      {children}
    </span>
  );
}

/** Green checkmark inside input */
function FieldCheck() {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
    >
      <Check size={15} strokeWidth={2.5} />
    </motion.span>
  );
}

/** Field-level error text */
function FieldError({ id, text }) {
  return (
    <motion.p
      id={id}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 pl-0.5"
      role="alert"
    >
      <AlertCircle size={13} />
      {text}
    </motion.p>
  );
}

/** Success or error banner at top of form */
function MessageBanner({ type, icon, text, onDismiss }) {
  const isErr = type === 'error';
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-2.5 p-3.5 rounded-xl text-sm mb-4 ${
        isErr
          ? 'bg-red-50 border border-red-200 text-red-600'
          : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
      }`}
      role="alert"
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{text}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 p-0.5 rounded hover:bg-white/50 transition-colors"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </motion.div>
  );
}

/** Password strength indicator bars */
function PasswordStrength({ strength, colors, labels }) {
  const color =
    strength > 0 ? colors[Math.min(strength - 1, colors.length - 1)] : 'bg-gray-300';
  const label =
    strength > 0 ? labels[Math.min(strength - 1, labels.length - 1)] : '';

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-2"
    >
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= strength ? color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      {label && (
        <p
          className={`text-xs font-medium ${
            strength <= 2
              ? 'text-red-500'
              : strength <= 3
              ? 'text-amber-500'
              : 'text-green-600'
          }`}
        >
          {label}
        </p>
      )}
    </motion.div>
  );
}

/** Google SVG icon */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default Auth;
