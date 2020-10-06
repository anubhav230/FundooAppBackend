const collaborator = require('../model/colabModel');

module.exports = class ColabService {

    search(email) {
        return new Promise((resolve, reject) => {
            collaborator.findUser(email) //calling findAllUser() of collab model to search requested email
                .then(data => {
                    console.log(data)
                    resolve(data)
                })
                .catch(err => {
                    reject('email not found: ' + err)
                })
        })
    }

    createCollaborator(userId, noteId) {
        return new Promise((resolve, reject) => {
            return collaborator.createCollaborator(userId, noteId)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('email not found: ' + err)
                })
        });
    }
}