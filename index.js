const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
let map = undefined;

renderUserAddress();
searchBtn.addEventListener( 'click', getIpFromApi );

function renderUserAddress() {
    fetch(`https://api.ipify.org?format=json`)
    .then( response => response.json() )
    .then( data => {
        searchInput.value = data.ip;
        getIpFromApi();
    } );
}

function getIpFromApi() {
    searchValue = searchInput.value;
    if ( ipValidator(searchValue) ) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qZbKRLE4U6S4IxS9ZZA1cADworkXa&ipAddress=${searchValue}`)
        .then( response => response.json() )
        .then( data => {
            renderInfo(data);
            renderMap(data);
        } );
    } else {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qZbKRLE4U6S4IxS9ZZA1cADworkXa&domain=${searchValue}`)
        .then( response => response.json() )
        .then( data => {
            renderInfo(data);
            renderMap(data);
        } );
    }
}

function ipValidator(ip) {
    const regExp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if ( regExp.test(ip) ) {
       ipArr = ip.split('.');
       for (let i = 0; i < ipArr.length; i++) {
        if (ipArr[i] > 255) {
            return false;
        }
       }
    } else {
        return false;
    }
    return true;
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