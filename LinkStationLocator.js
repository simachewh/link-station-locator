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
    //console.log( "**** distance ", util.inspect( distance ) );
    if( distance > linkStation.r )
    {
        power = 0;
    }
    else
    {
        power = Math.pow( ( linkStation.r - distance ), 2 );
        //console.log( "power from reach ", linkStation.r, " and distance = " , power);
    }
    return power;
}
/**
 * Calculates the power that is available from each station for the given device.
 *
 * @param device
 * @returns Array
 */
function stationPowersForDevice( /* Object */ device )
{
    var distance;
    var power;
    var powers = {}
    for( var i = 0; i < this.linkStations.length; i++ )
    {
        var currentStation = this.linkStations[ i ];
        powers[ i ] = calculatePower( currentStation, device );
    }
    return powers;
}
/**
 * Finds the best stations from linkStations for the given device.
 * 
 * @param {{}} device
 * @returns Object
 */
this.bestStationForDevice = function( /* Object */ device )
{
    var result = {
        device : device,
        bestPower : 0,
        bestStations : []
    }
    var bestPower = 0;
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
 * @param {[{}]} devices 
 * @param {[{}]} linkStations 
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
