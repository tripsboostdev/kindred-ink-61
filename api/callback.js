export default async function handler(req, res) {
  const { code } = req.query;
  const clientID = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientID,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(401).send("Authentication failed");
  }

  res.send(`
    <html><body><script>
      (function() {
        function recieveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(data)}',
            e.origin
          )
        }
        window.addEventListener("message", recieveMessage, false)
        window.opener.postMessage("authorizing:github", "*")
      })()
    </script></body></html>
  `);
}
