<template>
    <v-app>
        <v-img dark :src="require('@/assets/field.jpg')" max-height="500px"></v-img>
         <v-container fluid fill-height text-cols=-center>
                <v-row >
                    <v-col cols=2>
                        <img class="images" :src="producer.image"/>
                    </v-col>
                    <v-col cols=3>
                        <h2 class="prod_text">{{ producer.producerName }}</h2>
                        <h3 style="font-size:20px">{{producer.numOfProds}} προϊόντα</h3>
                        <v-icon  dark color="primary">mdi-map-marker</v-icon>
                        <span style="font-size:20px">{{producer.address}}, {{producer.city}}</span>
                    </v-col>
                    <v-col cols=7>
                        <v-tabs centered color="#4caf50" dark icons-and-text>
                            <v-tabs-slider color="yellow"></v-tabs-slider>
                            <v-tab href="#tab-1">
                                Πληροφοριες
                                <v-icon>mdi-information</v-icon>
                            </v-tab>
                            <v-tab href="#tab-2">
                                Προϊοντα
                            <v-icon>mdi-storefront</v-icon>
                            </v-tab>
                            <v-tab-item v-for="tab in tabs" :key="tab.id" :value="'tab-' + tab.id">
                                <v-card text>
                                    <v-card-text v-if="tab.id=='1'">{{ producer.about }}</v-card-text>
                                    <v-container v-else-if="tab.id=='2'" grid-list-md text-cols=-center>
                                        <v-row v-for="product in producer.products" :key="product.id" align="center" justify="center">
                                            <v-col cols=12 align="center" justify="center">
                                                <v-card outlined dark class="mx-auto mt-2">
                                                    <v-row align="center" justify="center">
                                                        <v-col cols=3>
                                                            <img @click="gotoProd(product.name)" class="images" :src="product.image"/>
                                                            <!-- <v-row row>
                                                                <v-col cols=10 align="center" justify="center">
                                                                    <v-rating readonly v-model="product.rating" color="yellow darken-3" small></v-rating>
                                                                </v-col>
                                                                <v-col cols=2>
                                                                    <div><span class="font-weight-bold" style="font-size:20px;">{{ product.rating }}</span></div>
                                                                </v-col>
                                                            </v-row> -->
                                                        </v-col>
                                                        <v-divider vertical></v-divider>
                                                        <v-col cols=3 align-self-center>
                                                            <h3 @click="gotoProd(product.name)" style="color:#4caf50;cursor: pointer;">{{product.name}}</h3>
                                                            <span class="text-align-left">Κατηγορία: {{product.category}}</span>
                                                        </v-col>
                                                        <v-divider vertical></v-divider>
                                                        <v-col cols=3 align-self-center>
                                                            <h3 >Τιμή: {{product.price}}</h3>
                                                        </v-col>
                                                        <v-divider vertical></v-divider>
                                                        <v-col cols=2 align-self-center>
                                                            <add-to-cart :name="product.name" :price="product.price" :productID="product.id" :image="product.image" :producerName="product.producerName"></add-to-cart>
                                                            <v-btn block text small dark><v-icon dark color="primary">mdi-cards-heart</v-icon></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-col>
                </v-row>
         </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';
import BackEndApi from '../../services/api/backEnd';

export default {
    name: "Producer",
    props: {
        producerName: String,
        products: String,
        image: String,
        address: String,
        about: String,
        city: String
    },
    data() {
        return {
            producer : {
                producerName: '',
                products: '',
                image: '',
                address: '',
                about: '',
                city: '',
                numOfProds: 0
            },
            tabs: [
                {id:'1'},
                {id:'2'}
            ]
        }
    },
    created () {
        // window.scrollTo(0,0);
        console.log(this.$route)
        BackEndApi.postCalls('/producers/company_name', {
            company_name: this.$route.params.producerName
        })
        .then(response => {
            console.log(response.data);
            this.producer.producerName = this.$route.params.producerName
            this.producer.products = this.splitProducts(response.data.products)
            this.producer.image = 'http://10.64.92.213:4001/'+response.data.image
            this.producer.address = response.data.address
            this.producer.about = response.data.about
            this.producer.city = response.data.city
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        gotoProd(name) {
            this.$router.push({ name: "product-producerName-productName", params: { producerName: this.$route.params.producerName, productName: name }});
        },
        splitProducts(prods) {
            var splitt = prods.split('|')
            this.producer.numOfProds = splitt.length
            this.prodsToShow = []
            for(var i=0;i<splitt.length;i++) {
                var productsForSplit = new Object();
                productsForSplit.id = i.toString()
                var splitted = [];
                splitted = splitt[i].split(',') 
                productsForSplit.name = splitted[0]
                productsForSplit.price = parseInt(splitted[1])
                productsForSplit.stock = splitted[2]
                productsForSplit.category = splitted[3]
                productsForSplit.image = 'http://10.64.92.213:4001/'+splitted[4]
                productsForSplit.ratings = splitted[5]
                this.prodsToShow.push(productsForSplit)
            }
            console.log(this.prodsToShow);
            return this.prodsToShow
        },
    }
    
}
</script>

<style scoped>
.prod_text {
    color: #4caf50;
    font-size: 40px;
}
.images {
    margin-bottom: 5%;
    margin-top: 5%;
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
</style>