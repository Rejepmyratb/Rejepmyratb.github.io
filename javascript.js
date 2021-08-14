function buildLocationList(data) {
    data.features.forEach(function(store, i){
      /**
       * Create a shortcut for `store.properties`,
       * which will be used several times below.
      **/
      var prop = store.properties;
  
      /* Add a new listing section to the sidebar. */
      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = "listing-" + data.features[i].properties.id;
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item';
  
      /* Add the link to the individual listing created above. */
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = "link-" + prop.id;
      link.innerHTML = prop.address;
  
      /* Add details to the individual listing. */
      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.city;
      if (prop.phone) {
        details.innerHTML += ' · ' + prop.phoneFormatted;
      }
      if (prop.distance) {
        var roundedDistance = Math.round(prop.distance * 100) / 100;
        details.innerHTML +=
          '<p><strong>' + roundedDistance + ' miles away</strong></p>';
      }
      link.addEventListener('click', function(e){
  for (var i = 0; i < data.features.length; i++) {
    if (this.id === "link-" + data.features[i].properties.id) {
      var clickedListing = data.features[i];
      flyToStore(clickedListing);
      createPopUp(clickedListing);
    }
  }  
  var activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  this.parentNode.classList.add('active');
});
    });
  }

  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
  
  function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
  
    var popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML('<h3>Sweetgreen</h3>' +
        '<h4>' + currentFeature.properties.address + '</h4>')
      .addTo(map);
  }