import { NextApiRequest, NextApiResponse } from 'next'

export default function refresh(req: NextApiRequest, res: NextApiResponse): void {
  res.json({})
}
// function isRefreshToken({}) {
//   return grantType === 'refresh_token' && refreshToken && clientId && clientSecret
// }
