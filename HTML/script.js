// Create a string to hold the data
var dataStr = "";

// Function to add data to the string
function addData(data) {
    console.log(data);
    dataStr += data + "\n";
}

// Print User Agent
addData("User Agent: " + navigator.userAgent);

// Print Operating System
var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
addData("Operating System: " + OSName);

// Print Battery Percentage
if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        addData("Battery Percentage: " + battery.level * 100 + "%");
    });
} else {
    addData("Battery Status API is not supported on this browser.");
}

// Print additional navigator properties
addData("appCodeName: " + navigator.appCodeName);
addData("appName: " + navigator.appName);
addData("appVersion: " + navigator.appVersion);
addData("cookieEnabled: " + navigator.cookieEnabled);
addData("language: " + navigator.language);
addData("onLine: " + navigator.onLine);
addData("platform: " + navigator.platform);
addData("product: " + navigator.product);
addData("javaEnabled: " + navigator.javaEnabled());

// Print experimental navigator properties
addData("bluetooth: " + navigator.bluetooth);
addData("clipboard: " + navigator.clipboard);
addData("connection: " + navigator.connection);
addData("deviceMemory: " + navigator.deviceMemory);
addData("gpu: " + navigator.gpu);
addData("hardwareConcurrency: " + navigator.hardwareConcurrency);

// Print geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        addData("Geolocation: " + position.coords.latitude + ", " + position.coords.longitude);
    }, function(error) {
        addData("Error occurred. Error code: " + error.code);
    });
} else {
    addData("Geolocation is not supported by this browser.");
}

// Get IP Address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        addData("IP Address: " + data.ip);
    })
    .catch(error => console.error('Error:', error));

// Function to download data
function downloadData() {
    var blob = new Blob([dataStr], {type: 'text/plain'});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'data.txt';
    a.click();
}

// Get the button from the HTML
var btn = document.getElementById('downloadButton');
btn.onclick = downloadData;
