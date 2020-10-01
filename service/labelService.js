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

}