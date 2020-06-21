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
        },
    },

    mounted() {
        var L = window.L;
        // var that = this;
        var mymap = L.map('mapid').setView([21.889094, -102.298301], 13);
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
            iconUrl: 'https://cdn.glitch.com/ab6ba3e3-64bd-4c28-b7e1-9fa92931b067%2Ficons8-warehouse-100.png?v=1592498893779',
            iconSize:     [35, 38], // size of the icon
            iconAnchor:   [18, 10], // point of the icon which will correspond to marker's location
        });

        var cooffe = L.icon({
            iconUrl: 'https://cdn.glitch.com/ab6ba3e3-64bd-4c28-b7e1-9fa92931b067%2Flogo.png?v=1592498333294',
            iconSize:     [45, 48], // size of the icon
            iconAnchor:   [23, 10], // point of the icon which will correspond to marker's location
        });

        var distances = [], distancesCost = [], poblation = [], connections = [] ;

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

        var storeCost = [19250, 28500, 20000, 23250, 20000, 21750, 16400, 24800];
        var storeProfits = [38500, 57000, 40000, 46500, 40000, 43000, 32800, 48000]
        
        var storageLocations = 
        [
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
            {lat: randomLat(), long: randomLong()},
        ]
        var storageCost = [30000, 38350, 22200, 41550, 26000];
        var Cij = 0, Fij = 0, min1 = 0, max1 = 0, min2 = 0, max2 = 0;

        var marker, marker2, marker3, marker4, marker5, marker6, marker7, marker8; 
        var geocodeService = L.esri.Geocoding.geocodeService();
        marker  = L.marker([storeLocations[0].lat, storeLocations[0].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker.bindPopup("<b>Plaza San Telmo</b>");
        
        marker2  = L.marker([storeLocations[1].lat, storeLocations[1].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker2.bindPopup("<b>Centro Comercial Altaria</b>");

        marker3  = L.marker([storeLocations[2].lat, storeLocations[2].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker3.bindPopup("<b>Sierra Morena</b>");

        marker4  = L.marker([storeLocations[3].lat, storeLocations[3].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker4.bindPopup("<b>Campestre</b>");

        marker5  = L.marker([storeLocations[4].lat, storeLocations[4].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker5.bindPopup("<b>Colosio</b>");

        marker6  = L.marker([storeLocations[5].lat, storeLocations[5].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker6.bindPopup("<b>Plaza Vestir</b>");

        marker7  = L.marker([storeLocations[6].lat, storeLocations[6].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker7.bindPopup("<b>Hotel One</b>");

        marker8  = L.marker([storeLocations[7].lat, storeLocations[7].long], {icon: cooffe}).addTo(mymap).on('click', onClick);
        marker8.bindPopup("<b>Plaza Espacio</b>");

        
        
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

       

        main();

        function main()
        {
            poblationGenerator();
            genetic();
            var best = getBetter();
            console.log(best);
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
            console.log(poblation);
        }


        //Method to get connections of closest available storage for every store
        
        function genetic()
        {
            for(var generaciones = 0; generaciones < 150; generaciones ++)
            {
                console.log("Generation: ", generaciones)
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
                            console.log("CAMBIO DE CROMOSOMA");
                            poblation[selectedIndex1] = son;
                        }
                    }
                    
                }
            }
        }
        
        function getBetter()
        {
            var bestZ1 = 0; var bestZ2 = 0; var bestOption = [];
            min1 = 0; max1 = 0;
            getDistances(poblation[0]);
            getConnections(poblation[0]);
            getZ1_1(poblation[0]);
            getZ2_1();
            bestZ1 = min1; bestZ2 = max1;
            bestOption = poblation[0];
            for(var b = 1; b < poblation.length; b++)
            {
                getDistances(poblation[b]);
                getConnections(poblation[b]);
                getZ1_1(poblation[b]);
                getZ2_1();
                if(min1 < bestZ1 && max1 > bestZ2)
                {
                    console.log("MEJOR")
                    bestZ1 = min1; bestZ2 = max1;
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