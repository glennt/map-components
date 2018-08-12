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

import config from "../config/config";

/*eslint-disable no-undef*/

const Location = compose(
  withState('currentLocation', 'setCurrentLocation', {}),
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
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onClick: props => event => {
      props.setCurrentLocation({lat:event.latLng.lat(), lng:event.latLng.lng()});      
    },
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
            console.log("Search box mounted");
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

            var place = places[0]

            var latLng = place.geometry.location;
            var latLngObj = {lat: latLng.lat(), lng: latLng.lng()};            
            this.props.setCurrentLocation(latLngObj);        
            this.props.setCenter(latLngObj);
        }
      })
    }
}), 
)((props) => {    
  return(  
    <GoogleMap defaultZoom={8} center={props.center} defaultCenter={{ lat: -34.397, lng: 150.644 }} onClick={props.onClick} streetViewControl={false}>
        <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}     
        onPlacesChanged={props.onPlacesChanged}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        >
        <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
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

export default Location;

/*eslint-disable no-undef*/