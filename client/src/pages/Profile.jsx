import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Save,
  Loader2,
  Check,
  AlertCircle,
  Camera,
  Trash2,
  ArrowLeft,
  Shield,
  Compass,
  Upload
} from 'lucide-react';

import { useAuth } from '../hooks/useAuth.jsx';
import { updateProfile, uploadAvatar, removeAvatar } from '../services/api';
import UserAvatar from '../components/UserAvatar';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const Profile = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);

  // Form state
  const [name, setName] = useState(user?.name || '');

  // Avatar state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // ==================================================
  // FILE UPLOAD HANDLER
  // ==================================================
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Please select a JPG, JPEG, or PNG image.');
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

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error('Avatar upload error:', err);
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
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

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error('Avatar remove error:', err);
      setUploadError(err.message || 'Unable to remove profile photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // ==================================================
  // SAVE NAME
  // ==================================================
  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const data = await updateProfile({ name: name.trim() });

      if (data.user) {
        setUser(data.user);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Could not update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp max-w-2xl mx-auto">

        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50">
              <User size={24} className="text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark">
                Your Profile
              </h1>
              <p className="text-muted">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            SUCCESS MESSAGE
        ================================================== */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-6 border border-green-200 bg-green-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">
                  Profile updated successfully!
                </p>
                <p className="text-sm text-green-600">
                  Your changes have been saved.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================
            ERROR MESSAGE
        ================================================== */}
        {(error || uploadError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 mb-6 border border-red-200 bg-red-50"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-red-500" />
              <p className="text-sm text-red-700">{error || uploadError}</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSave} className="space-y-6">

          {/* ==================================================
              AVATAR SECTION
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-dark mb-4 flex items-center gap-2">
              <Camera size={18} className="text-primary-500" />
              Profile Photo
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Preview */}
              <div className="relative group">
                <UserAvatar user={user} size="xl" />
                {/* Hover overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  {uploading ? (
                    <Loader2 size={24} className="text-white animate-spin" />
                  ) : (
                    <Camera size={24} className="text-white" />
                  )}
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-muted mb-4">
                  Upload a JPG, JPEG, PNG, or WEBP photo. Max size: 5MB.
                </p>

                <div className="flex flex-wrap gap-3">
                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="btn-primary text-sm"
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Upload Photo
                      </>
                    )}
                  </button>

                  {/* Remove Button */}
                  {user?.avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={uploading}
                      className="btn-secondary text-sm text-red-500 hover:bg-red-50 border-red-200 hover:border-red-300"
                    >
                      <Trash2 size={16} />
                      Remove Photo
                    </button>
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

                {!user?.avatar && (
                  <p className="text-xs text-muted mt-3">
                    No photo uploaded yet. Your initials will be displayed as your avatar.
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              PERSONAL INFO
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-dark mb-4 flex items-center gap-2">
              <User size={18} className="text-primary-500" />
              Personal Information
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-dark mb-1.5 block">
                  Full Name
                </label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all bg-white">
                  <User size={18} className="text-muted" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder="Your full name"
                    className="flex-1 outline-none text-dark bg-transparent"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="text-sm font-medium text-dark mb-1.5 block">
                  Email Address
                </label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                  <Mail size={18} className="text-muted" />
                  <span className="text-dark">{user?.email || 'Not available'}</span>
                  <span className="text-xs text-muted ml-auto">Cannot be changed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              ACCOUNT INFO
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <h3 className="font-display font-semibold text-dark mb-4 flex items-center gap-2">
              <Shield size={18} className="text-primary-500" />
              Account Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted">Account Status</span>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Active
                </span>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted">Member Since</span>
                <span className="text-sm font-medium text-dark">
                  {new Date().toLocaleDateString('en-IN', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted">Plan</span>
                <span className="text-sm font-medium text-primary-500 flex items-center gap-1">
                  <Compass size={14} />
                  Free Explorer
                </span>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              SAVE BUTTON
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex gap-4"
          >
            <Link
              to="/dashboard"
              className="btn-secondary flex-1 justify-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 justify-center"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              )}
            </button>
          </motion.div>

        </form>

      </div>
    </div>
  );
};

export default Profile;
