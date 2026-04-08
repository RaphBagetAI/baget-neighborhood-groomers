import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, neighborhood, petType, petSize, groomingNeeds, preferredTiming, contact } = req.body;

  if (!name || !neighborhood || !petType || !petSize || !groomingNeeds || !preferredTiming || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Here you could add sending an email or integrating with a CRM/inbox
  // For now, just log to the console (simulate)
  console.log('New booking lead received:', req.body);

  // TODO: Integrate with email service or CRM API to send notification

  return res.status(200).json({ message: 'Lead received' });
}
