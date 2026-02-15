// 01 - use amp library
import amqp from "amqplib/callback_api.js";

/* 02 - set up a connection and a channel 
   to declare where we're recieving messages from.
   Note - they match the same as the publisher in send.js sends messages to.
*/
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    // 03 - allow for messages to be consumed
    /*
  Note: messages arrive async, so we need a callback, 
  which will be executed when RabbitMQ pushes new messages from publishers.
  */
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Recieved %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
