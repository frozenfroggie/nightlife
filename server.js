const express = require('express');
const app = express();
require('dotenv').load();

console.log(process.env.SECRET);

app.use('/', express.static('./dist'));
app.get('/', (req, res) => {
 res.sendFile(process.cwd() + '/dist/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🌎 Server running on port: ${port}. Open: http://localhost:${port}/ in your browser.`);
});
