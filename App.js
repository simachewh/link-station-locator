/**
 * Demo of usage.
 * This is intended to show how you can use the module required bellow 
 * and at the same time display the output required by the exercise.
 * 
 * @public 
 */
var linkStationLocator = require( "./LinkStationLocator" );
/**
 * The information about link stations given in the exercise.
 * @public {[{}]}
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
 * The location of devices given in the excersise.
 * 
 * (0,0), (100, 100), (15,10) and (18, 18)
 * @public {[{}]}
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
// call the method that returns the best link stations for the given devices.
var results = linkStationLocator.locateBestLinkStation( devices, linkStations );
for( var i = 0; i < results.length; i++ )
{
    var current = results[ i ];
    if( current.bestPower == 0 )
    {
        console.log( "No link station whithin reach for point ", current.device.x, ",", current.device.y, );
    }
    else
    {
        console.log( "Best link station for point ", current.device.x, ",", current.device.y, " is", current.bestStations[ 0 ].x, ",", current.bestStations[ 0 ].y, " with power ", current.bestPower );
    }
}