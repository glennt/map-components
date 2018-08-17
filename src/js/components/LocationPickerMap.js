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
  withState('currentLocationValue', 'setCurrentLocationValue', {}),
  withState('places', 'setPlaces', []),
  withState('center', 'setCenter', { lat: -34.397, lng: 150.644 }),
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:'https://www.google.com',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onChangeInternal: props => value =>{

      props.setCurrentLocationValue(value);           
      if(props.onChange) {
        props.onChange(value);
      }
    }
  }),
  withHandlers({
    onClickMap: (props) => event => {
      var latLng = event.latLng;
      var value = {longitude:latLng.lng(), latitude:latLng.lat()}    
      props.setCurrentLocationValue(value);
      props.onChangeInternal(value);
    }  
  }),
  withHandlers({
    onClickMarker: (props) => place => {
      var placeValue = convertGoogleMapPlaceToValue(place);                 
      props.onChangeInternal(placeValue);
    }  
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({

    componentWillMount() {

      const refs = {}

      this.setState({
        bounds: null,       
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

            if(places.length === 1) {
              var place = places[0]

              var latLng = place.geometry.location;
              var latLngObj = {lat: latLng.lat(), lng: latLng.lng()};            

              var placeValue = convertGoogleMapPlaceToValue(place);                    
              this.props.onChangeInternal(placeValue);

              this.props.setPlaces([]);
              this.props.setCenter(latLngObj);

            } else if (places.length > 1) {

              var place = places[0]

              var latLng = place.geometry.location;
              var latLngObj = {lat: latLng.lat(), lng: latLng.lng()};            
      
              this.props.onChangeInternal({});

              this.props.setPlaces(places);
              this.props.setCenter(latLngObj);
            }
        }
      })
    }
}), 
)((props) => {
      
  var currentLocationMarker;
  if(props.currentLocationValue) {
    var currentLocationValue = props.currentLocationValue;
    currentLocationMarker = <Marker position={{lat: currentLocationValue.latitude, lng: currentLocationValue.longitude}} />
  }

  var markers = [];
  if(props.places) {    
    var markers = props.places.map((place, idx) => {
      var location = place.geometry.location;
      return <Marker key={'marker-' + idx} position={{lat: location.lat(), lng: location.lng()}} onClick={(e) => { props.onClickMarker(place) }}/>;
    });
  }

  return(  
    <GoogleMap defaultZoom={8} center={props.center} defaultCenter={{ lat: -34.397, lng: 150.644 }} onClick={props.onClickMap} options={{streetViewControl:false}}>
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
        {currentLocationMarker}
        {markers}
    </GoogleMap>
    )
});

export default LocationPickerMap;

/*eslint-disable no-undef*/