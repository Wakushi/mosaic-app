import { NextApiRequest, NextApiResponse } from 'next'
import { buyMarketShareItem } from '@/utils/user-contract-interactions'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { marketShareItemId } = req.body

  try {
    const result = await buyMarketShareItem(marketShareItemId)
    res.status(200).json(result)
  } catch (error) {
    console.error('Error buying listed share:', error)
    res.status(500).json({ message: 'Failed to buy listed share' })
  }
}