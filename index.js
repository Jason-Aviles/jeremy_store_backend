const server = require('./charge')

require('dotenv').config()
const PORT = process.env.PORT  || 7000;

server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})