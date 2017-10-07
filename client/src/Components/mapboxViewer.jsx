import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';


/*
USAGE:
-Use container div for component to constrict size
-Pass in prop "location" for geocoding
*/

class MapboxViewer extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    /*
     * Possibly move this out to a config file. Leaving it out now in case you don't have
     * a mapbox API key to use.
    */
    mapboxgl.accessToken = 'pk.eyJ1Ijoiamt3b2swNzE0IiwiYSI6ImNqOGM3bDUwNjA3MmgzNG1vaGhzZHFqemMifQ.OHKLWeml1fOhakQisbWnBQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        center: [0, 0],
        zoom: 1
    });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });

    map.addControl(geocoder);
    let self = this;
    map.on('load', function() {
      geocoder.query(self.props.location);
      map.addSource('single-point', {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": []
          }
      });

      map.addLayer({
          "id": "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 3,
              "circle-color": "#C70039"
          }
      });

      // Listen for the `geocoder.input` event that is triggered when a user
      // makes a selection and add a symbol that matches the result.
      geocoder.on('result', function(ev) {
          map.getSource('single-point').setData(ev.result.geometry);
      });
    });
  }

  render () {
  	return (
  		<div style={{width: '600px', height: '300px'}} id="map">
  		</div>
  	);
  }
}

export default MapboxViewer;
