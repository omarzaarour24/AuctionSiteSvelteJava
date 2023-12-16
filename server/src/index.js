import express from 'express';
import users from './routes/Users.js';
import auctions from './routes/Auctions.js'
// import bids from './routes/Bids.js'
const app = express()
const port = 3000
import Authorization  from './routes/Authorization.js' ;
import cors from 'cors';
app.use(cors());
app.use(express.json());
app.use('/api/auctions',auctions);
app.use('/api/users',users);
// app.use('/api/bids',bids);
app.use("/api/Authorization", Authorization);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})