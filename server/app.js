const express = require('express');
const cors = require('cors');
const { addressRouter } = require('./routers/addressRouter');

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/address', addressRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
