const map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
    center: [-1.6640206269954552, 48.11552303795284],
    zoom: 11.5,
    scrollZoom: true,
    minZoom: 9,
    maxZoom: 16
  });

// Boutons de navigation
var nav = new maplibregl.NavigationControl();
map.addControl(nav, 'top-left');

// Ajout Echelle cartographique
map.addControl(new maplibregl.ScaleControl({
maxWidth: 120,
unit: 'metric'}));

// Bouton de géolocalisation
map.addControl(new maplibregl.GeolocateControl
({positionOptions: {enableHighAccuracy: true},
trackUserLocation: true,
showUserHeading: true}));


  // Charger le GeoJSON depuis l'URL
fetch('https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/decheteries_plateformes_vegetaux/exports/geojson?lang=fr&timezone=Europe%2FBerlin')
.then(response => response.json())
.then(data => {
  const stores = data; // Utiliser le GeoJSON chargé depuis l'URL
  stores.features.forEach((store, i) => {
    store.properties.id = i;
  });

  map.on('load', () => {
    map.addLayer({
      'id': 'ContourCommune',
      'type': 'line',
      'source': { type: 'geojson', data: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/limites-communales-referentielles-de-rennes-metropole-polylignes/exports/geojson?lang=fr&timezone=Europe%2FBerlin' },
      'layout': { 'visibility': 'visible' },
      "paint": { "line-color": "black", "line-width": 0.5 },
    });
  });
})
.catch(error => console.error('Error fetching GeoJSON:', error));


// Ajouter la couche de polygones "synthese_plui_2021.geojson"
map.on('load', () => {
  map.addLayer({
    'id': 'synthese_plui_2021',
    'type': 'fill',
    'source': {
      type: 'geojson',
      data: 'https://www.data.gouv.fr/fr/datasets/r/1012fe94-088c-4cb7-b353-2996917f9b86'
    },
    'paint': {
      'fill-color': [
        'match',
        ['get', 'typezone'], // Valeur de la colonne "typezone"
        'A',
        '#f7f741',
        'N',
        '#66ae41',
        'AUs',
        '#f98c8a',
        'AUc',
        '#f98c8a',
        'U',
        '#e4433e',
        '#808080' // Autres cas, couleur grise
      ],
      'fill-opacity': 0.7 // opacité du remplissage
    }
  });
});


function switchlayer(layerId) {
  var checkbox = document.getElementById('PLUi');
  if (checkbox.checked) {
      map.setLayoutProperty(layerId, 'visibility', 'visible');
  } else {
      map.setLayoutProperty(layerId, 'visibility', 'none');
  }
}



document.getElementById('Gare').addEventListener('click', function () 
{ map.flyTo({zoom: 16,
           center: [-1.672, 48.1043],
	          pitch: 20,
            bearing: -197.6 });
});