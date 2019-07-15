import express from 'express'
import bp from 'body-parser'
import './db/dbconfig'
let port = 3000

let server = express()
server.use(bp.json({ limit: '50mb' }))
server.use('', express.static('public'))

import BlogsController from './controllers/blogsController';

server.use('/api/blogs', new BlogsController().router)





server.use((error, req, res, next) => {
  res.status(error.status || 400).send(error)
})

server.listen(port, () => {
  console.log("Your server is running on port: ", port)
})
