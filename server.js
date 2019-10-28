/**
 * Created by Simachew on 25-Jun-16.
 */

var express = require( "express" );
var bodyParser = require( "body-parser" )
var app = express();
var path = require( "path" );

// Handling CORS (cross-origin resource sharing) requests
app.use(function(req, res, next) {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST' );
    res.setHeader( 'Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization' );
    next();
});

// Set the public folder to serve public assets.
app.use( express.static( __dirname + "/" ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// Set route to the index.html file.
/**app.get("*", function (req, res) {
    res.sendFile( path.join( __dirname + "/index.html" ) )
});*/

app.get( "/best-stations", function( request, response)
{

    if( !request.boody )
    {
        response.json( "body is missing" )
        //return;
    }
    if( !request.body.devices )
    {
        // todo : incorect params
    }
    var devices = request.body.devices;
    var stations = request.boody.stations || null;
    response.json( "you made it" )
} )

// Start the server on port 8080 (http://localhost:8080)
var litsner = app.listen(Number(process.env.PORT || 8080 ) );
require( "util" ).log( "Starting server at " + litsner.address().port );