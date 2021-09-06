class Map {
    constructor(id, city, latitude, longitude) {
        this.id = id;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.nomDeStation = document.getElementById("nomStation");
        this.adresseStation = document.getElementById("adresseStation");
        this.capaciteVelos = document.getElementById("capaciteVelos");
        this.velosDisponibles = document.getElementById("velosDisponibles");
        this.etatStation = document.getElementById("etatStation");



        // Créer la map de la ville choisie (via tuto Leaflet)
        this.mymap = L.map(this.id).setView([this.latitude, this.longitude], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xhdmlhbGUiLCJhIjoiY2tvZTRvMWtjMDU1djJ1cDc0ZGV4dnh4eSJ9.Wuywj3JGCmagvax4UJ7pDw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiY2xhdmlhbGUiLCJhIjoiY2tvZTRvMWtjMDU1djJ1cDc0ZGV4dnh4eSJ9.Wuywj3JGCmagvax4UJ7pDw'
        }).addTo(this.mymap);


        // Définir les différents marqueurs
        this.greenIcon = L.icon({iconUrl: "images/marker/marker-icon-green.png"});
        this.orangeIcon = L.icon({iconUrl: "images/marker/marker-icon-orange.png"});
        this.redIcon = L.icon({iconUrl: "images/marker/marker-icon-red.png"});
        this.customIcon;

        this.recevoirStations();
    }


    recevoirStations() {
        fetch("https://api.jcdecaux.com/vls/v3/stations?contract=" + this.city + "&apiKey=b3b366d65c53bab390993c92ac77fadd98d52979")
        
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((value) => {
            let stations = value;
            stations.forEach(station => {

                // Choix de la couleur du marqueur selon les disponibilités de vélos
                if ((station.status === "CLOSED")||(station.totalStands.availabilities.bikes === 0)) {
                    this.customIcon = this.redIcon;
                } else if ((station.status === "OPEN") && (station.totalStands.availabilities.bikes <= 5 )){
                    this.customIcon = this.orangeIcon;
                } else {
                    this.customIcon = this.greenIcon;
                }
                
                // Afficher les marqueurs sur la carte
                this.marker = L.marker([station.position.latitude, station.position.longitude], {icon: this.customIcon}).addTo(this.mymap).bindPopup(station.name);
                
                // Afficher les informations de la station lors du clic
                this.marker.addEventListener("click", () => {
                    
                    this.nomDeStation.innerHTML = "Nom de la station : " + station.name ;
                    this.adresseStation.innerHTML = "Adresse : " + station.address;
                    this.capaciteVelos.innerHTML = "Total de vélos : " + station.totalStands.capacity;
                    this.velosDisponibles.innerHTML = "Nombre de vélos disponibles : " + station.totalStands.availabilities.bikes;

                    if (station.status === "OPEN"){
                        this.etatStation.innerHTML = "État : OUVERTE";
                    } 
                    else {
                        this.etatStation.innerHTML = "État : FERMÉE";
                        
                    }
                })
            })
        })
        .catch((err) => {
            console.log(err);
        });

    }
};

var carte1 = new Map("carte", "Nantes", 47.218371, -1.553621);

