import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const LegalPageLayout = ({
  icon: Icon,
  title,
  description,
  lastUpdated = 'August 2026',
  sections = [],
  children,
}) => {
  return (
    <div className="min-h-screen bg-surface">

      {/* Hero */}
      <section className="pt-28 pb-10">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Icon size={27} className="text-white" />
              </div>

              <div>
                <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-1">
                  TripPAS
                </p>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-dark tracking-tight">
                  {title}
                </h1>

                <p className="text-muted mt-2">
                  {description}
                </p>

                <p className="text-muted/70 text-sm mt-2">
                  Last updated: {lastUpdated}
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-tp">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[230px_1fr] gap-8">

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-soft p-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                  On this page
                </p>

                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted transition-all duration-200 hover:bg-primary-50 hover:text-primary-500"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[11px] opacity-60">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span>{section.title}</span>
                      </span>

                      <ChevronRight
                        size={14}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  ))}
                </nav>

              </div>
            </aside>

            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden"
            >
              <div className="p-7 md:p-10">
                {children}
              </div>
            </motion.article>

          </div>
        </div>
      </section>

    </div>
  );
};

export default LegalPageLayout;