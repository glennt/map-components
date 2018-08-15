/*eslint-disable no-undef*/
import React from 'react';
import Autocomplete from 'react-google-autocomplete';

class AddressSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        address: '',
        errorMessage: '',
        latitude: null,
        longitude: null,
        isGeocoding: false,
      };
    }
  
    
  
    render() {
    
      return (
        <Autocomplete
            style={{width: '90%'}}
            onPlaceSelected={(place) => {
            console.log(place);
            }}
            types={[]}
        />
      )
    }
}
        
        
  
 export default AddressSearch;

/*eslint-disable no-undef*/
