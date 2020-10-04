const amqplib = require('amqplib/callback_api');
const config = require('../rabbitMq.json');

// Create connection to AMQP server
module.exports.mailer2 = (email, token) => {
    amqplib.connect(config.amqp, (err, connection) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }

        // Create channel
        connection.createChannel((err, channel) => {
            if (err) {
                console.error(err.stack);
                return process.exit(1);
            }

            // Ensure queue for messages
            channel.assertQueue(config.queue, {
                // Ensure that the queue is not deleted when server restarts
                durable: true
            }, err => {
                if (err) {
                    console.error(err.stack);
                    return process.exit(1);
                }
                // Create a function to send objects to the queue
                // Javascript object is converted to JSON and then into a Buffer
                let sender = (content, next) => {
                    let sent = channel.sendToQueue(config.queue, Buffer.from(JSON.stringify(content)), {
                        // Store queued elements on disk
                        persistent: true,
                        contentType: 'application/json'
                    });
                    if (sent) {
                        return next();
                    } else {
                        channel.once('drain', () => next());
                    }
                };

                // push 100 messages to queue
                let sent = 0;
                let sendNext = () => {
                    if (sent >= 1) {
                        console.log('All messages sent!');
                        // Close connection to AMQP server
                        // We need to call channel.close first, otherwise pending
                        // messages are not written to the queue
                        return channel.close(() => connection.close());
                    }
                    sent++;
                    const link = `<a href="http://localhost:4000/register/${token}">http://localhost:4000</a>`
                    sender({
                        to: email,
                        subject: 'nodemailer #' + sent,
                        html: 'Please click on the following link for email verification  ' + link
                    }, sendNext);
                };

                sendNext();

            });
        });
    });
}


// amqplib.connect(config.amqp, (err, connection) => {
//     if (err) {
//         console.error(err.stack);
//         return process.exit(1);
//     }

//     // Create channel
//     connection.createChannel((err, channel) => {
//         if (err) {
//             console.error(err.stack);
//             return process.exit(1);
//         }

//         // Ensure queue for messages
//         channel.assertQueue(config.queue, {
//             // Ensure that the queue is not deleted when server restarts
//             durable: true
//         }, err => {
//             if (err) {
//                 console.error(err.stack);
//                 return process.exit(1);
//             }
//             // Create a function to send objects to the queue
//             // Javascript object is converted to JSON and then into a Buffer
//             let sender = (content, next) => {
//                 let sent = channel.sendToQueue(config.queue, Buffer.from(JSON.stringify(content)), {
//                     // Store queued elements on disk
//                     persistent: true,
//                     contentType: 'application/json'
//                 });
//                 if (sent) {
//                     return next();
//                 } else {
//                     channel.once('drain', () => next());
//                 }
//             };

//             // push 100 messages to queue
//             let sent = 0;
//             let sendNext = () => {
//                 if (sent >= 1) {
//                     console.log('All messages sent!');
//                     // Close connection to AMQP server
//                     // We need to call channel.close first, otherwise pending
//                     // messages are not written to the queue
//                     return channel.close(() => connection.close());
//                 }
//                 sent++;
//                 const link = `<a href="http://localhost:4000/register/">http://localhost:4000</a>`
//                 sender({
//                     to: 'recipient@example.com',
//                     subject: 'nodemailer #' + sent,
//                     html: 'Please click on the following link for email verification  ' + link
//                 }, sendNext);
//             };

//             sendNext();

//         });
//     });
// });