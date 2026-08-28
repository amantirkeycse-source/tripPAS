import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Instagram, Facebook, Youtube, Send, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/plan', label: 'Plan Trip' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/about', label: 'About' }
  ];

  const legalLinks = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/community-guidelines', label: 'Community Guidelines' }
  ];

  const socialLinks = [
    { href: 'https://instagram.com/trippas', icon: Instagram, label: 'Instagram' },
    { href: 'https://facebook.com/trippas', icon: Facebook, label: 'Facebook' },
    { href: 'https://youtube.com/@trippas', icon: Youtube, label: 'YouTube' }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="container-tp pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Compass size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-2xl">
                Trip<span className="text-primary-400">PAS</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm max-w-sm mb-6 leading-relaxed">
              Smart budget planning for travelers exploring India and Nepal.
              Know what your trip really costs before you go.
            </p>

            {/* Newsletter */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 max-w-md">
              <h4 className="font-bold text-white mb-1 text-sm">Stay Updated</h4>
              <p className="text-white/40 text-xs mb-3">
                Travel tips and destination guides, no spam.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-primary-400 text-sm flex items-center gap-2 font-semibold"
                >
                  <Heart size={14} className="fill-primary-400" />
                  Thanks for subscribing!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-primary-500/25 hover:shadow-primary-500/30"
                    aria-label="Subscribe"
                  >
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-5 text-white text-xs uppercase tracking-[0.15em]">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-bold mb-5 text-white text-xs uppercase tracking-[0.15em]">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-bold mb-4 text-white text-xs uppercase tracking-[0.15em]">Follow Us</h4>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-xl bg-white/5 hover:bg-primary-500/20 hover:text-primary-400 text-white/50 transition-all duration-200 hover:scale-105"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-sm">
              &copy; {new Date().getFullYear()} TripPAS. All rights reserved.
            </p>
            <p className="text-white/25 text-xs flex items-center gap-1.5">
              Built with <Heart size={12} className="text-red-400 fill-red-400" /> for travelers in India & Nepal
            </p>
          </div>
          <p className="text-white/15 text-xs text-center mt-3">
            Budget estimates are approximate. Always verify current prices before booking.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
