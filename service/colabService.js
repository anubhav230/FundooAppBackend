const collaborator = require('../model/colabModel');

module.exports = class ColabService {

    /**
     * @description service function for searching user
     * @param {email} email 
     */
    search(email) {
        return new Promise((resolve, reject) => {
            collaborator.findUser(email) //calling findAllUser() of collab model to search requested email
                .then(data => {
                    if (data == null) {
                        reject(' enter correct email')
                    } else {
                        //console.log(data)
                        resolve(data)
                    }
                }).catch(err => {
                    reject('email not found: ' + err)
                });
        });
    }

    /**
     * @description service function for adding collaborator
     * @param {email} email 
     * @param {noteId} noteId 
     */
    createCollaborator(email, noteId) {
        return new Promise((resolve, reject) => {
            collaborator.findUser(email)
                .then(data => {
                    if (data == null) {
                        reject('enter correct email')
                    } else {
                        const colabData = {
                            userId: data,
                            noteId: noteId
                        }
                        collaborator.createCollaborator(colabData)
                            .then(data => {
                                resolve(data)
                            })
                            .catch(err => {
                                reject('email not found: ' + err)
                            });
                    }
                }).catch(err => {
                    reject('email not found: ' + err)
                });
        });
    }
}