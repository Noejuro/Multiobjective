<template>
    <v-col align="center" style="height: 100%;"  md="12" lg="12" xl="12" cols="12" class="py-0 my-0">
        <v-row justify="center" style="height: 100vh;">
            <v-col class="pt-0" style="height: 100%; background-color: #1F1F1F; color: #F9F9F9; max-width: 230px;">
                <v-row justify="center" align="center" >
                    <v-img src="@/assets/resources/logo.png" max-width="100px"></v-img>
                </v-row>
                <v-row class="Bold">
                    <v-btn @click="reloadPage" style="font-size: 10px" tile width="100%">Generar nuevos almacenes</v-btn>
                </v-row>
                <v-row class="Light pl-1 pt-8">
                    Gasto minimizado:
                </v-row>
                <v-row class="Bold pl-3" style="font-size: 14px">
                    {{min}}
                </v-row>
                <v-row class="Light pl-1">
                    Ganancia maximizada:
                </v-row>
                <v-row class="Bold pl-3" style="font-size: 14px">
                    {{max}}
                </v-row>
                <v-row class="Bold pt-8">
                    <v-btn @click="start" :disabled="disabled" tile style="font-size: 12px" width="100%">Iniciar</v-btn>
                </v-row>
                <v-row class="Light pl-1 pt-8" justify="start" style="text-align: start">
                    Puedes dar click en cada marcador para observar el nombre de la tienda o el numeo del almacen.
                </v-row>
            </v-col>
            <v-col class="pa-0" style="height: 100%" >
                    <div id="mapid"></div>
            </v-col>
            
        </v-row>

        <v-snackbar v-model="snackbar"  color="success" top timeout="6000">
            <v-row justify="center">
                Esta es la opción obtenida del AG
            </v-row>
            <v-row justify="center" style="font-size: 13px" >
                Si deseas una nueva solución presiona en el boton de nuevos almacenes
            </v-row>
        </v-snackbar>

        

    </v-col>
</template>

