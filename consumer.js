const { kafka } = require("./client");

async function init() {
    const consumer = kafka.consumer({ groupId: "user-1" });
    console.log("consumer connecting...");
    await consumer.connect();
    console.log("consumer connected ..");

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
    console.log("consumer subscribed..");

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log({
                topic,
                partition,
                // offset: message.offset,
                value: message.value.toString(),
            });
        },
    });

    // await consumer.disconnect();
}

init();