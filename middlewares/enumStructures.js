'use strict'

const role = [
    'admin',
    'baseUser',
    'collaborator'
];

const modelsName = {
    book: 'Book',
    user: 'User',
    donation: 'Donation'
};

const bookStatus = [
    'pending',
    'denied',
    'accepted',
    'erased'    
];

module.exports = {
    role,
    modelsName,
    bookStatus
}