<script>
export default {

    data() {
        return {
            min: 0,
            max: 0,
            inicio: false,
            L: null,
            mymap: null,
            storeLocations: null,
            storageLocations: null,
            almacen1: null, almacen2: null, almacen3: null, almacen4: null, almacen5: null, 
            disabled: false,
            snackbar: false,
        }
    },

    mounted() {
        var that = this;
        that.L = window.L;
        that.mymap = that.L.map('mapid').setView([21.889094, -102.298301], 13);
        that.L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(that.mymap);

        var cooffe = that.L.icon({
            iconUrl: 'https://cdn.glitch.com/ab6ba3e3-64bd-4c28-b7e1-9fa92931b067%2Flogo.png?v=1592498333294',
            iconSize:     [45, 48], // size of the icon
            iconAnchor:   [23, 10], // point of the icon which will correspond to marker's location
        });

        var user = that.L.icon({
                iconUrl: 'https://cdn.glitch.com/ab6ba3e3-64bd-4c28-b7e1-9fa92931b067%2Ficons8-warehouse-100.png?v=1592498893779',
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
            {lat: 21.839207, long: -102.289491},
            {lat: 21.874790, long: -102.303409},
            {lat: 21.880527, long: -102.261486}
        ]
        that.storeLocations = storeLocations;
        var marker, marker2, marker3, marker4, marker5, marker6, marker7, marker8; 
        var geocodeService = that.L.esri.Geocoding.geocodeService();
        marker  = that.L.marker([storeLocations[0].lat, storeLocations[0].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker.bindPopup("<b>Plaza San Telmo</b>");
        
        marker2  = that.L.marker([storeLocations[1].lat, storeLocations[1].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker2.bindPopup("<b>Centro Comercial Altaria</b>");

        marker3  = that.L.marker([storeLocations[2].lat, storeLocations[2].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker3.bindPopup("<b>Sierra Morena</b>");

        marker4  = that.L.marker([storeLocations[3].lat, storeLocations[3].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker4.bindPopup("<b>Campestre</b>");

        marker5  = that.L.marker([storeLocations[4].lat, storeLocations[4].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker5.bindPopup("<b>Colosio</b>");

        marker6  = that.L.marker([storeLocations[5].lat, storeLocations[5].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker6.bindPopup("<b>Plaza Vestir</b>");

        marker7  = that.L.marker([storeLocations[6].lat, storeLocations[6].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker7.bindPopup("<b>Hotel One</b>");

        marker8  = that.L.marker([storeLocations[7].lat, storeLocations[7].long], {icon: cooffe}).addTo(that.mymap).on('click', onClick);
        marker8.bindPopup("<b>Plaza Espacio</b>");


        var storageLocations = 
        [
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
        ]

        that.storageLocations = storageLocations;

        var almacen1, almacen2, almacen3, almacen4, almacen5;
        almacen1  = that.L.marker([storageLocations[0].lat, storageLocations[0].long], {icon: user}).addTo(that.mymap).on('click', onClick);
        almacen1.bindPopup("<b>Almacen 1</b>");

        almacen2  = that.L.marker([storageLocations[1].lat, storageLocations[1].long], {icon: user}).addTo(that.mymap).on('click', onClick);
        almacen2.bindPopup("<b>Almacen 2</b>");

        almacen3  = that.L.marker([storageLocations[2].lat, storageLocations[2].long], {icon: user}).addTo(that.mymap).on('click', onClick);
        almacen3.bindPopup("<b>Almacen 3</b>");

        almacen4  = that.L.marker([storageLocations[3].lat, storageLocations[3].long], {icon: user}).addTo(that.mymap).on('click', onClick);
        almacen4.bindPopup("<b>Almacen 4</b>");

        almacen5  = that.L.marker([storageLocations[4].lat, storageLocations[4].long], {icon: user}).addTo(that.mymap).on('click', onClick);
        almacen5.bindPopup("<b>Almacen 5</b>"); 

        that.almacen1 = almacen1; that.almacen2 = almacen2; that.almacen3 = almacen3; that.almacen4 = almacen4; that.almacen5 = almacen5;

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
            error = result;
            // console.log(result.address)
            // that.address = result.address.LongLabel;
            // that.clicked = true;
            // console.log(that.address);
            });
            }        
    },

    methods: {
        reloadPage(){
            location.reload();
        },
        start() {
            this.snackbar = true;
            this.disabled = true;
            var that = this;
            var mymap = that.mymap;

            var storeLocations = that.storeLocations;

            var distances = [], distancesCost = [], poblation = [], connections = [] ;  

            var storeCost = [19250, 28500, 20000, 23250, 20000, 21750, 16400, 24800];
            var storeProfits = [38500, 57000, 40000, 46500, 40000, 43000, 32800, 48000]
            
            var storageLocations = that.storageLocations;
            
            var storageCost = [30000, 38350, 22200, 41550, 26000];
            var Cij = 0, Fij = 0, min1 = 0, max1 = 0, min2 = 0, max2 = 0;

        

       
        main();

        function main()
        {
            // mymap.addLayer(that.almacen1)
            // mymap.addLayer(that.almacen2)
            // mymap.addLayer(that.almacen3)
            // mymap.addLayer(that.almacen4)
            // mymap.addLayer(that.almacen5)
            poblationGenerator();
            genetic();
            var best = getBetter();
            console.log(best);
            if(best[0] == 0)
                mymap.removeLayer(that.almacen1)
            if(best[1] == 0)
                mymap.removeLayer(that.almacen2)
            if(best[2] == 0)
                mymap.removeLayer(that.almacen3)
            if(best[3] == 0)
                mymap.removeLayer(that.almacen4)
            if(best[4] == 0)
                mymap.removeLayer(that.almacen5)
        }
        

         function poblationGenerator()
        {
            //Poblation Generator
            for(var x = 0; x < 30; x++)
            {
                poblation[x] = new Array(5)
                for(var y = 0; y < 5; y++)
                {
                    poblation[x][y] = Math.round(Math.random());
                }
            }            
        }


        //Method to get connections of closest available storage for every store
        
        function genetic()
        {
            for(var generaciones = 0; generaciones < 150; generaciones ++)
            {
                // console.log("Generation: ", generaciones)
                var selectedIndex1 = 0, selectedIndex2 = 0, son = [];     
                for(var g = 0; g < 20; g++)
                {
                    selectedIndex1 = Math.floor(Math.random() * 30);
                    selectedIndex2 = Math.floor(Math.random() * 30);
                    // console.log(g, selectedIndex1, selectedIndex2)
                    // console.log("Cromosoma 1:", poblation[selectedIndex1]);
                    getDistances(poblation[selectedIndex1]);
                    getConnections(poblation[selectedIndex1]);
                    getZ1_1(poblation[selectedIndex1]);
                    getZ2_1();
                    // console.log("Cromosoma 2:", poblation[selectedIndex2]);
                    distances = []; distancesCost = [], connections = [];
                    //Cruce
                    if(Math.floor(Math.random() * 100) + 1 <= 80)
                    {
                        // console.log("CRUCE");
                        son = poblation[selectedIndex1].slice(0, 3).concat(poblation[selectedIndex2].slice(3, 5));
                        //Mutación bit por bit
                        for(var m = 0; m < poblation[selectedIndex1].length; m++)
                        {
                            if(Math.floor(Math.random() * 100) + 1 <= 5)
                            {
                                // console.log("MUTACION")
                                if(son[m] == 0) son[m] = 1; 
                                else son[m] = 0;
                            }
                        }
                        // console.log("Son", son);
                        getDistances(son);
                        getConnections(son);
                        getZ1_2(son);
                        getZ2_2();
                        if(min2 < min1 && max2 > max1)
                        {
                            // console.log("CAMBIO DE CROMOSOMA");
                            poblation[selectedIndex1] = son;
                        }
                    }
                    
                }
            }
        }
        
        function getBetter()
        {
            var bestZ1 = 0; var bestZ2 = 0; var bestOption = [];
            min1 = 0; max1 = 0; min2 = 0; max2 = 0;

            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 1
            })

            getDistances(poblation[0]);
            getConnections(poblation[0]);
            getZ1_1(poblation[0]);
            getZ2_1();
            bestZ1 = min1; bestZ2 = max1;
            console.log(min1, max1)
            bestOption = poblation[0];
            that.min = formatter.format(min1.toFixed(0)); that.max = formatter.format(max1.toFixed(0));
            for(var b = 1; b < poblation.length; b++)
            {
                getDistances(poblation[b]);
                getConnections(poblation[b]);
                getZ1_2(poblation[b]);
                getZ2_2();
                if(min2 < bestZ1 && max2 > bestZ2)
                {
                    console.log("MEJOR")
                    console.log(min2, max2)
                    bestZ1 = min2; bestZ2 = max2;
                    that.min = formatter.format(min2.toFixed(0)); that.max = formatter.format(max2.toFixed(0));
                    bestOption = poblation[b];
                }
            }
            return bestOption;
        }


        function getDistances(crom) {
            //Get distances between available storage and every store, also gets Distance cost    
            for(var i = 0; i < storeLocations.length; i++)
            {
                distances[i] = new Array(storageLocations.length);
                distancesCost[i] = new Array(storageLocations.length);
                for(var j = 0; j < storageLocations.length; j++ )
                {
                    if(crom[j] == 1)
                    {
                        distances[i][j] = distance(storeLocations[i].lat, storeLocations[i].long, storageLocations[j].lat, storageLocations[j].long, 'K' )
                        distancesCost[i][j] = parseFloat((distances[i][j] * 0.8 * 55).toFixed(1));
                    }
                    else 
                    {
                        distances[i][j] = 1000
                        distancesCost[i][j] = 1000
                    }
                }
            }
        }
       
        function getConnections(crom)
        {
            
            for(var i = 0; i < storeLocations.length; i++)
            {
                connections[i] = new Array(storageLocations.length);
                for(var j = 0; j < storageLocations.length; j++ )
                {
                    connections[i][j] = 0
                }
                if(crom[distances[i].indexOf(Math.min(...distances[i]))] == 1)
                    connections[i][distances[i].indexOf(Math.min(...distances[i]))] = 1;
                // console.log("Connections", i, distances[i].indexOf(Math.min(...distances[i])));
            }
            // console.log("Connections Array", connections)
        }


        //Get minimize param
        function getZ1_1(crom)
        {
            Cij = 0; Fij = 0; min1 = 0;
            for(var i = 0; i < storeLocations.length; i++)
            {
                for(var j = 0; j < storageLocations.length; j++ )
                {
                    Cij+= (distancesCost[i][j]+storeCost[i])*connections[i][j];
                }
            }
            for(var x = 0; x < storageLocations.length; x++)
            {
                Fij += storageCost[x]*crom[x];
            }
            min1 = Cij + Fij;
            // console.log("Z1_1:", min1.toFixed(0));
        }

        function getZ2_1()
        {
            max1 = 0;
            for(var i = 0; i < storeLocations.length; i++)
            {
                for(var j = 0; j < storageLocations.length; j++ )
                {
                    max1 += (storeProfits[i] - distancesCost[i][j])*connections[i][j];
                }
            }
            // console.log("Z2_1:", max1.toFixed(0));
        }

        function getZ1_2(crom)
        {
            Cij = 0; Fij = 0; min2 = 0;
            for(var i = 0; i < storeLocations.length; i++)
            {
                for(var j = 0; j < storageLocations.length; j++ )
                {
                    Cij+= (distancesCost[i][j]+storeCost[i])*connections[i][j];
                }
            }
            for(var x = 0; x < storageLocations.length; x++)
            {
                Fij += storageCost[x]*crom[x];
            }
            min2 = Cij + Fij;
            // console.log("Z1_2:", min2.toFixed(0));
        }

        function getZ2_2()
        {
            max2 = 0;
            for(var i = 0; i < storeLocations.length; i++)
            {
                for(var j = 0; j < storageLocations.length; j++ )
                {
                    max2 += (storeProfits[i] - distancesCost[i][j])*connections[i][j];
                }
            }
            // console.log("Z2_2:", max2.toFixed(0));
        }


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
    },

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