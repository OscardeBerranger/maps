document.addEventListener("DOMContentLoaded", ()=>{
    let recording = false
    let lastClicks = []
    var map = L.map('map').setView([45.75, 4.85], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.on('click', onMapClick);


    function onMapClick(e) {
        let marker = L.marker([e.latlng["lat"], e.latlng["lng"]]).addTo(map);
        if (recording === true){
            lastClicks.push({
                "lat": e.latlng["lat"],
                "lng": e.latlng["lng"]
            })
        }
        if (lastClicks.length === 2) {
            recording = false
            findRoute(lastClicks[0], lastClicks[1])
            document.querySelector('#displayable').style.display = "none"
        }
    }


    document.querySelector('#findroute').addEventListener("click", ()=>{
        document.querySelector('#displayable').style.display = "block"
        lastClicks = []
        recording = true;
    })

    function findRoute(a, b) {
        L.Routing.control({
           waypoints:   [
           L.latLng(a["lat"], a["lng"]),
           L.latLng(b["lat"], b["lng"])
           ]
        }).addTo(map);
    }
})

