<template>
    <v-app dark>
        <v-main>
            <v-row >
                <v-col cols=12 align="center" justify="center">
                    <h1 style="text-align: center;font-size:40px">Οι Παραγωγοί Μας</h1>
                </v-col>
            </v-row>
            <v-container fluid fill-height>
                <v-row >
                    <v-col cols=6>
                        <v-container grid-list-md>
                            <v-row  v-for="producer in producerInfo" :key="producer.id">
                                <v-col cols=12 align="center" justify="center">
                                    <v-card outlined dark class="mx-auto mt-2">
                                        <v-row >
                                            <v-col cols=2>
                                                <!-- <v-img @click="gotoProducer(producer.company_name)" class="images" v-bind:src="require('@/assets/'+producer.image)"/> -->
                                                <img class="images" @click="gotoProducer(producer.company_name, producer.products, producer.image, producer.address, producer.about, producer.city)" :src="'http://10.64.92.213:4001/'+producer.image"/>
                                                <!-- <v-row row>
                                                    <v-col cols=10 align="center" justify="center">
                                                        <v-rating readonly v-model="producer.rating" color="yellow darken-3" small></v-rating>
                                                    </v-col>
                                                    <v-col cols=2>
                                                        <div><span class="font-weight-bold" style="font-size:20px;">{{ producer.rating }}</span></div>
                                                    </v-col>
                                                </v-row> -->
                                            </v-col>
                                            <v-col cols=1>
                                                <v-divider vertical></v-divider>
                                            </v-col>
                                            <v-col cols=9 align="start" justify="start">
                                                <h1 @click="gotoProducer(producer.company_name, producer.products, producer.image, producer.address, producer.about, producer.city)" class="prod_text">{{producer.company_name}}</h1>
                                                <!-- <h3 style="text-align: left;">{{producer.numOfProducts}} προϊόντα</h3> -->
                                                <v-icon style="align-items: start;" dark color="primary">mdi-map-marker</v-icon>
                                                <span>{{producer.address}}, {{producer.city}}</span>
                                                <h4 style="text-align: left;">{{producer.about}}</h4>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols=6>
                        <v-container fluid fill-height>
                            <v-row >
                                <div id="map"></div>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import BackEndApi from '../services/api/backEnd';
import axios from 'axios';
import mapboxgl from "mapbox-gl";

