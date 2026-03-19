const BROKER = "broker.hivemq.com";
const PORT = 8000; // Puerto WebSocket para HiveMQ
const CLIENT_ID = "IvanbotEC_Web_" + Math.random().toString(16).substr(2, 8);
const TOPIC = "cyberhome/ivanbot/control";

const client = new Paho.MQTT.Client(BROKER, PORT, CLIENT_ID);

client.connect({ onSuccess: () => console.log("Conectado al Broker MQTT") });

function controlLight(pin, state) {
    const message = new Paho.MQTT.Message(`${pin}:${state}`);
    message.destinationName = TOPIC;
    client.send(message);

    // Actualización visual inmediata
    const card = document.getElementById(`card-${pin}`);
    const status = document.getElementById(`status-${pin}`);

    if (state === 'on') {
        card.classList.add('active-light');
        status.innerText = "ON - GLOBAL";
        status.style.color = "#00f2ff";
    } else {
        card.classList.remove('active-light');
        status.innerText = "OFF";
        status.style.color = "#ff0055";
    }
}