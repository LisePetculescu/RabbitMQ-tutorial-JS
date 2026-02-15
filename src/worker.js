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
    const queue = "task_queue";

    channel.assertQueue(queue, {
      durable: true,
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
        const secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Recieved %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
          // adding ack will make sure RabbitMQ knows if a message is not fully delivered to a consumer --> requeue
          channel.ack(msg);
        }, secs * 1000);
      },
      {
        // manual acknowledgment mode,
        // see /docs/confirms for details
        noAck: false,
      },
    );
  });
});
