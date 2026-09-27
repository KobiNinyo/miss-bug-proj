import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { bugService } from './services/bug.service.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5501',
    credentials: true,
}))

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
    _id: req.query._id,
    title: req.query.title,
    description: req.query.description,
    severity: +req.query.severity,
}
  const savedBug = bugService.save(bug)

  res.json(savedBug)
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId } = req.params
    const isRemoved = bugService.remove(bugId)

    res.json(isRemoved)
})
app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    let visitedBugs = req.cookies.visitedBugs || []

    if (!visitedBugs.includes(bugId)) {
        visitedBugs.push(bugId)
    }

    if (visitedBugs.length > 3) {
        return res.status(401).send('Wait for a bit')
    }

    res.cookie('visitedBugs', visitedBugs, { maxAge: 7 * 1000 })
    console.log('User visited at the following bugs:', visitedBugs)

    const bug = bugService.getById(bugId)
    res.json(bug)
})


app.listen(3030, () => {
  console.log('Server ready at port 3030')
})
