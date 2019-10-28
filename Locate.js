window.onload = function()
{
    const pointInput = document.getElementById( "point-input" );
    const submitButton = document.getElementById( "submit-button" );
    
    pointInput.onkeyup = function( evt )
    {
        console.log( "value has changed to ", evt );
        submitButton.disabled = false;
    }

    submitButton.onclick = function( evt )
    {
        console.log( "submiting value" );
        var xhr = new XMLHttpRequest();
        xhr.open( "POST", "/best-stations" );
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        var params = {
            devices : [  { x:0, y:0 } ]
        };
        xhr.send( JSON.stringify( params ) );
        xhr.onload = function()
        {
            console.log( "some result actually came back" );
            console.log( xhr.response )
        }
    }
    function checkValue( value )
    {
        if( value.indexOf( "," ) > 0 )
        {
            var nums = value.split( "," );
        }   
    }
}