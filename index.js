const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => {
    const searchIp = searchInput.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qZbKRLE4U6S4IxS9ZZA1cADworkXa&ipAddress=${searchIp}`)
        .then( response => response.json() )
        .then( data => {
            console.log(data);
            document.getElementById('ip-address').textContent = data.ip;
            document.getElementById('location').textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
            document.getElementById('timezone').textContent = `UTC ${data.location.timezone}`;
            document.getElementById('isp').textContent = data.isp;
        } );
})