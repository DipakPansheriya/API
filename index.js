const express = require('express');
const userRoute =  require('./router/userRoute')
const studentsRoute =  require('./router/studentsRoute')
require('./db/connection')

const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors')

app.use(cors({origin: "*"}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
  
app.use(express.json());
app.use('/api/v1/user' , userRoute)
app.use('/api/v1', studentsRoute)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
