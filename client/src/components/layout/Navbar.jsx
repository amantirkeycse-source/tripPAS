import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, LogIn, Compass, LogOut, Camera, Trash2, User as UserIcon, ChevronDown, Loader2, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth.jsx';
import { uploadAvatar, removeAvatar } from '../../services/api';
import UserAvatar from '../UserAvatar';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const mobileFileInputRef = useRef(null);
  const { isAuthenticated, user, setUser, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDarkPage = pathname === '/' || pathname === '/explore' || pathname.startsWith('/destination/');
  const useLightNav = scrolled || !isDarkPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setUploadError('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/plan', label: 'Plan Trip' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/how-it-works', label: 'How It Works' }
  ];

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Image must be 5MB or smaller.');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      const data = await uploadAvatar(base64);
      if (data.user) setUser(data.user);
    } catch (err) {
      setUploadError('Unable to update profile photo. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (mobileFileInputRef.current) mobileFileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setUploading(true);
      setUploadError('');
      const data = await removeAvatar();
      if (data.user) setUser(data.user);
    } catch (err) {
      setUploadError(err.message || 'Unable to remove profile photo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        useLightNav
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-tp flex items-center justify-between h-16 lg:h-[72px]" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            useLightNav
              ? 'bg-primary-500 shadow-lg shadow-primary-500/25'
              : 'bg-primary-500/90 shadow-lg shadow-primary-500/20'
          } group-hover:shadow-glow`}>
            <Compass size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className={`font-display font-bold text-xl transition-colors duration-300 ${
            useLightNav ? 'text-dark' : 'text-white'
          }`}>
            Trip<span className="text-primary-400">PAS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? useLightNav
                      ? 'text-primary-600 bg-primary-50 shadow-sm shadow-primary-500/10'
                      : 'text-white bg-white/15'
                    : useLightNav
                      ? 'text-gray-600 hover:text-dark hover:bg-gray-100'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/saved"
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              useLightNav
                ? 'text-gray-500 hover:text-primary-500 hover:bg-primary-50'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Saved trips"
          >
            <Heart size={18} strokeWidth={2} />
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-xl transition-all duration-200 ${
                  useLightNav
                    ? 'hover:bg-gray-100'
                    : 'hover:bg-white/10'
                }`}
              >
                <UserAvatar user={user} size="sm" showRing />
                <span className={`text-sm font-semibold max-w-[80px] truncate ${
                    useLightNav ? 'text-gray-700' : 'text-white'
                }`}>
                  {user?.name?.split(' ')[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''} ${
                    useLightNav ? 'text-gray-400' : 'text-white/60'
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="px-5 py-4 bg-gradient-to-br from-primary-50/80 to-primary-100/40 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="relative group">
                          <UserAvatar user={user} size="lg" showRing />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            title="Change photo"
                          >
                            {uploading ? (
                              <Loader2 size={16} className="text-white animate-spin" />
                            ) : (
                              <Camera size={16} className="text-white" />
                            )}
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-dark text-sm truncate">{user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                      {uploadError && (
                        <p className="text-xs text-red-500 mt-2">{uploadError}</p>
                      )}
                    </div>

                    <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileUpload} className="hidden" />

                    <div className="py-1.5">
                      <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                        {uploading ? <Loader2 size={16} className="text-primary-500 animate-spin" /> : <Camera size={16} className="text-gray-400" />}
                        <span>{uploading ? 'Uploading...' : 'Change Photo'}</span>
                      </button>

                      {user?.avatar && (
                        <button onClick={handleRemoveAvatar} disabled={uploading} className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                          <Trash2 size={16} />
                          <span>Remove Photo</span>
                        </button>
                      )}

                      <div className="my-1.5 border-t border-gray-100" />

                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <UserIcon size={16} className="text-gray-400" />
                        <span>Your Profile</span>
                      </Link>

                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Compass size={16} className="text-gray-400" />
                        <span>Dashboard</span>
                      </Link>

                      <div className="my-1.5 border-t border-gray-100" />

                      <button onClick={handleLogout} className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/auth"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                useLightNav
                  ? 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <LogIn size={16} />
              Sign In
            </Link>
          )}

          <Link to="/plan" className={`btn-primary ml-1 ${!useLightNav ? 'bg-white/15 hover:bg-white/25 border border-white/20 shadow-none' : ''}`}>
            <Plane size={16} />
            Plan Trip
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2.5 rounded-xl transition-colors ${
            useLightNav
              ? 'text-gray-600 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-elevated overflow-hidden"
          >
            <div className="container-tp py-5 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'text-primary-600 bg-primary-50 shadow-sm shadow-primary-500/10'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <UserAvatar user={user} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-dark truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 px-4 pb-3">
                    <button onClick={() => mobileFileInputRef.current?.click()} disabled={uploading} className="flex-1 btn-secondary text-xs py-2.5">
                      <Camera size={14} />
                      {uploading ? 'Uploading...' : 'Change Photo'}
                    </button>
                    {user?.avatar && (
                      <button onClick={handleRemoveAvatar} disabled={uploading} className="flex-1 btn-secondary text-xs py-2.5 text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 size={14} />
                        Remove
                      </button>
                    )}
                  </div>
                  <input ref={mobileFileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileUpload} className="hidden" />
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <Link to="/saved" onClick={() => setIsOpen(false)} className="flex-1 btn-secondary text-sm py-2.5">
                  <Heart size={16} />
                  Saved
                </Link>
                {isAuthenticated ? (
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex-1 btn-secondary text-sm py-2.5 text-red-600 border-red-200">
                    <LogOut size={16} />
                    Logout
                  </button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1 btn-primary text-sm py-2.5">
                    <LogIn size={16} />
                    Sign In
                  </Link>
                )}
              </div>
              <Link to="/plan" onClick={() => setIsOpen(false)} className="btn-primary w-full mt-3 py-3">
                <Plane size={16} />
                Plan My Trip
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
