// This is the mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWgtc21pdGgiLCJhIjoiY2xkbTJnNHF5MDMydDN1bXkzMmx1ZGNnOCJ9.zEfxmdj0xwfKLLJge5TRyQ';
   
const map = new mapboxgl.Map({ //constant variable //inserts a mapbox map 
  container: 'map', // div container ID for map
  style: 'mapbox://styles/sarah-smith/cle37ogul002c01leg091lvdn', //  link to style URL from mapbox
  center: [-78.450,45.803, ], // starting position [longitude, latitude]
 zoom: 7 // starting zoom

 });
  
 map.on('load', () => { //event function 
  //Adds data source 
  map.addSource('provincial-parks', { // source ID
    'type': 'vector',//data type
    'url': 'mapbox://sarah-smith.8kslmlkz' // tileset link from mapbox
    });
    //adds layer from source 
    map.addLayer({
    'id': 'parks', //layer id
    'type': 'fill', //data geometry type (fill for polygon)
    'source': 'provincial-parks', // source ID from addSource method
    'paint': {
    'fill-color': '#006600',//colour of polygons
    'fill-opacity': 0.4,//transparency of colour fill
    'fill-outline-color': 'black'//outline of polygon colour
    },
    'source-layer': 'Provincial_park_regulated-dp6k9l' //name of layer from mapbox tileset page
    },
    );
    //adds data source 
    map.addSource('fishing', { // source ID
      'type': 'vector', //data type
      'url': 'mapbox://sarah-smith.ahlpu8cf' // tileset link from mapbox
      });
    //adds layer from source
      map.addLayer({
      'id': 'stocking-data',//layer id
      'type': 'circle',//data geometry type
      'source': 'fishing', //source ID from addSource method
      'paint': {
          'circle-color': [
        'step', 
       ['get', 'Number_of_Fish_Stocked'], //Calls a variable in the table on mapbox
        '#AABFF0', //colour assigned to first category 
        100, '#8398DC', 
        500, '#6475C3',
        1000, '#5A599F',
        5000, '#503D7B',
        10000, '#472F6E',
        50000, '#2B1145',
      
      ]},
     
      'source-layer': 'Fish_Stocking_Data_for_Recrea-cuwufu' //name of layer from mapbox tileset page
      },
      )});

// ----------------------------------
// MAP CONTROLS
// ------------------------------
    // Adds the geocode control to the map.
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  })
  );
  map.addControl(new mapboxgl.NavigationControl());

  //Add fullscreen option to the map
  map.addControl(new mapboxgl.FullscreenControl());


/*--------------------------------------------------------------------
Point pop up WINDOWS
--------------------------------------------------------------------*/
// Point Pop-ups
map.on('mouseenter', 'stocking-data', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over provterr-fill layer
});

map.on('mouseleave', 'stocking-data', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves provterr-fill layer
    //map.setFilter("provterr-hl",['==', ['get', 'PRUID'], '']);
});


map.on('click', 'stocking-data', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML("<b>Fish Stocked</b> " + "<br>" +
            "Count: " + e.features[0].properties.Number_of_Fish_Stocked + "<br>"+ "Lake: " + 
            e.features[0].properties.Official_Waterbody_Name) //Use click event properties to write text for popup
        .addTo(map); //Show popup on map
})

// Province pop up
map.on('mouseenter', 'parks', () => {
  map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over provterr-fill layer
});

map.on('mouseleave', 'parks', () => {
  map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves provterr-fill layer
  //map.setFilter("provterr-hl",['==', ['get', 'PRUID'], '']);
});

map.on('click', 'parks', (e) => {
  new mapboxgl.Popup() //Declare new popup object on each click
      .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
      .setHTML("<b>Provincial Park</b> " + "<br>" +
          "Name: " + e.features[0].properties.CLUSTER_NAME) //Use click event properties to write text for popup
      .addTo(map); //Show popup on map

})
// CHANGE VISUALIZATION----------
// Changes colour of parks layer on click
map.on('click', 'parks', (e) => {map.setPaintProperty('parks', 'fill-color', '#FFA500')
}); 





