<template>
    <v-app dark>
        <v-main>
            <div class="Product">
                <v-container fluid fill-height text-cols=-center>
                    <v-row align="start" justify="center">
                        <v-col cols=5>
                            <img style="width:100%;height:50%" :src="'http://10.64.92.213:4001/'+imageProd"/>
                        </v-col>
                        <v-col cols=1>
                            <v-divider vertical></v-divider>
                        </v-col>
                        <v-col cols=6>
                            <v-toolbar color="success">
                                <v-spacer></v-spacer>
                                <v-toolbar-title>{{ $route.params.productName }}
                                    <v-btn icon  fab color="black">
                                        <add-to-cart v-if="imageProd!='' && priceHere!=0" :name="$route.params.productName" :price="priceHere" :productID="new Date().getTime().toString()" :image="imageProd" :producerName="$route.params.producerName"></add-to-cart>
                                    </v-btn>
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-data-table hide-default-footer :headers="headers" :items="info_array" hide-actions>
                                <template slot="items" slot-scope="props">
                                    <td class="text-cols=-left">{{ props.item.name }}</td> 
                                    <td v-if="props.item.info!=info_array[0].info && props.item.info!=info_array[4].info" class="text-cols=-left">{{ props.item.info }}</td>
                                    <td v-else-if="props.item.info==info_array[4].info" class="text-cols=-left">
                                        <v-row row>
                                            <v-col cols=10 align="center" justify="center">
                                                <v-rating readonly v-model="props.item.info" color="yellow darken-3" small></v-rating>
                                            </v-col>
                                            <v-col cols=2>
                                                <div><span class="font-weight-bold" style="font-size:20px;">{{ props.item.info }}</span></div>
                                            </v-col>
                                        </v-row>
                                    </td>
                                    <td v-else class="produc_Text" @click="gotoProducer()">{{ props.item.info }}</td>
                                </template>
                            </v-data-table>
                            <v-card dark class="mt-2">
                                <v-toolbar color="success">
                                    <v-toolbar-title>Σχόλια</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-comment</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-list>
                                    <v-list-item v-for="comm in comments" :key="comm" avatar>
                                        <v-list-item-avatar>
                                            <v-icon>mdi-account_circle</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <v-row row>
                                                    <v-col cols=3>
                                                        <v-rating readonly v-model="comm.rating" color="yellow darken-3" small></v-rating>
                                                    </v-col>
                                                    <v-col cols=9 align="center" justify="center">
                                                        <div><span class="font-weight-bold" style="font-size:15px;">{{ comm.comm}}</span></div>
                                                    </v-col>
                                                </v-row>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-main>
    </v-app>    
</template>

<script>
import BackEndApi from '../../../services/api/backEnd';
import axios from 'axios';

export default {
    name: "Product",
    data() {
        return {
            imageProd: '',
            info_array: [
            ],
            headers: [
                { text: 'Καρτέλα', align: 'left', value: 'name' , sortable: false },
                { text: 'Πληροφορίες', align: 'left',  value: 'info' , sortable: false },
                //{ Actions: 'Actions', value: 'actions' ,sortable: false }
            ],
            info_array: [ // array gia ta pedia
                {
                    name: "Παραγωγός",
                    info: ''
                },
                {
                    name: "Απόθεμα",
                    info: ''
                },
                {
                    name: "Κατηγορία",
                    info: ''
                },
                {
                    name: "Τιμή",
                    info: ''
                },
                {
                    name: "Βαθμολογία",
                    info: 0
                }
            ],
            priceHere: 0,
            comments: []
        }
    },
    created () {
        // window.scrollTo(0,0);
        console.log(this.$route)
        BackEndApi.postCalls('/producers/company_name', {
            company_name: this.$route.params.producerName
        })
        .then(response => {
            console.log(new Date().getTime())
            console.log(response.data);
            var prods = response.data.products.split('|')
            for(var i=0;i<prods.length;i++) {
                console.log(prods[i])
                if(prods[i].includes(this.$route.params.productName)) {
                    var splitted = prods[i].split(',')
                    console.log(splitted)
                    this.info_array[0].info = this.$route.params.producerName
                    this.info_array[1].info = splitted[2]
                    this.info_array[2].info = splitted[3]
                    this.info_array[3].info = parseInt(splitted[1])
                    this.priceHere = parseInt(splitted[1])
                    this.imageProd = splitted[4]
                    var avg = 0
                    if(splitted[5]!='' && splitted[5]!=null) {
                        var splitRatings = splitted[5].split('*');
                        for(var p=0;p<splitRatings.length;p++) {
                            var splitComsRats = splitRatings[p].split('-')
                            avg = avg + parseInt(splitComsRats[1])
                            var pair = new Object()
                            pair = {comm: splitComsRats[0],rating:parseInt(splitComsRats[1])}
                            this.comments.push(pair)
                            console.log(this.comments)
                        }
                        avg = avg/p
                        console.log(avg)
                    }
                    console.log(this.comments)
                    this.info_array[4].info = avg
                }
            }
            console.log(this.info_array)
            console.log(this.imageProd)
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        gotoProducer() {
            this.$router.push({ name: "producer-producerName", params: { producerName: this.info_array[0].info }})
        }
    },
}
</script>

<style scoped>
.produc_Text {
    color:#4caf50;
    cursor: pointer;
    text-align: left;
}
.produc_Text:hover {
    text-align: left;
    color:#4caf50;
    cursor: pointer;
    text-decoration: underline;
}
</style>