window.onload = function () {
    const pointX = document.getElementById("point-x");
    const pointY = document.getElementById("point-y");
    const submitButton = document.getElementById("submit-button");

    showExamples();

    pointX.onkeyup = checkValue;
    pointX.onchange = checkValue;
    pointY.onkeyup = checkValue;
    pointY.onchange = checkValue;

    submitButton.onclick = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/best-stations");
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        var x = pointX.value;
        var y = pointY.value;
        var params = {
            devices: [{ x: x, y: y }]
        };
        xhr.send(JSON.stringify(params));
        xhr.onload = function () {
            var res = JSON.parse(xhr.response);
            res = res[0];
            var str = "";
            if( res.bestStations.length > 0 )
            {
                str = "The best location for device at " + x + "," + y + " is " + res.bestStations[0].x + "," + res.bestStations[0].y + " with reach " + res.bestStations[0].r;
            }
            else
            {
                str = "No link station whithin reach for point" + x + "," + y;
            }
            document.getElementById("results").innerHTML = str;
        }
    }
    function showExamples() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/best-stations");
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.send(JSON.stringify());
        xhr.onload = function () {
            var str = "";
            var results = JSON.parse( xhr.response );
            for (var i = 0; i < results.length; i++) {
                var current = results[i];
                if (current.bestPower == 0) {
                    str += "No link station whithin reach for point " + current.device.x + ", " + current.device.y + "<br/>";
                }
                else {
                    str += "Best link station for point " + current.device.x + "," + current.device.y + " is " + current.bestStations[0].x + "," + current.bestStations[0].y + " with power " + current.bestPower + "<br/>";
                }
            }
            document.getElementById( "example-result" ).innerHTML = str;
        }
    }
    function checkValue() {
        if (pointY.value.length > 0 && pointX.value.length > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
}