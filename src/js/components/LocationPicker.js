import React, { Component } from 'react';
import LocationPickerMap from './LocationPickerMap';
import {
    Modal,
    Button
} from 'react-bootstrap';
import { getLocationValueString } from '../utils/mapUtils';

class LocationPicker extends Component {
   
  constructor(props) {
      super(props);
      this.state = {
          showMap: false,
          value: {}
      }
      this.showMap = this.showMap.bind(this);
      this.hideMap = this.hideMap.bind(this);      
      this.onChange = this.onChange.bind(this);
  }  
    
  onChange(value) {
      this.setState({value: value});
  }

  showMap() {
        this.setState({showMap: true});
  }

  hideMap() {
        this.setState({showMap: false});
  }

  render() {

    let value = getLocationValueString(this.state.value);

    let modal = <Modal
            show={this.state.showMap}
            onHide={this.hideMap}
            container={this}
            aria-labelledby="contained-modal-title" bsSize="large">
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
                Contained Modal
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="map-modal-body-container">
                    <div className="map-container">
                        <LocationPickerMap onChange={this.onChange}/>
                    </div>
                    <div>
                        <p>Selected Location</p>
                        <p dangerouslySetInnerHTML={{__html:value}}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.hideMap}>Close</Button>
            </Modal.Footer>
        </Modal>

	

    return (
        <div>
            <div>Map Picker</div>
            <div><Button onClick={this.showMap}>Show Map</Button></div>

  

            {modal}
        </div>
    );
  }
}

export default LocationPicker;
