var lat = 0;
var long = 0;
var city =  "City";
var state = "State";



// Sends zip after user input
function geoUserInput() {
    var zipCode = $("#zipCode").val();
    console.log(zipCode);
    if(zipCode != 0) {
        geoCodeRequest(zipCode);
    } else {
        console.log("Not ZERO");
    }
}

// API Requests //


function geoCodeRequest(zipCode){

    var geoCodeRequest = {

        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ zipCode +"&key=AIzaSyA2Q8skYQhVnVaDlSx_L-VEXFvl-dd1e-Q",
        dataType: "json",
        success: geocode_Complete
    };

    $.ajax(geoCodeRequest);

    console.log("Made it to geoCodeRequest post");
}

function geocode_Complete(geoCodeRequest) {

    console.log("Made It to geocode_Complete");

    lat = geoCodeRequest.results[0].geometry.location.lat;
    long = geoCodeRequest.results[0].geometry.location.lng;
    city = geoCodeRequest.results[0].address_components[1].long_name;
    state = geoCodeRequest.results[0].address_components[2].short_name;

    initMap(geocode_Complete);

}

// Completed Functions // 


function initMap() {

    var templateHTML = '<div class="col-md-4 col-xs-12 col-sm-6">';
    templateHTML += '<div class="text-left">';
    templateHTML += "<h1>"+ city + "," + state + "</h1>";
    templateHTML += '<span class="glyphicon glyphicon-minus-sign pull-right" id="remove"></span>';
    templateHTML += '<div id="map"></div>';
    templateHTML += '</div>';
    templateHTML += '</div>';

    $('#topRow').prepend(templateHTML);
    console.log("Made it past append");
    
    
    var uluru = { lat: lat, lng: long };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

    console.log(lat);
    console.log(long);
    console.log("Made it to initMap");

    $("body").on("click", "#remove", function(){
        $(this).parent().remove();
    });
}

    

    function removeCard (){
        console.log("Remove worked!");
        $(this).parent().remove();
    }


// Remove Card from Body


$(function(){

    $("#submit").on("click", geoUserInput);
    $("#zipSubmit").on("click", geoUserInput);


});
