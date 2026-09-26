import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { bugService } from './services/bug.service.js'

const app = express()

app.use(cors())
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

app.get('/api/bug/:bugId/remove', (req, res) => {
    const bugId = req.params.bugId
    const isRemoved = bugService.remove(bugId)

    res.json(isRemoved)
})


app.get('/api/bug/:bugId', (req, res) => {
    const bugId = req.params.bugId
    const bug = bugService.getById(bugId)

    res.json(bug)
})

app.listen(3030, () => {
  console.log('Server ready at port 3030')
})
