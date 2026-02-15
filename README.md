# This follows the JavaScript (Node) tutorial for RabbitMQ
The tutorial can be found [here](https://www.rabbitmq.com/tutorials/tutorial-one-javascript)
___

## Prerequisites

* Having Node.js installed.

* Having a RabbitMQ server installed and running.
    * I have a RabbitMQ server running in a docker container.
The docker image can be found [here](https://www.rabbitmq.com/docs/download)
    * I have also copied it in here:
    ```
    # latest RabbitMQ 4.x 
    docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management
    ```
    * remove '--rm' if you want to keep the container when it is stopped.
    * note that there is no volumes for this container as it is, so the queue will not be saved when the container is stopped. 
___

### Part 1 - Send and Recieve "Hello World!"

To run the first part of the tutorial go to the terminal and write: 
#shell 1
```
npm run consume
```

Then open another terminal and write:
#shell 2
```
npm run publish
```
Expected output is that you will see the message from **send.js** be sent to **recieve.js**.

___

### Part 2 - Send Message to Several Workers

To run the second part of the tutorial open a terminal and write:
#shell 1
``` 
npm run worker
```

Open a second terminal and write: 
#shell 2
``` 
npm run worker
```

Open a third terminal and write:
#shell 3
``` 
npm run newTask First message.
npm run newTask Second message..
npm run newTask Third message...
npm run newTask Fourth message....
npm run newTask Fifth message.....
```
Note: optionally you can open more worker terminals, to see RabbitMQ devide the message queue between the workers. 
___

Author of this repo: Lise Petculescu


