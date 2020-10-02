const label = require('../model/labelModel');

module.exports = class Lable {

    createLabel(labelData) {
        return new Promise((resolve, reject) => {
            label.createLabel(labelData)
                .then(noteData => {
                    resolve(noteData)
                })
                .catch(err => {
                    reject(err)
                })
        });
    }

    readLabel(userId) {
        return new Promise((resolve, reject) => {
            label.readLabel(userId)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('error' + err)
                })
        })
    }

    updateLabel(labelName, id) {
        return new Promise((resolve, reject) => {
            label.updateLabel(labelName, id)
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        });
    }

    deleteNote(bodydata) {
        return new Promise((resolve, reject) => {
            //console.log(bodydata.id)
            label.delete(bodydata.id)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('error: ' + err)
                })
        });
    }

}