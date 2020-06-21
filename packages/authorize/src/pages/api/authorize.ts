import { NextApiRequest, NextApiResponse } from 'next'

function isValid({ grantType, username, password, clientId, clientSecret }): string {
  return grantType === 'password' && username && password && clientId && clientSecret
}

// function token() {
//   return {
//     accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
//     tokenType: 'bearer',
//     expiresIn: 3600,
//     refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk'
//     // scope: 'create'
//   }
// }

// export default (req: NextApiRequest, res: NextApiResponse): void => {
//   if (isValid(req.body)) {
//     //
//   }
//   // if (req.method === 'POST') {
//   //   console.log(res)
//   //   // Process a POST request
//   // } else {
//   //   // Handle any other HTTP method
//   // }
// }
