/**
 * Locates the best available link station for a device placed at a pont x,y
 *
 * LinkStationLocator.js
 * @public module
 */
function LinkStationLocator(){

var util = require( "util" );
/**
 * Link stationos located at points x and y in the two dimentional x,y 
 * plane with distance reach of r.
 * 
 * @type {{}[]}
 */
this.linkStations = [
    {
        x : 0,
        y : 0,
        r : 10
    },
    {
        x : 20,
        y : 20,
        r : 5
    },
    {
        x : 10,
        y : 0,
        r : 12
    }
];
/**
 * Devices located at points x and y in the two dinentional x,y plane.
 * 
 * @type {{}[]}
 */
this.devices = [
    {
        x : 0,
        y : 0
    },
    {
        x : 100,
        y : 100
    },
    {
        x : 15,
        y : 10
    },
    {
        x : 18,
        y : 18
    }
];
/**
 * Calculates the distance of a device from a linkStation.
 * Distance = the square root of ( (change in x)^2 - (change in y)^2 )
 * @param {{}} device 
 * @param {{}} linkStation 
 */
function calculateDeviceDistancefromLinkStation( /* Object */ device, /* Object */ linkStation )
{
    var distanceX = linkStation.x - device.x;
    var distanceY = linkStation.y - device.y;
    return Math.sqrt( Math.pow( distanceX, 2 ) + Math.pow( distanceY, 2 ) );
}
/**
 * Calculates the power of the given link station at the point where the given device is located.
 * Power = ( reach of link station - distance of device ) ^2 
 *
 * @param {{}} linkStation
 * @param {{}} device
 * @returns {number}
 */
function calculatePower( /* Object */ linkStation, /* Object */ device )
{
    var power;
    var distance = calculateDeviceDistancefromLinkStation( device, linkStation );
    if( distance > linkStation.r )
    {
        power = 0;
    }
    else
    {
        power = Math.pow( ( linkStation.r - distance ), 2 );
    }
    return power;
}
/**
 * Finds the best stations from linkStations that are available for the given device.
 * Note: the returned object has a property .bestStations which is an array. The choice of 
 * making it an array is to store best stations if there is such a point where two 
 * stations could equally be the best. i.e two staions can have the same power at that point.
 * 
 * @param {{}} device see this.locateBestLinkStation
 * @returns Object - { device: the given device, bestPower: 15, bestStations: [ { x:1, y:3, r:20 } ] }
 */
this.bestStationForDevice = function( /* Object */ device )
{
    var result = {
        device : device,
        bestPower : 0,
        bestStations : [] // todo : is this a bit of overthinking
    }
    var currentStation;
    var currentPower;
    for( var i = 0; i < this.linkStations.length; i++ )
    {
        currentStation = this.linkStations[ i ];
        currentPower = calculatePower( currentStation, device );
        if( currentPower <= 0 )
        {
            continue;
        }
        if( currentPower == result.bestPower )
        {
            result.bestPower = currentPower;
            result.bestStations.push( currentStation );
        }
        else if( currentPower > result.bestPower  )
        {
            result.bestPower = currentPower;
            result.bestStations.length = 0;
            result.bestStations.push( currentStation );
        }
    }
    return result;
}
/**
 * Finds the best link station with the most power for the given devices.
 * If devices or linkstations are not given the default ones are used instead. See above.
 * 
 * @param {[{}]} devices - Array of points of objects representing the points of a device's location. 
 * Example: [ { x:1, y:2 },... ]
 * @param {[{}]} linkStations - Array of objects representing the location of a link sation and its reach 
 * Example: [ { x:0, y:3, r:17},... ]
 * @returns Array
 */
this.locateBestLinkStation = function( /* [] */ devices, /* Array */linkStations )
{
    if( !linkStations )
    {
        linkStations = this.linkStations;
    }
    if( !devices )
    {
        devices = this.devices;
    }
    var results = [];
    for( var i = 0; i < devices.length; i++ )
    {
        var currentDevice = devices[ i ];
        results.push( this.bestStationForDevice( currentDevice ) );
    }
    return results;
}
}
module.exports = new LinkStationLocator();
