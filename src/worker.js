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
      // to keep the queue if RabbitMQ quits or crashes - durable: true
      durable: true,
    });
    // prefetch makes sure a worker is only assigned the prefetch(number) 
    // amount of tasks to perform once it is done with it's current task 
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    // 03 - allow for messages to be consumed
    /*
     Note: messages arrive async, so we need a callback, 
     which will be executed when RabbitMQ pushes new messages from publishers.
   */
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

/*
Note on message persistence (from tutorial)
Marking messages as persistent doesn't fully guarantee that a message
 won't be lost. Although it tells RabbitMQ to save the message to disk, 
 there is still a short time window when RabbitMQ has accepted a message 
 and hasn't saved it yet. 
 
 Also, RabbitMQ doesn't do fsync(2) for every message 
 -- it may be just saved to cache and not really written to the disk. 
 The persistence guarantees aren't strong, but it's more than enough for our simple task queue. 
 If you need a stronger guarantee then you can use publisher confirms.
*/
