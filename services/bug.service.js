const bugs = [
    {
        _id: 'b101',
        title: 'Cannot save a new car',
        description: 'Problem when clicking Save',
        severity: 3,
        createdAt: Date.now(),
    },
    {
        _id: 'b102',
        title: 'Login button does not work',
        description: 'The user cannot log in',
        severity: 2,
        createdAt: Date.now(),
    },
]

export const bugService = {
    query,
    save,
    getById,
    remove,
}

function query() {
    return bugs
}
function getById(bugId) {
    return bugs.find(bug => bug._id === bugId)
}

function save(bug) {
    bug._id = Date.now().toString()
    bug.createdAt = Date.now()

    bugs.push(bug)

    return bug
}

function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if (bugIdx === -1) return false
    
    bugs.splice(bugIdx, 1)
    return true   
}