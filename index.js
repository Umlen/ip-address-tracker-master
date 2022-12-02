const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
let map = undefined;

searchBtn.addEventListener( 'click', getIpFromApi );

function getIpFromApi() {
    searchIp = searchInput.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qZbKRLE4U6S4IxS9ZZA1cADworkXa&ipAddress=${searchIp}`)
        .then( response => response.json() )
        .then( data => {
            renderInfo(data);
            renderMap(data);
        } );
}

function renderInfo(ipDataObj) {
    document.getElementById('ip-address').textContent = ipDataObj.ip;
    document.getElementById('location').textContent = `${ipDataObj.location.city}, ${ipDataObj.location.region} ${ipDataObj.location.postalCode}`;
    document.getElementById('timezone').textContent = `UTC ${ipDataObj.location.timezone}`;
    document.getElementById('isp').textContent = ipDataObj.isp;
}

function renderMap(ipDataObj) {
    if (!map) {
        map = L.map('map');
    }
    map.removeControl(map.zoomControl);
    map.setView( [ipDataObj.location.lat, ipDataObj.location.lng], 17 );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const customMapMarker = L.icon({
        iconUrl: '/images/icon-location.svg',
        iconSize: [22, 28]
    });
    L.marker( [ipDataObj.location.lat, ipDataObj.location.lng], {icon: customMapMarker} ).addTo(map);
}