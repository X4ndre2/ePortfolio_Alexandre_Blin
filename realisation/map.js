const map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
    center: [-1.6640206269954552, 48.11552303795284],
    zoom: 10,
    scrollZoom: true,
    minZoom: 9,
    maxZoom: 11
  });

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
      'id': 'SourceVelo',
      'type': 'line',
      'source': { type: 'geojson', data: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/limites-communales-referentielles-de-rennes-metropole-polylignes/exports/geojson?lang=fr&timezone=Europe%2FBerlin' },
      'layout': { 'visibility': 'visible' },
      "paint": { "line-color": "grey", "line-width": 1 }
    });

  });
})
.catch(error => console.error('Error fetching GeoJSON:', error));
