// TODO: calling REST instead of using localStorage

let listUsers = [
    { id: 1, name: 'Trung Ho', username: 'leetrunghoo', email: 'leetrunghoo@gmail.com', password: '1', role: 'admin', group: 'management', created: 1274100820703 },
    { id: 2, name: 'Test One', username: 'test', email: 'test@gmail.com', password: 'test', role: 'admin', group: 'management', created: 1474100820703 },
    { id: 3, name: 'John Terry', username: 'terry', email: 'terry@gmail.com', password: 'terry', role: 'editor', group: 'developer', created: 1473090820703 },
    { id: 4, name: 'David Beckham', username: 'beckham', email: 'beckham@gmail.com', password: 'beckham', role: 'view', group: 'N/A', created: 1472050820703 },
    { id: 5, name: 'Tom Hanks', username: 'tom', email: 'tom@gmail.com', password: 'tom', role: 'editor', group: 'developer', created: 1473090820703 },
    { id: 6, name: 'Tom Cruise', username: 'cruise', email: 'cruise@gmail.com', password: 'beckham', role: 'view', group: 'N/A', created: 1472030820703 },
    { id: 7, name: 'Brad Pitt', username: 'pitt', email: 'brad@gmail.com', password: 'brad', role: 'view', group: 'N/A', created: 1476050820703 },
    { id: 8, name: 'Tsubasa', username: 'tsubasa', email: 'tsubasa@gmail.com', password: 'tsubasa', role: 'editor', group: 'developer', created: 1473090820703 },
    { id: 9, name: 'Doraemon', username: 'doraemon', email: 'doraemon@gmail.com', password: 'doraemon', role: 'view', group: 'N/A', created: 1479050820703 },
    { id: 10, name: 'Nobita', username: 'nobi', email: 'nobi@gmail.com', password: 'nobi', role: 'view', group: 'N/A', created: 1462050820703 }
];
if (localStorage.listUsers) {
    listUsers = JSON.parse(localStorage.listUsers);
} else {
    localStorage.listUsers = JSON.stringify(listUsers);
}

module.exports = {
    getListUsers() {
        return listUsers;
    },
    getUserById(id) {
        return listUsers.filter(user => user.id == id)[0];
    },
    deleteUserById(id) {
        listUsers = listUsers.filter(user => user.id != id);
        localStorage.listUsers = JSON.stringify(listUsers);
        return listUsers;
    },
    getUserByEmail(email) {
        return listUsers.filter(user => user.email == email)[0];
    },
    addNewUser(user, cb) {
        // user: {name, username, email, role, group }
        user.id = Date.now();
        user.created = Date.now();
        listUsers.push(user);
        localStorage.listUsers = JSON.stringify(listUsers);
        if (typeof cb === 'function') {
            cb();
        }
    },
    authentication(email, pass) {
        let user = listUsers.filter(user => user.email == email)[0];
        if (!user) {
            return false;
        }
        if (user.password !== pass) {
            return false;
        }
        return true;
    }
}
