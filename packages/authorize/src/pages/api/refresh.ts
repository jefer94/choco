function isRefreshToken({}) {
  return grant_type === 'refresh_token' && refresh_token && client_id && client_secret
}