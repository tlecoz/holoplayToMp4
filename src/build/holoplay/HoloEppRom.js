class HoloEppRom {
    constructor(holoplay) {
        this.defaultCalibration = { "configVersion": "1.0", "serial": "00112", "pitch": { "value": 49.825218200683597 }, "slope": { "value": 5.2160325050354 }, "center": { "value": -0.23396748304367066 }, "viewCone": { "value": 40.0 }, "invView": { "value": 1.0 }, "verticalAngle": { "value": 0.0 }, "DPI": { "value": 338.0 }, "screenW": { "value": 2560.0 }, "screenH": { "value": 1600.0 }, "flipImageX": { "value": 0.0 }, "flipImageY": { "value": 0.0 }, "flipSubp": { "value": 0.0 } };
        this.initialized = false;
        this.holoplay = holoplay;
        var OSName = "Unknown OS";
        if (navigator.appVersion.indexOf("Win") != -1)
            OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1)
            OSName = "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1)
            OSName = "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1)
            OSName = "Linux";
        var th = this;
        var ws = new WebSocket('ws://localhost:11222/');
        var finished = function () {
            ws.close();
            if (th.onReady)
                th.onReady();
        };
        var timeout = setTimeout(function () {
            console.warn("Calibration not found in internal memory.");
            th.initialized = true;
            th.holoplay.initScreen(false);
        }, 1000);
        ws.onmessage = function (event) {
            console.log("onMessage = ", event.data);
            if (!th.initialized) {
                th.saveCalibration(event.data);
                th.applyCalibration(event.data);
                clearTimeout(timeout);
                th.initialized = true;
            }
            finished();
        };
        ws.onerror = function (event) {
            var url = "https://s3.amazonaws.com/static-files.lookingglassfactory.com/WebCalibrationBridge/LKG_ThreeJsDriver_Win.exe";
            if (OSName == "MacOS")
                url = "https://s3.amazonaws.com/static-files.lookingglassfactory.com/WebCalibrationBridge/LKG_ThreeJsDriver_Mac.pkg";
            else if (OSName != "Windows")
                url = "the driver doesn't exist on your OS :'(";
            console.warn("Three.js driver not detected! download it here : " + url);
            clearTimeout(timeout);
            th.initialized = true;
            th.holoplay.initScreen(false);
            finished();
        };
    }
    applyCalibration(calibration_obj) {
        var jsonObj;
        if (calibration_obj === undefined || calibration_obj === "") {
            jsonObj = this.defaultCalibration;
            alert("No Looking Glass display connected; using default calibration data. Please ensure your Looking Glass is connected to your computer via USB and reload the page.");
        }
        else {
            jsonObj = JSON.parse(calibration_obj);
        }
        this.jsonObj = jsonObj;
        this.holoplay.initScreen();
    }
    saveCalibration(calibration_obj) {
        localStorage['Config'] = calibration_obj;
    }
}
//# sourceMappingURL=HoloEppRom.js.map