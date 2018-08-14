import React, { Component } from 'react';
import LocationPickerMap from './LocationPickerMap';
import {
    Modal,
    Button
} from 'react-bootstrap';

class LocationPicker extends Component {
   
  constructor(props) {
      super(props);
      this.state = {
          showMap: false
      }
      this.showMap = this.showMap.bind(this);
      this.hideMap = this.hideMap.bind(this);      
  }  
    
  showMap() {
        console.log('show map');
        this.setState({showMap: true});
  }

  hideMap() {
        this.setState({showMap: false});
  }

  render() {

    var modal;

 
        modal = <Modal
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
                <div className="map-container">
                    <LocationPickerMap />
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