const sleep = (milliseconds) => { // sleep gia transition sto show info field
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
    name: 'Producers',
    data() {
        return {
            // accessToken : 'pk.eyJ1IjoiZ2Vvcmdla2wiLCJhIjoiY2s2bTc1dWJpMGwxMDNvbHN5aWx2dDRicyJ9.vOUIsWK8lxaqqYidj8w9uQ',
            producers: [
                {id:'1', name:'Τάκης', description:"Ομιλος Τακης με τα καλυτερα μηλα στην Ελλαδα", city:"Ζαγορά", numOfProducts: 5, image:"farmer.jpg", rating: 5},
                {id:'2', name:'Μήτσος', description:"Ομιλος Μήτσος ασύγκριτα αχλάδια", city:"Μελιβοία", numOfProducts: 7, image:"farmer.jpg", rating:4.5},
            ],
            producerInfo:[],
            allCoords: [],
            // map: 
        }
    },
    created(){
        // window.scrollTo(0,0);
    },
    mounted(){
        if(process.client) {
            this.init_map();
        }
    },
    methods: {
        gotoProducer(company_name) {
            this.$router.push({ name: "producer-producerName", params: { producerName: company_name}});
        },
        async init_map() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvcmdla2wiLCJhIjoiY2s2bTc1dWJpMGwxMDNvbHN5aWx2dDRicyJ9.vOUIsWK8lxaqqYidj8w9uQ';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center:  [23.727539,37.983810],
                zoom: 1,
                minZoom: 1,
                maxBounds: [
                    [16, 34], //aristera katw
                    [32, 42] // deksia panw
                ],
            });
            var token = localStorage.getItem("access_token");
            axios.defaults.headers.common["Authorization"] = token;
            BackEndApi.getCalls('/producers') // pare ta nea fields wste na allaksei to onoma sto fields
            .then(response => {
                this.producerInfo = response.data.message;
                this.producerInfo[0].coords = [22.941306,39.363972]
                this.producerInfo[1].coords = [22.923818, 39.365833]
                console.log(this.producerInfo)
                var data = [];
                for(var i=0;i<this.producerInfo.length;i++) {
                    var yolo =  {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": this.producerInfo[i].coords,
                                    },
                                    'properties': {
                                        'title': this.producerInfo[i].company_name
                                    },
                                    'id' : i+1
                                }
                    data.push(yolo)
                }
                data = {"type": "FeatureCollection","features": data }
                var myData = JSON.parse(JSON.stringify(data))
                console.log(myData)
                var popo = e => {
                    var producer = e.features[0].properties.title;
                    this.$router.push({ name: "producer-producerName", params: { producerName: producer}});
                }
                var hoveredStateId = null;
                this.producerToGo = popo
                map.on('load', function() {
                    map.addSource('earthquakes', {
                        'type': 'geojson',
                        'data' : myData,
                        'cluster': true,
                        'clusterMaxZoom': 14,
                        'clusterRadius': 50,
                        // 'generateId' : true
                    });

                    map.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'earthquakes',
                        filter: ['has', 'point_count'],
                        paint: {
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                            ],
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });

                    map.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'earthquakes',
                        filter: ['has', 'point_count'],
                        layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                        }
                    });

                    map.addLayer({
                        id: 'unclustered-point',
                        type: 'circle',
                        source: 'earthquakes',
                        filter: ['!', ['has', 'point_count']],
                        paint: {
                            // 'circle-color': '#469609',
                            'circle-radius': 10,
                            'circle-stroke-width': 1,
                            'circle-stroke-color': '#fff',
                            'circle-color': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],'#469609','#0000ff']
                        },
                        
                    });

                    map.on('click', 'clusters', function(e) {
                        var features = map.queryRenderedFeatures(e.point, {layers: ['clusters']});
                        var clusterId = features[0].properties.cluster_id;
                        map.getSource('earthquakes').getClusterExpansionZoom(clusterId,function(err, zoom) {
                            if (err) return;
                            map.easeTo({
                                center: features[0].geometry.coordinates,
                                zoom: zoom
                            });
                        })
                    });

                    var popup;

                    map.on('mouseenter', 'unclustered-point', function(e) {
                        if (e.features.length >= 0) {
                            if (hoveredStateId) {
                                map.setFeatureState(
                                    { source: 'earthquakes', id: hoveredStateId },
                                    { hover: false }
                                );
                            }
                            hoveredStateId = e.features[0].id;
                            map.setFeatureState(
                                { source: 'earthquakes', id: hoveredStateId },
                                { hover: true }
                            );
                        }
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var producer = e.features[0].properties.title;
                        while (Math.abs(e.lngLat.lng - coordinates[0]) >180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                        var desc = `<h3 style="color:#000000">Παραγωγός: <span style="color:#4caf50" >${producer}</span></h3>`;
                        popup = new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(desc)
                            .addTo(map);
                    });

                    map.on('mouseleave', 'unclustered-point', function(e) {
                        if (hoveredStateId) {
                            map.setFeatureState(
                                { source: 'earthquakes', id: hoveredStateId },
                                { hover: false }
                            );
                        }
                        hoveredStateId = null
                        popup.remove()
                    });
                    
                    map.on('click', 'unclustered-point', popo);

                    map.on('mouseenter', 'clusters', function() {
                        map.getCanvas().style.cursor = 'pointer';
                    });
                    map.on('mouseleave', 'clusters', function() {
                        map.getCanvas().style.cursor = '';
                    });
                });
            })
            .catch(error => {
            console.log(error)
            })
        }
    },
}
</script>

<style scoped>
.prod_text {
    color: #4caf50;
    text-align: left;
}
.prod_text:hover {
    cursor: pointer;
    text-decoration: underline;
}
.images {
    margin-bottom: 5%;
    margin-left: 5%;
    transition: 1s;
    cursor: pointer;
    max-height: 100%;
    max-width: 100%;
}
.images:hover {
    transition: 1s;
    transform: scale(1.1);
    cursor: pointer;
}
#map {
    margin-left: 5px;
    margin-right: 5px;
    width:100%;
    height:100vh;
}
.popupProducer:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>