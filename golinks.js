const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 80;

app.use((req, res) => {
  var goLinks = JSON.parse(fs.readFileSync('golinks.json', 'utf8'));

  // Convert all keys to lowercase to allow for case insensitive url lookup
  goLinks = Object.fromEntries(
    Object.entries(goLinks).map(([key, value]) => [key.toLowerCase(), value])
  );

  const fqdn = goLinks[req.path.toLowerCase()];
  if (fqdn) {
    res.redirect(fqdn);
  } else {
    res.status(404).send({ "error": "not found, available urls are", "urls": lowerCaseUrlConfig});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
