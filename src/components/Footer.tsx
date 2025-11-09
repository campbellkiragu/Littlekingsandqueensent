import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Little Kings & Queens</h3>
            <p className="text-gray-400 leading-relaxed">
              Making every celebration magical with premium event equipment rentals for kids and families.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+254723153712"
                className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+254 723 153 712</span>
              </a>
              <a
                href={`https://wa.me/254723153712?text=${encodeURIComponent('Hello! I would like to inquire about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Little Kings & Queens Entertainment. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Contact: <a href="tel:+254723153712" className="hover:text-amber-400">+254 723 153 712</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
