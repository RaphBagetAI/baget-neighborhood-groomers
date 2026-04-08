import { useState } from 'react';

export function PetLeadForm() {
  const [formState, setFormState] = useState({
    name: '',
    neighborhood: '',
    petType: '',
    petSize: '',
    groomingNeeds: '',
    preferredTiming: '',
    contact: '',
  });
  const [status, setStatus] = useState('idle');

  const canSubmit = 
    formState.name.trim() &&
    formState.neighborhood.trim() &&
    formState.petType.trim() &&
    formState.petSize.trim() &&
    formState.groomingNeeds.trim() &&
    formState.preferredTiming.trim() &&
    formState.contact.trim();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('submitting');
    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (!resp.ok) throw new Error('Network response not ok');
      setStatus('success');
      setFormState({
        name: '',
        neighborhood: '',
        petType: '',
        petSize: '',
        groomingNeeds: '',
        preferredTiming: '',
        contact: '',
      });
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Get a Grooming Quote or Book Your Pet</h2>
      {status === 'success' ? (
        <div className="p-4 bg-green-100 text-green-900 rounded">
          Thank you! We will get back to you within 24 hours with a quote and availability.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">Your Name</label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="neighborhood" className="block font-medium">Neighborhood / ZIP Code</label>
            <input
              id="neighborhood"
              type="text"
              value={formState.neighborhood}
              onChange={e => setFormState(s => ({ ...s, neighborhood: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="petType" className="block font-medium">Pet Type & Breed</label>
            <input
              id="petType"
              type="text"
              placeholder="e.g., Dog - Doodle"
              value={formState.petType}
              onChange={e => setFormState(s => ({ ...s, petType: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="petSize" className="block font-medium">Pet Size</label>
            <select
              id="petSize"
              value={formState.petSize}
              onChange={e => setFormState(s => ({ ...s, petSize: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select size</option>
              <option value="Small">Small (under 20 lbs)</option>
              <option value="Medium">Medium (20-50 lbs)</option>
              <option value="Large">Large (50+ lbs)</option>
            </select>
          </div>
          <div>
            <label htmlFor="groomingNeeds" className="block font-medium">Grooming Needs / Services</label>
            <textarea
              id="groomingNeeds"
              placeholder="E.g., full groom, bath only, nail trim"
              value={formState.groomingNeeds}
              onChange={e => setFormState(s => ({ ...s, groomingNeeds: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label htmlFor="preferredTiming" className="block font-medium">Preferred Date/Time or Timing Window</label>
            <input
              id="preferredTiming"
              type="text"
              placeholder="E.g., Weekends, Next Friday afternoon"
              value={formState.preferredTiming}
              onChange={e => setFormState(s => ({ ...s, preferredTiming: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block font-medium">Email or Phone</label>
            <input
              id="contact"
              type="text"
              placeholder="Your best contact method"
              value={formState.contact}
              onChange={e => setFormState(s => ({ ...s, contact: e.target.value }))}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {status === 'error' && (
            <p className="text-red-600 font-medium">Failed to submit. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={!canSubmit || status === 'submitting'}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === 'submitting' ? 'Submitting...' : 'Request Quote / Book'}
          </button>
        </form>
      )}
    </section>
  );
}
