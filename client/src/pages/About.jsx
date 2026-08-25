import { motion } from 'framer-motion';
import { Compass, Target, Users, Heart, Globe, Map } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container-tp py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-4">
              <Compass size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold text-dark mb-4">
              About <span className="text-primary-500">TripPAS</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Making travel planning simple, affordable, and accessible for everyone exploring 
              the beautiful destinations of India and Nepal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-soft p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Target size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-dark mb-3">Our Mission</h2>
              <p className="text-muted leading-relaxed">
                To democratize travel planning by providing accurate budget estimates, personalized 
                recommendations, and a community-driven platform that helps travelers make informed 
                decisions without breaking the bank.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-soft p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Globe size={24} className="text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-dark mb-3">Our Vision</h2>
              <p className="text-muted leading-relaxed">
                To become the most trusted travel companion for budget-conscious travelers in South 
                Asia, fostering a community where every journey is planned with confidence and every 
                experience is shared with joy.
              </p>
            </motion.div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-8 mb-12">
            <h2 className="text-2xl font-display font-bold text-dark mb-6 text-center">
              Why TripPAS?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                  <Map size={28} className="text-primary-600" />
                </div>
                <h3 className="font-semibold text-dark mb-2">27+ Destinations</h3>
                <p className="text-sm text-muted">
                  Curated information for the best destinations across India and Nepal
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  <Users size={28} className="text-amber-600" />
                </div>
                <h3 className="font-semibold text-dark mb-2">Community Driven</h3>
                <p className="text-sm text-muted">
                  Real experiences and reviews from travelers who've been there
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-3">
                  <Heart size={28} className="text-pink-600" />
                </div>
                <h3 className="font-semibold text-dark mb-2">Budget Friendly</h3>
                <p className="text-sm text-muted">
                  Accurate cost estimates to plan trips that fit your budget
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-display font-bold mb-4">Start Your Journey</h2>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Whether you're planning a weekend getaway or an extended adventure, TripPAS is here 
              to help you travel smarter and explore more.
            </p>
            <a
              href="/explore"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <Compass size={20} />
              Explore Destinations
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
