function isValid({ grant_type, username, password, client_id, client_secret }) {
  return grant_type === 'password' && username && password && client_id && client_secret
}

function token() {
  return {
    access_token: "MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk"
    // scope: "create"
  }
}

export default (req, res) => {
  if (isValid(req.body)) {
    //
  }
  // if (req.method === 'POST') {
    console.log(res)
    // Process a POST request
  // } else {
  //   // Handle any other HTTP method
  // }
}