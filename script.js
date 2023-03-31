

const API_KEY = 'fsq3RFdh2SjkpB1E3X1q7Zaje6zFAy2RoPGLAf3660fRnBU=';
const CLIENT_ID = 'V4NVCV3RD5P3NY14ZHTUATP52OT3CJILTL2EC2R4GN1QJQPB';
const CLIENT_SECRET = 'FQPHF0TFZLGUQX1D0DVFID3HLLXVC0PXEAWB1L02HA4ZEPZM';
const API_VERSION = '20220330'; 

const map = L.map('map').setView([36.137375, -79.908159], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const businessTypeSelect = document.getElementById('business-type');

async function getNearbyLocations(lat, lng, businessType) {
    const url = `https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${API_VERSION}&ll=${lat},${lng}&query=${businessType}&limit=5&radius=5000&oauth_token=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.response.venues;
}

function addMarkers(venues) {
    venues.forEach(venue => {
        const latLng = [venue.location.lat, venue.location.lng];
        const marker = L.marker(latLng).addTo(map);
        marker.bindPopup(`<strong>${venue.name}</strong><br>${venue.location.address || ''}`);
    });
}

function addCustomMarkers() {
    const customMarkers = [
        {
            name: 'Starbucks',
            address: '4016 Battleground Ave, Greensboro, NC 27410',
            type: 'coffee',
            lat: 36.132269,
            lng: -79.845740,
        },
        {
            name: 'Greensboro-High Point Marriott Airport',
            address: 'One Marriott Drive, Greensboro, NC 27409',
            type: 'hotel',
            lat: 36.074603,
            lng: -79.958191,
        },
        {
            name: "Rody's Tavern",
            address: '5105 Michaux Road, Greensboro, NC 27410',
            type: 'restaurant',
            lat: 36.133954,
            lng: -79.872179,
        },
        {
            name: 'Harris Teeter',
            address: '4010 Battleground Ave, Greensboro, NC 27410',
            type: 'market',
            lat: 36.132239,
            lng: -79.845836,
        },
    ];
    customMarkers.forEach(markerData => {
        const latLng = [markerData.lat, markerData.lng];
        const marker = L.marker(latLng).addTo(map);
        marker.bindPopup(`<strong>${markerData.name}</strong><br>${markerData.address}`);
    });
}

businessTypeSelect.addEventListener('change', async () => {
    const businessType = businessTypeSelect.value;
    const latLng = map.getCenter();
    const venues = await getNearbyLocations(latLng.lat, latLng.lng, businessType);
    addMarkers(venues);
});

// Set initial location to 5301 N Oaks Dr, Greensboro, NC
map.setView([36.137375, -79.908159], 13);

// Add custom markers for the specified businesses
addCustomMarkers();
