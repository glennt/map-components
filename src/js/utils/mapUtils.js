import _ from 'lodash';

export function convertGoogleMapPlaceToValue(place) {

    var value = {};

    var addressComponents = {};

    _.each(place.address_components, (addressComponent) => {
        addressComponents[addressComponent.types[0]] = addressComponent.long_name;
    });

    value.address_components = addressComponents;

    if(place.formatted_address) value.address = place.formatted_address;
    if(place.name) value.name = place.name;


    var lngLat = place.geometry.location;
    
    value.longitude = lngLat.lng();
    value.latitude = lngLat.lat();


    return value;
}

export function getLocationValueString(location) {
    let value = '';
    if (locatoin.hasOwnProperty("name") && location.hasOwnProperty("address")) {
        value = location.name + "<br/>" + location.address;
    } else if (location.hasOwnProperty("address")) {
        value = location.address;
    } else if (location.hasOwnProperty("name")) {
        value = location.name;
    } else if (location.hasOwnProperty("latitude")) {
        value = "Latitude: " + location.latitude + "<br/>Longitude: " + location.longitude;
    } else if (location !== "") {
        //value = stateValue + "";
    } else {
        value = "No location";
    }

    return value;
}