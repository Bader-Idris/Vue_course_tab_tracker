const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({msg: 'hello world'})
})
port = process.env.PORT || 3000
app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);