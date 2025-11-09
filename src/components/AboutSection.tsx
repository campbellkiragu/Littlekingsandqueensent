import { PartyPopper, Shield, Clock, Star } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: PartyPopper,
      title: 'Wide Selection',
      description: 'From bouncing castles to go-carts, we have everything for an unforgettable event.',
    },
    {
      icon: Shield,
      title: 'Safe & Clean',
      description: 'All equipment is sanitized and safety-checked before every rental.',
    },
    {
      icon: Clock,
      title: 'Flexible Booking',
      description: 'Easy booking via WhatsApp with flexible rental periods to suit your needs.',
    },
    {
      icon: Star,
      title: 'Quality Service',
      description: 'Professional setup and support to ensure your event runs smoothly.',
    },
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We bring joy to your special occasions with premium entertainment equipment rentals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Little Kings & Queens Entertainment was founded with a simple mission: to make every child's
            celebration extraordinary. We understand that events are more than just gatherings; they're
            memories in the making.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With years of experience in the entertainment rental industry, we pride ourselves on offering
            top-quality equipment, exceptional service, and competitive pricing. From birthday parties to
            school events and community celebrations, we're here to bring smiles to faces young and old.
          </p>
        </div>
      </div>
    </section>
  );
}
