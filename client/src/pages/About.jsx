import { motion } from 'framer-motion';
import { Compass, Target, Users, Heart, Globe, Map } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[120px]" />

      <div className="container-tp relative z-10 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/25">
              <Compass size={38} className="text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-dark mb-5 tracking-tight">
              About <span className="text-primary-500">TripPAS</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Making travel planning simple, affordable, and accessible for everyone exploring
              the beautiful destinations of India and Nepal.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 absolute top-0 left-0 right-0 rounded-t-3xl" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
                  <Target size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-dark mb-4">Our Mission</h2>
                <p className="text-muted leading-relaxed text-[15px]">
                  To democratize travel planning by providing accurate budget estimates, personalized
                  recommendations, and a community-driven platform that helps travelers make informed
                  decisions without breaking the bank.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-green-600 absolute top-0 left-0 right-0 rounded-t-3xl" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-5 shadow-lg shadow-green-500/25">
                  <Globe size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-dark mb-4">Our Vision</h2>
                <p className="text-muted leading-relaxed text-[15px]">
                  To become the most trusted travel companion for budget-conscious travelers in South
                  Asia, fostering a community where every journey is planned with confidence and every
                  experience is shared with joy.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Why TripPAS */}
          <div className="card p-8 md:p-12 mb-20 relative overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-600 absolute top-0 left-0 right-0" />
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px]" />
            <h2 className="text-3xl font-display font-bold text-dark mb-12 text-center relative z-10">
              Why TripPAS?
            </h2>
            <div className="grid md:grid-cols-3 gap-10 relative z-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary-500/25">
                  <Map size={30} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-dark text-lg mb-2">27+ Destinations</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Curated information for the best destinations across India and Nepal
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-amber-500/25">
                  <Users size={30} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-dark text-lg mb-2">Community Driven</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Real experiences and reviews from travelers who've been there
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-pink-500/25">
                  <Heart size={30} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-dark text-lg mb-2">Budget Friendly</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Accurate cost estimates to plan trips that fit your budget
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-[100px]" />
            <div className="relative z-10 py-16 px-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Start Your Journey
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
                Whether you're planning a weekend getaway or an extended adventure, TripPAS is here
                to help you travel smarter and explore more.
              </p>
              <a
                href="/explore"
                className="inline-flex items-center gap-2.5 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                <Compass size={22} />
                Explore Destinations
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;