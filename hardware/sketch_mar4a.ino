#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>

#define DHTPIN D5
#define DHTTYPE DHT11
#define LIGHT_SENSOR_PIN A0

DHT_Unified dht(DHTPIN, DHTTYPE);

const char *ssid = "Thanh Luan";
const char *password = "hoilamgi";

const char *mqtt_server = "192.168.1.4";
const char *mqtt_username = "luanpd";
const char *mqtt_password = "luanpd";

const char *data_topic = "data";
const char *D6_topic = "D6";
const char *D7_topic = "D7";
const char *D6_status_topic = "sttD6";
const char *D7_status_topic = "sttD7";
const char *all_topic = "all";
const char *all_status_topic = "sttAll";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;

float temp, hum, light;

String D6_status = "OFF";
String D7_status = "OFF";

void setup_wifi() {
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  
  char payloadStr[length + 1];
  for (int i = 0; i < length; i++) {
    payloadStr[i] = (char)payload[i];
  }
  payloadStr[length] = '\0';
  Serial.println(payloadStr);
  DynamicJsonDocument doc(256);
  deserializeJson(doc, payloadStr);
  
  String statusMessage = "";
  // "{\"D6\":\"ON\",\"D7\":\"ON\"}"
  if (strcmp(topic, all_topic) == 0) { // All device
    if (doc["D6"] == "ON") {
      digitalWrite(D6, HIGH);
      D6_status = "ON"; 
      client.publish(D6_status_topic, "D6 - ON");
    } else if (doc["D6"] == "OFF") {
      digitalWrite(D6, LOW);
      D6_status = "OFF";
      client.publish(D6_status_topic, "D6 - OFF");
    }
    if (doc["D7"] == "ON") {
      digitalWrite(D7, HIGH);
      D7_status = "ON";
      client.publish(D7_status_topic, "D7 - ON");
    } else if (doc["D7"] == "OFF") {
      digitalWrite(D7, LOW);
      D7_status = "OFF";
      client.publish(D7_status_topic, "D7 - OFF");
    }
    // Publish all device status
    statusMessage = "D6: " + D6_status +" --- "+"D7: " + D7_status;
    client.publish(all_status_topic, statusMessage.c_str());
  } else if (strcmp(topic, D6_topic) == 0) { // Only D6
    if (strcmp(payloadStr, "ON") == 0) {
      digitalWrite(D6, HIGH);
      D6_status = "ON";
      client.publish(D6_status_topic, "D6 - ON");
    } else if (strcmp(payloadStr, "OFF") == 0) {
      digitalWrite(D6, LOW);
      D6_status = "OFF";
      client.publish(D6_status_topic, "D6 - OFF");
    }
    // Publish all device status
    // statusMessage = "D6: " + D6_status +" --- "+"D7: " + D7_status;
    // client.publish(all_status_topic, statusMessage.c_str());
  } else if (strcmp(topic, D7_topic) == 0) {
    if (strcmp(payloadStr, "ON") == 0) {
      digitalWrite(D7, HIGH);
      D7_status = "ON";
      client.publish(D7_status_topic, "D7 - ON");
    } else if (strcmp(payloadStr, "OFF") == 0) {
      digitalWrite(D7, LOW);
      D7_status = "OFF";
      client.publish(D7_status_topic, "D7 - OFF");
    }
    // Publish all device status
    // statusMessage = "D6: " + D6_status +" --- "+"D7: " + D7_status;
    // client.publish(all_status_topic, statusMessage.c_str());
  }
}
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("connected");
      client.subscribe(all_topic);
      client.subscribe(all_status_topic);
      client.subscribe(D6_topic);
      client.subscribe(D6_status_topic);
      client.subscribe(D7_topic);
      client.subscribe(D7_status_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
void setup() {
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);
  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 2705);
  client.setCallback(callback);
}
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  unsigned long now = millis();

  if (now - lastMsg > 3000) {
    lastMsg = now;
    sensors_event_t event;
    dht.temperature().getEvent(&event);

    if (!isnan(event.temperature)) {
      Serial.print(F("Temperature: "));
      Serial.print(event.temperature);
      Serial.println(F(" °C"));
      temp = event.temperature;
    }
    dht.humidity().getEvent(&event);

    if (!isnan(event.relative_humidity)) {
      Serial.print(F("Humidity: "));
      Serial.print(event.relative_humidity);
      Serial.println(F(" %"));
      hum = event.relative_humidity;
    }

    int lightValue = analogRead(LIGHT_SENSOR_PIN);
    light = lightValue;

    Serial.print("Light: ");
    Serial.print((int)light);
    Serial.println(F(" lux"));

    String msgStr = "Temperature: " + String(temp) + " --- " + "Humidity: " + String(hum) + " --- " + "Light: " + String((int)light);
    char msg[msgStr.length() + 1];
    msgStr.toCharArray(msg, sizeof(msg));
    client.publish(data_topic, msg);
    delay(50);
  }
}