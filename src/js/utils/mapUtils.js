import _ from 'lodash';

export function convertGoogleMapPlaceToValue(place) {

    var value = {};

    var addressComponents = {};

    _.each(place.address_components, (addressComponent) => {
        addressComponents[addressComponent.types[0]] = addressComponent.long_name;
    });

    value['address_components'] = addressComponents;

    if(place.formatted_address) value.address = place.formatted_address;
    if(place.name) value.name = place.name;


    var lngLat = place.geometry.location;
    
    value.longitude = lngLat.lng();
    value.latitude = lngLat.lat();


    return value;
}

export function getPlaceValueString(placeValue) {
    let value = '';
    if (placeValue.hasOwnProperty("name") && placeValue.hasOwnProperty("address")) {
        value = placeValue.name + "<br/>" + placeValue.address;
    } else if (placeValue.hasOwnProperty("address")) {
        value = placeValue.address;
    } else if (placeValue.hasOwnProperty("name")) {
        value = placeValue.name;
    } else if (placeValue.hasOwnProperty("latitude")) {
        value = "Latitude: " + placeValue.latitude + "<br/>Longitude: " + placeValue.longitude;
    } else if (placeValue !== "") {
        //value = stateValue + "";
    } else {
        value = "No location";
    }

    return value;
}