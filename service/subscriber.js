const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const config = require('../rabbitMq.json')

// Setup Nodemailer transport
const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,

    // we intentionally do not set any authentication
    // options here as we are going to use message specific
    // credentials

    // Security options to disallow using attachments from file or URL
    disableFileAccess: true,
    disableUrlAccess: true
}, {
    // Default options for the message. Used if specific values are not set
    from: '7dc1e9bca4f016'
});

// Create connection to AMQP server
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

            // Only request 1 unacked message from queue
            // This value indicates how many messages we want to process in parallel
            channel.prefetch(1);

            // Set up callback to handle messages received from the queue
            channel.consume(config.queue, data => {
                if (data === null) {
                    return;
                }

                let message = JSON.parse(data.content.toString());
                message.auth = {

                    user: '7dc1e9bca4f016',
                    pass: 'ae32e14d143892',
                    to: process.env.MAIL,
                };

                // Send the message using the previously set up Nodemailer transport
                transport.sendMail(message, (err, info) => {
                    if (err) {
                        console.error(err.stack);
                        // put the failed message item back to queue
                        return channel.nack(data);
                    }
                    console.log('Delivered message %s', info.messageId);
                    // remove message item from the queue
                    channel.ack(data);
                });
            });
        });
    });
});