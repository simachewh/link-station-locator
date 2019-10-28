/**
 * 
 */
var express = require("express");
var bodyParser = require("body-parser")
var util = require("util");
var linkStationLocator = require("./LinkStationLocator")
var app = express();
var path = require("path");

/**
 * Handle COORS
 */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization');
    next();
});

// Set the root folder to serve public assets.
app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * End point /best-stations. Accepts devices and an optional locations.
 * Calculates the best link station for each device and return it in the response.
 * Response looks like { device : { x:12, y:13}, bestPower: 22, bestStations:[ {x:0, y:2, r:15} ] }.
 * Here response.bestStations is an arry incase there are two or more staions that fits best having 
 * the same power for the device.
 *
 */
app.post("/best-stations", function (request, response) {
    console.log("Recived request ", request.body)
    var params;
    var devices;
    var stations;
    var result;
    if (request.body) {
        params = request.body;
    }
    else {
        response.json("body is missing")
        return;
    }
    if (!params.devices) {
        response.json("body is missing")
        return;
    }
    if (!params.stations) {
        stations = null;
    }
    devices = params.devices;
    stations = params.stations;
    result = linkStationLocator(devices);
    console.log("result = ", util.inspect(result, false, null));
    response.json(result);
})

// Start the server on port 8080 (http://localhost:8080)
var litsner = app.listen(Number(process.env.PORT || 8080));
util.log("Starting server at " + litsner.address().port);