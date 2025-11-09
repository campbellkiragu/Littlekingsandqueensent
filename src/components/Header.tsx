import { Crown } from 'lucide-react';
import { useRouter } from './Router';

export function Header() {
  const { navigate } = useRouter();

  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Crown className="w-8 h-8" />
            <div className="text-left">
              <h1 className="text-2xl font-bold leading-tight">Little Kings & Queens</h1>
              <p className="text-sm text-amber-100">Entertainment</p>
            </div>
          </button>

          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => navigate('/')}
              className="hover:text-amber-100 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-amber-100 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-amber-100 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
