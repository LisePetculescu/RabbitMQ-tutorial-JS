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
    const queue = "hello";
    const msg = " Hello World!";

    // 04 - declare a queue to send messages to
    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
  });

  // 05 - close the connection and exit
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
