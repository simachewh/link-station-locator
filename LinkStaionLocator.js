
var util = require( "util" );
/**
 * Link stationos located at points x and y in the two dimentional x,y plane with distance reach of r.
 * 
 * @type {{}[]}
 */
var linkStations = [
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
 * @type {[Object]}
 */
var devices = [
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
 * 
 * @param {Object} device 
 * @param {Object} linkStation 
 */
function calculateDeviceDistancefromLinkStation( /* Object */ device, /* Object */ linkStation )
{
    var distanceX = linkStation.x - device.x;
    var distanceY = linkStation.y - device.y;
    return Math.sqrt( Math.pow( distanceX, 2 ) + Math.pow( distanceY, 2 ) );
}
/**
 *
 * @param linkStation
 * @param device
 * @returns {number}
 */
function calculatePower( linkStation, device )
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
    for( var i = 0; i < linkStations.length; i++ )
    {
        var currentStation = linkStations[ i ];
        powers[ i ] = calculatePower( currentStation, device );
    }
    return powers;
}
/**
 * Finds the best stations from linkStations for the given device.
 * 
 * @param {Object} device
 * @returns Object
 */
function bestStationForDevice( /* Object */ device )
{
    var result = {
        device : device,
        bestPower : 0,
        bestStations : []
    }
    var bestPower = 0;
    var currentStation;
    var currentPower;
    for( var i = 0; i < linkStations.length; i++ )
    {
        currentStation = linkStations[ i ];
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
 * @param {Array} devices 
 * @param {Array} linkStations 
 * @returns Array
 */
function locateBestLinkStation( /* Array */ devices, /* Array */linkStations )
{
    if( linkStations )
    {
        this.linkStations = linkStations;
    }
    if( !devices )
    {
        devices = this.devices;
    }
    var results = [];
    for( var i = 0; i < devices.length; i++ )
    {
        var currentDevice = devices[ i ];
        results.push( bestStationForDevice( currentDevice ) );
    }
    return results;
    //console.log( "Results:  ", util.inspect( results, { depth : null} ) );
}

module.exports = locateBestLinkStation;
