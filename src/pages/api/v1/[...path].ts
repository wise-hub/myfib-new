import { NextApiRequest, NextApiResponse } from 'next';
import { apiClient } from '../../../utils/apiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const token = req.headers['token'] as string;
  const customer = req.headers['customer'] as string;
  const referer = req.headers['ebank-referer'] as string;

  if (!token || !customer || !referer || !path) {
    return res.status(400).json({ error: 'token, customer, referer, and endpoint path are required' });
  }

  const endpoint = Array.isArray(path) ? path.join('/') : path;

  try {
    const data = await apiClient({
      method: req.method as 'GET' | 'POST',
      endpoint,
      token,
      customer,
      referer,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error forwarding request to Fibank API', details: String(error) });
  }
}
