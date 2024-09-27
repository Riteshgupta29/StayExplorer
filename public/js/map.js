
  mapboxgl.accessToken = mapToken ;
    const map = new mapboxgl.Map({
        container: 'map',
        style: "mapbox://styles/mapbox/streets-v12",
        zoom: 8,
        center: listing.geometry.coordinates
     
    });
 const marker = new mapboxgl.Marker({
        color: "#fe424d"
        }).setLngLat(listing.geometry.coordinates)
        .addTo(map);
    
    
