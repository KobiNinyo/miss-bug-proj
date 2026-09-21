import express from 'express'
import cookieParser from 'cookie-parser'
import { bugService } from './services/bug.service.js'

const app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello there')
})

app.get('/api/bug', (req, res) => {
  const bugs = bugService.query()
  res.json(bugs)
})

app.get('/api/bug/save', (req, res) => {
  const bug = {
    title: req.query.title,
    description: req.query.description,
    severity: +req.query.severity,
  }

  const savedBug = bugService.save(bug)

  res.json(savedBug)
})

app.listen(3030, () => {
  console.log('Server ready at port 3030')
})
