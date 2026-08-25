import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, LogIn, Compass, LogOut, Camera, Trash2, User as UserIcon, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth.jsx';
import { uploadAvatar, removeAvatar } from '../../services/api';
import UserAvatar from '../UserAvatar';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
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

  // ==================================================
  // FILE UPLOAD HANDLER
  // ==================================================
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Validate size
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

      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error('Avatar upload error:', err);
      setUploadError('Unable to update profile photo. Please try again.');
    } finally {
      setUploading(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (mobileFileInputRef.current) mobileFileInputRef.current.value = '';
    }
  };

  // ==================================================
  // REMOVE AVATAR HANDLER
  // ==================================================
  const handleRemoveAvatar = async () => {
    try {
      setUploading(true);
      setUploadError('');

      const data = await removeAvatar();

      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error('Avatar remove error:', err);
      setUploadError(err.message || 'Unable to remove profile photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'glass shadow-card' : 'bg-transparent'}`}>
      <nav className="container-tp flex items-center justify-between h-16 lg:h-20" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center">
            <Compass size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-dark">
            Trip<span className="text-primary-500">PAS</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-500 bg-primary-50' : 'text-text hover:text-primary-500 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/saved" className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Saved trips">
            <Heart size={20} className="text-text" />
          </Link>

          {isAuthenticated ? (
            /* ===== AVATAR DROPDOWN ===== */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-all group"
              >
                <div className="relative">
                  <UserAvatar user={user} size="md" showRing />
                </div>
                <span className="text-sm font-medium text-text max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-5 py-4 bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-gray-100">
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
                              <Loader2 size={18} className="text-white animate-spin" />
                            ) : (
                              <Camera size={18} className="text-white" />
                            )}
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-dark text-sm truncate">{user?.name}</p>
                          <p className="text-xs text-muted truncate">{user?.email}</p>
                        </div>
                      </div>
                      {uploadError && (
                        <p className="text-xs text-red-500 mt-2">{uploadError}</p>
                      )}
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Change Photo */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-text hover:bg-gray-50 transition-colors text-left"
                      >
                        {uploading ? (
                          <Loader2 size={16} className="text-primary-500 animate-spin" />
                        ) : (
                          <Camera size={16} className="text-muted" />
                        )}
                        <span>{uploading ? 'Uploading...' : 'Change Profile Photo'}</span>
                      </button>

                      {/* Remove Photo (only if avatar exists) */}
                      {user?.avatar && (
                        <button
                          onClick={handleRemoveAvatar}
                          disabled={uploading}
                          className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                        >
                          <Trash2 size={16} />
                          <span>Remove Profile Photo</span>
                        </button>
                      )}

                      <div className="my-1 border-t border-gray-100" />

                      {/* Profile */}
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-text hover:bg-gray-50 transition-colors"
                      >
                        <UserIcon size={16} className="text-muted" />
                        <span>Your Profile</span>
                      </Link>

                      {/* Dashboard */}
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-text hover:bg-gray-50 transition-colors"
                      >
                        <Compass size={16} className="text-muted" />
                        <span>Dashboard</span>
                      </Link>

                      <div className="my-1 border-t border-gray-100" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full px-5 py-2.5 flex items-center gap-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text hover:text-primary-500 transition-colors">
              <LogIn size={18} />
              Login
            </Link>
          )}

          <Link to="/plan" className="btn-primary text-sm px-5 py-2.5">
            Analyze My Trip
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-100"
          >
            <div className="container-tp py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-primary-500 bg-primary-50' : 'text-text hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Mobile user section */}
              {isAuthenticated && (
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <UserAvatar user={user} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-dark truncate">{user?.name}</p>
                      <p className="text-xs text-muted truncate">{user?.email}</p>
                    </div>
                  </div>

                  {/* Mobile avatar actions */}
                  <div className="flex gap-2 px-4 pb-2">
                    <button
                      onClick={() => mobileFileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex-1 btn-secondary text-xs py-2"
                    >
                      <Camera size={14} />
                      {uploading ? 'Uploading...' : 'Change Photo'}
                    </button>
                    {user?.avatar && (
                      <button
                        onClick={handleRemoveAvatar}
                        disabled={uploading}
                        className="flex-1 btn-secondary text-xs py-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Remove Photo
                      </button>
                    )}
                  </div>
                  <input
                    ref={mobileFileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <Link to="/saved" onClick={() => setIsOpen(false)} className="flex-1 btn-secondary text-sm">
                  <Heart size={18} />
                  Saved Trips
                </Link>
                {isAuthenticated ? (
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex-1 btn-secondary text-sm">
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1 btn-secondary text-sm">
                    <LogIn size={18} />
                    Login
                  </Link>
                )}
              </div>
              <Link to="/plan" onClick={() => setIsOpen(false)} className="btn-primary w-full mt-3">
                Analyze My Trip
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
