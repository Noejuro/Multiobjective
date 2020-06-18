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
                    <v-btn @click="reloadPage" style="font-size: 9px" max-width="100%">Generar nuevos almacenes</v-btn>
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
            iconAnchor:   [22, 35], // point of the icon which will correspond to marker's location
            // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        var marker, marker2, marker3, marker4, marker5; 
        var geocodeService = L.esri.Geocoding.geocodeService();

        marker  = L.marker([21.933769, -102.304644]).addTo(mymap).on('click', onClick);
        marker.bindPopup("<b>Plaza San Telmo</b>");
        
        marker2  = L.marker([21.924001, -102.289873]).addTo(mymap).on('click', onClick);
        marker2.bindPopup("<b>Centro Comercial Altaria</b>");

        marker3  = L.marker([21.916714, -102.312813]).addTo(mymap).on('click', onClick);
        marker3.bindPopup("<b>Sierra Morena</b>");

        marker4  = L.marker([21.924602, -102.318030]).addTo(mymap).on('click', onClick);
        marker4.bindPopup("<b>Campestre</b>");

        marker5  = L.marker([21.924425, -102.306345]).addTo(mymap).on('click', onClick);
        marker5.bindPopup("<b>Colosio</b>");

        var almacen1, almacen2, almacen3, almacen4, almacen5;
        almacen1  = L.marker([randomLat(), randomLong()], {icon: user}).addTo(mymap).on('click', onClick);
        almacen1.bindPopup("<b>Almacen 1</b>");

        almacen2  = L.marker([randomLat(), randomLong()], {icon: user}).addTo(mymap).on('click', onClick);
        almacen2.bindPopup("<b>Almacen 2</b>");

        almacen3  = L.marker([randomLat(), randomLong()], {icon: user}).addTo(mymap).on('click', onClick);
        almacen3.bindPopup("<b>Almacen 3</b>");

        almacen4  = L.marker([randomLat(), randomLong()], {icon: user}).addTo(mymap).on('click', onClick);
        almacen4.bindPopup("<b>Almacen 4</b>");

        almacen5  = L.marker([randomLat(), randomLong()], {icon: user}).addTo(mymap).on('click', onClick);
        almacen5.bindPopup("<b>Almacen 5</b>");   
        
        createStorages();

        // location  = L.marker([21.922769, -102.301567], {icon: user}).addTo(mymap);
        // location.openPopup();

        function createStorages() {
            console.log("Clicked!");
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