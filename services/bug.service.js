const bugs = [
  {
    _id: 'b101',
    title: 'Cannot save a new car',
    description: 'Problem when clicking Save',
    severity: 3,
    createdAt: Date.now(),
    labels: ['critical', 'dev-branch'],
  },
  {
    _id: 'b102',
    title: 'Login button does not work',
    description: 'The user cannot log in',
    severity: 2,
    createdAt: Date.now(),
    labels: ['need-CR'],
  },
]

export const bugService = {
  query,
  getById,
  save,
  remove,
}

function query(filterBy = {}) {
  const {
    txt = '',
    minSeverity = 0,
    labels = '',
    sortBy = '',
    sortDir = 1,
    pageIdx = 0,
  } = filterBy
  let filteredBugs = [...bugs]

  if (txt) {
    filteredBugs = filteredBugs.filter((bug) =>
      bug.title.toLowerCase().includes(txt.toLowerCase())
    )
  }
  if (minSeverity) {
    filteredBugs = filteredBugs.filter((bug) => bug.severity >= +minSeverity)
  }
  if (labels) {
    const labelsToFilter = labels.split(',')

    filteredBugs = filteredBugs.filter((bug) =>
      bug.labels.some((label) => labelsToFilter.includes(label))
    )
  }
  if (sortBy) {
    filteredBugs.sort((bug1, bug2) => {
      const value1 = bug1[sortBy]
      const value2 = bug2[sortBy]

      if (value1 > value2) return 1 * +sortDir
      if (value1 < value2) return -1 * +sortDir
      return 0
    })
  }

  const PAGE_SIZE = 2
  const startIdx = +pageIdx * PAGE_SIZE

  return filteredBugs.slice(startIdx, startIdx + PAGE_SIZE)
}

function getById(bugId) {
  return bugs.find((bug) => bug._id === bugId)
}

function remove(bugId) {
  const bugIdx = bugs.findIndex((bug) => bug._id === bugId)
  if (bugIdx === -1) return false

  bugs.splice(bugIdx, 1)
  return true
}

function save(bug) {
  if (bug._id) {
    const bugIdx = bugs.findIndex((currBug) => currBug._id === bug._id)

    if (bugIdx === -1) return null

    bugs.splice(bugIdx, 1, bug)
  } else {
    bug._id = Date.now().toString()
    bug.createdAt = Date.now()

    bugs.push(bug)
  }

  return bug
}
