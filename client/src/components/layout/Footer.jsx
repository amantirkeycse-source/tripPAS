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
    { to: '/terms', label: 'Terms & Conditions' },
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
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-dark text-white mt-20">
      <div className="container-tp py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center">
                <Compass size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Trip<span className="text-primary-400">PAS</span>
              </span>
            </Link>
            <p className="text-white/70 mb-4">Fresh, budget-friendly travel.</p>
            <p className="text-white/50 text-sm max-w-md mb-6">
              TripPAS provides estimated travel costs for destinations across India and Nepal. 
              Actual prices may vary depending on season, availability, and booking time.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2 text-sm">📬 Stay Updated</h4>
              <p className="text-white/60 text-xs mb-3">
                Get travel tips and destination guides
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm flex items-center gap-2"
                >
                  <Heart size={16} />
                  Thanks for subscribing!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send size={14} />
                    <span className="hidden sm:inline">Subscribe</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-white text-sm">Follow Us</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-white/10 hover:bg-primary-500 transition-colors"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} TripPAS. All rights reserved.
            </p>
            <p className="text-white/40 text-xs flex items-center gap-1">
              Made with <Heart size={12} className="text-red-400 fill-red-400" /> for travelers in India & Nepal
            </p>
          </div>
          <p className="text-white/30 text-xs text-center mt-4">
            Budget estimates are approximate. Always verify current prices before booking.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
