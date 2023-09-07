const express = require('express')
const path = require('path')
const PORT = 3001

const app = express()

app.use(express.static('public'))

app.get('/api/movies', (req, res) => {
  console.log(res)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
