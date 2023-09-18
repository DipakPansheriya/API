const express = require('express');
const app = express();
const port = 3000;


app.post('/api/post', async (req, res) => {
    const data = await req.body; // Assuming you're sending JSON in the request body
  console.log(req.body);
    // Send a response
    res.status(200).json({ message: 'Data received successfully', data:data });
  });

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
