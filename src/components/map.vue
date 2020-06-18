<template>
    <v-col align="center" style="height: 100%;"  md="12" lg="12" xl="12" cols="12" class="py-0 my-0">
        <v-row justify="center" style="height: 100vh;">
            <v-col cols="2" class="pt-0" style="height: 100%; background-color: #1F1F1F; color: #F9F9F9; ">
                <v-row justify="center" align="center" >
                    <v-img src="@/assets/resources/logo.png" max-width="100px"></v-img>
                </v-row>
                <v-row class="Bold pl-1">
                    Localidades
                </v-row>
                <v-row class="Bold">
                    <v-btn @click="reloadPage" style="font-size: 9px" width="100%">Generar nuevos almacenes</v-btn>
                </v-row>
            </v-col>
            <v-col class="pa-0" style="height: 100%" >
                    <div id="mapid"></div>
            </v-col>
            
        </v-row>

        

    </v-col>
</template>

<script>
export default {

    methods: {
        reloadPage(){
            location.reload();
        }
    },

    mounted() {
        var L = window.L;
        // var that = this;
        var mymap = L.map('mapid').setView([21.922769, -102.301567], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

        var user = L.icon({
            iconUrl: 'https://image.flaticon.com/icons/png/512/1946/1946401.png',
            iconSize:     [35, 38], // size of the icon
            iconAnchor:   [18, 10], // point of the icon which will correspond to marker's location
        });

        var storeLocations = 
        [
            {lat: 21.933769, long: -102.304644},
            {lat: 21.924001, long: -102.289873},
            {lat: 21.916714, long: -102.312813},
            {lat: 21.924602, long: -102.318030},
            {lat: 21.924425, long: -102.306345},
        ]

        var marker, marker2, marker3, marker4, marker5; 
        var geocodeService = L.esri.Geocoding.geocodeService();

        marker  = L.marker([storeLocations[0].lat, storeLocations[0].long]).addTo(mymap).on('click', onClick);
        marker.bindPopup("<b>Plaza San Telmo</b>");
        
        marker2  = L.marker([storeLocations[1].lat, storeLocations[1].long]).addTo(mymap).on('click', onClick);
        marker2.bindPopup("<b>Centro Comercial Altaria</b>");

        marker3  = L.marker([storeLocations[2].lat, storeLocations[2].long]).addTo(mymap).on('click', onClick);
        marker3.bindPopup("<b>Sierra Morena</b>");

        marker4  = L.marker([storeLocations[3].lat, storeLocations[3].long]).addTo(mymap).on('click', onClick);
        marker4.bindPopup("<b>Campestre</b>");

        marker5  = L.marker([storeLocations[4].lat, storeLocations[4].long]).addTo(mymap).on('click', onClick);
        marker5.bindPopup("<b>Colosio</b>");

        
        var storageLocations = 
        [
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
        ]
        
        var almacen1, almacen2, almacen3, almacen4, almacen5;
        almacen1  = L.marker([storageLocations[0].lat, storageLocations[0].long], {icon: user}).addTo(mymap).on('click', onClick);
        almacen1.bindPopup("<b>Almacen 1</b>");

        almacen2  = L.marker([storageLocations[1].lat, storageLocations[1].long], {icon: user}).addTo(mymap).on('click', onClick);
        almacen2.bindPopup("<b>Almacen 2</b>");

        almacen3  = L.marker([storageLocations[2].lat, storageLocations[2].long], {icon: user}).addTo(mymap).on('click', onClick);
        almacen3.bindPopup("<b>Almacen 3</b>");

        almacen4  = L.marker([storageLocations[3].lat, storageLocations[3].long], {icon: user}).addTo(mymap).on('click', onClick);
        almacen4.bindPopup("<b>Almacen 4</b>");

        almacen5  = L.marker([storageLocations[4].lat, storageLocations[4].long], {icon: user}).addTo(mymap).on('click', onClick);
        almacen5.bindPopup("<b>Almacen 5</b>"); 
        
        var distances = []
        
        for(var i = 0; i < storeLocations.length; i++)
        {
            distances[i] = new Array(storageLocations.length);
            for(var j = 0; j < storageLocations.length; j++ )
            {
                distances[i][j] = distance(storeLocations[i].lat, storeLocations[i].long, storageLocations[j].lat, storageLocations[j].long, 'K' )
            }
        }
        console.log(distances)
        console.log("KM", distance(storeLocations[0].lat, storeLocations[0].long, storageLocations[0].lat, storageLocations[0].long, 'K' ));


        function distance(lat1, lon1, lat2, lon2, unit) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return parseFloat(dist.toFixed(2));
            }
        }

        function randomLat() {
            var lat = 0;
            lat = Math.random() * (21.952586 - 21.849286) + 21.849286;
            return lat;
        }

        function randomLong() {
            var lat = 0;
            lat = (Math.random() * (102.347645 - 102.260167) + 102.260167) * -1;
            return lat;
        }

        function onClick(e) {
            console.log(e);
            geocodeService.reverse().latlng(this.getLatLng()).run(function (error, result) {
            if (error) {
                return;
            }
            console.log(result.address)
            // that.address = result.address.LongLabel;
            // that.clicked = true;
            // console.log(that.address);
            });
        }

    }

}
</script>

<style scoped>
    #mapid { height: 100%;}

    .slide-fade-enter-active {
    transition: all 1s ease;
    }
    .slide-fade-leave-active {
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(100px);
    opacity: 0;
    }

    .Bold {
        font-family: 'Work Sans', sans-serif; 
        font-weight:600;
    }

    .Regular {
        font-family: 'Work Sans', sans-serif; 
        font-weight:400;
    }

    .Thin {
        font-family: 'Work Sans', sans-serif; 
        font-weight:300;
    }

    .buttonLower{
        text-transform: none !important;
    }


</style>