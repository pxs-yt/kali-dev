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
