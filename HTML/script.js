// Print User Agent
console.log("User Agent: " + navigator.userAgent);

// Print Operating System
var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
console.log("Operating System: " + OSName);

// Print Battery Percentage
if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        console.log("Battery Percentage: " + battery.level * 100 + "%");
    });
} else {
    console.log("Battery Status API is not supported on this browser.");
}

// Print additional navigator properties
console.log("appCodeName: " + navigator.appCodeName);
console.log("appName: " + navigator.appName);
console.log("appVersion: " + navigator.appVersion);
console.log("cookieEnabled: " + navigator.cookieEnabled);
console.log("language: " + navigator.language);
console.log("onLine: " + navigator.onLine);
console.log("platform: " + navigator.platform);
console.log("product: " + navigator.product);
console.log("javaEnabled: " + navigator.javaEnabled());

// Print experimental navigator properties
if (navigator.bluetooth) {
    console.log("bluetooth: " + navigator.bluetooth);
} else {
    console.log("Bluetooth API is not supported on this browser.");
}

if (navigator.clipboard) {
    console.log("clipboard: " + navigator.clipboard);
} else {
    console.log("Clipboard API is not supported on this browser.");
}

if (navigator.connection) {
    console.log("connection: " + navigator.connection);
} else {
    console.log("Network Information API is not supported on this browser.");
}

if (navigator.deviceMemory) {
    console.log("deviceMemory: " + navigator.deviceMemory);
} else {
    console.log("Device Memory API is not supported on this browser.");
}

if (navigator.gpu) {
    console.log("gpu: " + navigator.gpu);
} else {
    console.log("WebGPU API is not supported on this browser.");
}

if (navigator.hardwareConcurrency) {
    console.log("hardwareConcurrency: " + navigator.hardwareConcurrency);
} else {
    console.log("Hardware Concurrency API is not supported on this browser.");
}

// Print geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Geolocation: " + position.coords.latitude + ", " + position.coords.longitude);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
