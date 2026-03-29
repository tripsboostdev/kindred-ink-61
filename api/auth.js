export default async function handler(req, res) {
  const clientID = process.env.OAUTH_CLIENT_ID;
  const redirectUri = `https://${req.headers.host}/api/callback`;
  
  const url = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo,user&redirect_uri=${redirectUri}`;
  
  res.redirect(url);
}
