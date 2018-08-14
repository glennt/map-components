import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import { compose, withProps, lifecycle, withState, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import {convertGoogleMapPlaceToValue} from '../utils/mapUtils';

import config from "../config/config";

/*eslint-disable no-undef*/

const LocationPickerMap = compose(
  withState('currentLocation', 'setCurrentLocation', {}),
  withState('currentLocationValue', 'setCurrentLocationValue', {}),
  withState('center', 'setCenter', { lat: -34.397, lng: 150.644 }),
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${config.googleCloud.apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onChangeInternal: props => value =>{

      if(props.onChange) {
        props.onChange(value);
      }
    }
  }),
  withHandlers({
    onClick: (props) => event => {

      var latLng = event.latLng;
      var value = {longitude:latLng.lng(), latitude:latLng.lat()}    
      props.setCurrentLocationValue(value);
      props.setCurrentLocation({lng:latLng.lng(), lat:latLng.lat()});      

      props.onChangeInternal(value);
    }  
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({

    componentWillMount() {

      const refs = {}

      this.setState({
        bounds: null,       
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            
            var place = places[0]

            var latLng = place.geometry.location;
            var latLngObj = {lat: latLng.lat(), lng: latLng.lng()};            

            var placeValue = convertGoogleMapPlaceToValue(place);

            this.props.setCurrentLocationValue(placeValue);
            
            this.props.onChangeInternal(placeValue);

            this.props.setCurrentLocation(latLngObj);        
            this.props.setCenter(latLngObj);
        }
      })
    }
}), 
)((props) => {
      
  return(  
    <GoogleMap defaultZoom={8} center={props.center} defaultCenter={{ lat: -34.397, lng: 150.644 }} onClick={props.onClick} options={{streetViewControl:false}}>
        <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}     
        onPlacesChanged={props.onPlacesChanged}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        >
        <input
            type="text"
            placeholder="Search"
            style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `300px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            }}
        />
        </SearchBox>
        <Marker position={props.currentLocation} />
        
    </GoogleMap>
    )
});

export default LocationPickerMap;

/*eslint-disable no-undef*/