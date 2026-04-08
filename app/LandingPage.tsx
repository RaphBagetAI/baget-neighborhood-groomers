import { PetLeadForm } from '../components/PetLeadForm';

export function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Book Trusted Mobile Groomers Near You</h1>
        <p className="text-lg mb-6">
          Quick, transparent, neighborhood-based mobile pet grooming. Skip the salon hassle and book a grooming visit that fits your schedule.
        </p>
        <div className="inline-block">
          {/* Call-to-action: scroll to form or open form modal - here we place form below */}
          {/* For now just anchor to form section on the page */}
          <a href="#lead-form" className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">
            Get a Quote or Book Now
          </a>
        </div>
      </section>

      <section id="lead-form" className="max-w-3xl mx-auto">
        <PetLeadForm />
      </section>
    </main>
  );
}
