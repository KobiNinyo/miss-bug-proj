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
}

function query() {
    return bugs
}