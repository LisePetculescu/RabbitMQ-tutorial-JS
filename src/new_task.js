// 01 - use amp library
import amqp from "amqplib/callback_api.js";

// 02 - connect to RabbitMq server
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  // 03 - create channel for the API
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    // 04 - Schedule tasks to the work queue
    const queue = "task_queue";
    const msg = process.argv.slice(2).join(" ") || "Hello world!";

    // 05 - declare a queue to send messages to
    channel.assertQueue(queue, {
      // to keep the queue if RabbitMQ quits or crashes - durable: true
      durable: true,
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      // to keep the messages if RabbitMQ quits or crashes - persistent: true
      persistent: true,
    });

    console.log(" [x] Sent '%s'", msg);
  });

  // 05 - close the connection and exit
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
