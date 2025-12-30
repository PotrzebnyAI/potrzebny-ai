import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.900),theme(colors.slate.950))] opacity-20" />

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              POTRZEBNY.AI
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Kompleksowa platforma AI wspierająca edukację, terapię i badania naukowe.
            Stworzona z myślą o uczniach, nauczycielach, terapeutach i badaczach.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/login"
              className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all"
            >
              Zaloguj się
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Zarejestruj się
            </Link>
          </div>
        </div>
      </section>

      {/* Panels Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white mb-16">
            Nasze Panele
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {panels.map((panel) => (
              <div
                key={panel.title}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className={`inline-flex p-3 rounded-xl ${panel.color} mb-4`}>
                  <span className="text-2xl">{panel.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {panel.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {panel.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6">
        <div className="mx-auto max-w-7xl text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2025 POTRZEBNY.AI - Bartłomiej Potrzebowski. Wszelkie prawa zastrzeżone.</p>
          <p className="mt-2 text-sm">NIP: 1133182851 | ai@potrzebny.ai</p>
        </div>
      </footer>
    </main>
  )
}

const panels = [
  {
    title: 'Panel Ucznia',
    description: 'Spersonalizowane nauczanie z AI, quizy, ćwiczenia i śledzenie postępów.',
    icon: '🎓',
    color: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    title: 'Panel Nauczyciela',
    description: 'Zarządzanie klasami, automatyczne ocenianie i analityka uczniów.',
    icon: '👩‍🏫',
    color: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    title: 'Panel Rodzica',
    description: 'Monitorowanie postępów dziecka i komunikacja z nauczycielami.',
    icon: '👨‍👩‍👧',
    color: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    title: 'Panel Terapeuty',
    description: 'Narzędzia do prowadzenia sesji terapeutycznych z wsparciem AI.',
    icon: '🧠',
    color: 'bg-pink-100 dark:bg-pink-900/30',
  },
  {
    title: 'Panel Badawczy',
    description: 'Dostęp do PubMed, Scopus i narzędzi do analizy literatury.',
    icon: '🔬',
    color: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    title: 'Panel Administracyjny',
    description: 'Zarządzanie użytkownikami, subskrypcjami i konfiguracją systemu.',
    icon: '⚙️',
    color: 'bg-slate-100 dark:bg-slate-700/50',
  },
]
