const label = require('../model/labelModel');

module.exports = class Lable {

    /**
     * @description service function for creating labels
     * @param {labelData} labelData 
     */
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

    /**
     * @description function for reading all labels
     * @param {userId} userId 
     */
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

    /**
     * @description function for updating labels
     * @param {labelName} labelName 
     * @param {id} id 
     */
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

    /**
     * @description function for deleting labels
     * @param {bodydata} bodydata 
     */
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