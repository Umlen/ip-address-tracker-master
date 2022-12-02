const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const map = L.map('map');
const customMapMarker = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [22, 28]
});
map.removeControl(map.zoomControl);


searchBtn.addEventListener('click', () => {
    const searchIp = searchInput.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qZbKRLE4U6S4IxS9ZZA1cADworkXa&ipAddress=${searchIp}`)
        .then( response => response.json() )
        .then( data => {
            document.getElementById('ip-address').textContent = data.ip;
            document.getElementById('location').textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
            document.getElementById('timezone').textContent = `UTC ${data.location.timezone}`;
            document.getElementById('isp').textContent = data.isp;
            map.setView( [data.location.lat, data.location.lng], 17 );
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 17,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker( [data.location.lat, data.location.lng], {icon: customMapMarker} ).addTo(map);
        } );
})