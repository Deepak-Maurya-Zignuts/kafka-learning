const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("producer connecting...");
  await producer.connect();
  console.log("producer connected ..");

  rl.setPrompt('>');
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");
  })


  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0,
        key: "location-updates",
        value: JSON.stringify({ name: "Rider 1", location: "12345" }),
      },
    ],
  });

  console.log("producer send done..");

  await producer.disconnect();
}
init();