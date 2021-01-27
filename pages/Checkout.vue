<template>
    <v-app dark>
        <v-main>
            <div class="Checkout">
                <v-row>
                    <v-col cols=12 align="center" justify="center">
                        <h1 class="text-lg-center" style="font-size:40px">Ταμείο</h1>
                    </v-col>
                    <v-col cols=8>
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                                <v-stepper-step :complete="e1 > 1" step="1">Διεύθυνση Αποστολής</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="e1 > 2" step="2">Στοιχεία Πληρωμής</v-stepper-step>
                                <v-divider></v-divider>
                            </v-stepper-header>
                            <v-stepper-items>
                                <v-stepper-content step="1">
                                    <v-card>
                                        <v-form v-model="valid">
                                            <v-row >
                                                <v-col cols=6>
                                                    <v-text-field :rules="nameRules" class="ml-2 mr-2" type="text" v-model="form.firstName" label="Όνομα">{{form.firstName}}</v-text-field>
                                                    <v-text-field class="ml-2 mr-2" type="text" v-model="form.companyName" label="Επωνυμία Εταιρείας">{{form.companyName}}</v-text-field>
                                                    <v-text-field :rules="nameRules" class="ml-2 mr-2" type="text" v-model="form.shippingAddress" label="Διεύθυνση Αποστολής">{{form.shippingAddress}}</v-text-field>
                                                </v-col>
                                                <v-col cols=6>
                                                    <v-text-field :rules="nameRules" class="ml-2 mr-2" type="text" v-model="form.lastName" label="Επίθετο">{{form.lastName}}</v-text-field>
                                                    <v-text-field class="ml-2 mr-2" type="text" v-model="form.phoneNumber" label="Αριθμός Τηλεφώνου">{{form.phoneNumber}}</v-text-field>
                                                    <v-text-field :rules="nameRules" class="ml-2 mr-2" type="text" v-model="form.postalCode" label="Ταχυδρομικός Κώδικας">{{form.postalCode}}</v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-card>
                                    <v-btn color="primary" :disabled="!valid" @click="e1 = 2">Επόμενο</v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="2">
                                    <v-card dark>
                                        <v-row >
                                            <v-col cols=12 align="center" justify="center">
                                                <v-select @change="ChoosePayment()" v-model="selectValue" class="mt-5 mr-3 ml-3" filled :items="items" label="Τρόπος Πληρωμής"></v-select>                                        </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn @click="PlaceOrder()" color="success">Οριστικοποίηση</v-btn>
                                    <v-btn color="primary" @click="e1 = 1">Προηγούμενο</v-btn>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-col>
                    <v-col cols=4>
                        <v-card dark text>
                            <v-card-title style="font-size:30px; font-weight: bold;" primary-title>Το Καλάθι μου</v-card-title>
                            <v-divider></v-divider>
                            <v-row  v-for="item in cartItems" :key="item.productName">
                                <v-col cols=12 align="center" justify="center">
                                    <v-card outlined dark class="mx-auto mt-2 ml-2">
                                        <v-row >
                                            <v-col cols=3>
                                                <img @click="gotoProd(product.id)" width="80px" :src="'http://10.64.92.213:4001/'+item.product_image"/>
                                            </v-col>
                                            <v-col cols=3 align-self-center>
                                                <h5>{{item.productName}}</h5>
                                                <span>{{item.productPrice}} €</span>
                                            </v-col>
                                            <v-col cols=3 align-self-center>
                                                <h3>x{{item.productQuantity}}</h3>
                                            </v-col>
                                            <v-col cols=3>
                                                <v-btn text small dark icon @click="delProd(item.productName)"><v-icon dark color="red">mdi-delete</v-icon></v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <h2 class="ml-5">Σύνολο: {{sum}}</h2>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import BackEndApi from '../services/api/backEnd';

const sleep = (milliseconds) => { // sleep gia transition sto show info field
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}



export default {
    name: "Checkout",
    data() {
        return {
            e1:1,
            selectValue: 'Μετρητά',
            items: [
                'Μετρητά', 'Κάρτα'
            ],
            valid: true,
            nameRules: [
                v => !!v || 'Name is required'
            ],
            form: {
                firstName: '',
                lastName: '',
                companyName: '',
                shippingAddress: '',
                postalCode: '',
                phoneNumber: ''
            },
            prevOrders: '',
            myEmail: '',
            prevOrdersProducer:[],
            checkOrders: []
        }
    },
    created () {
        var token = "";
        var myemail = "";
        if(process.client) {
            window.scrollTo(0,0);
            token = localStorage.getItem("access_token");
            myemail = localStorage.getItem("email");
            axios.defaults.headers.common["Authorization"] = token;
        }
        this.myEmail = myemail
        BackEndApi.postCalls('/users/email', {
            email: myemail
        })
        .then(response => {
            console.log(response.data);
            this.prevOrders = response.data.orders
            this.checkOrders = response.data.orders_check
        })
        .catch(error => {
            console.log(error);
        })
    },
    mounted() {
        var items = this.cartItems
        for(var i=0;i<items.length;i++) {
            this.sum = this.sum+items[i].productPrice*items[i].productQuantity
        }
    },
    methods: {
        delProd(name) {
            this.$store.commit('delFromCart', name);
        },
        PlaceOrder() {
            async function ordersToProducers(diffProducers, prevOrdersProducer) {
                BackEndApi.postCalls('/producers/company_name', {
                    company_name: diffProducers
                })
                .then(response => {
                    prevOrdersProducer = response.data.my_orders
                    console.log(response.data)
                    console.log(prevOrdersProducer)
                    if(prevOrdersProducer==null) {
                        prevOrdersProducer = [];
                    }
                    prevOrdersProducer.push(prodOrder);
                    console.log(prevOrdersProducer)
                    console.log("yolo")
                    console.log(diffProducers)
                    
                    BackEndApi.postCalls('/producers/editCompany', {
                        company_name: diffProducers,
                        my_orders: prevOrdersProducer
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    console.log(error);
                })
                return await Promise.resolve(1);
            }
            
// ///////////////////////////////////
//             // async function ordersToProducersNew(diffProducersHere) {
//             //     BackEndApi.postCalls('/producers/company_name', {
//             //         company_name: diffProducersHere.name
//             //     })
//             //     .then(response => {
//             //         var prevOrders = []
//             //         prevOrders = response.data.my_orders
//             //         console.log(response.data)
//             //         console.log(prevOrders)
//             //         if(prevOrders==null) {
//             //             prevOrders = [];
//             //         }
//             //         diffProducersHere.order = diffProducersHere.order + "==" + diffProducersHere.sum
//             //         prevOrders.push(diffProducersHere.order);
//             //         console.log(prevOrders)
//             //         console.log("yolo")
//             //         console.log(diffProducersHere.name)
                    
//             //         BackEndApi.postCalls('/producers/editCompany', {
//             //             company_name: diffProducers,
//             //             my_orders: prevOrders
//             //         })
//             //         .then(response => {
//             //             console.log(response.data);
//             //         })
//             //         .catch(error => {
//             //             console.log(error);
//             //         })
//             //     })
//             //     .catch(error => {
//             //         console.log(error);
//             //     })
//             //     return await Promise.resolve(1);
//             // }
// ////////////////////////////////

            var diffProducers = []
            var check = false
            var order;
            order = this.form.firstName + ',' + this.form.lastName + ',' + this.form.companyName + ',' + this.form.shippingAddress + ',' + this.form.postalCode + ',' + this.form.phoneNumber + '='
            var orderFirst = order

// /////////////////////////////////////
//             //I have to send every delivery to each producer independently, make array of objects for producers with {name,order,sum}, 
//             //check if name is in array,add each order if the producername is the same and increase the sum

//             // var diffProducersNew = [{name:'',order:'',sum:0}]
//             // var orderForProd = ''

//             // for(var i=0;i<this.cartItems.length;i++) {
//             //     orderForProd = this.cartItems[i].productName + ',' + this.cartItems[i].producerName + ',' + this.cartItems[i].productQuantity + ',' + this.cartItems[i].product_image
//             //     if(i==this.cartItems.length-1) {
//             //         order = order + this.cartItems[i].productName + ',' + this.cartItems[i].producerName + ',' + this.cartItems[i].productQuantity + ',' + this.cartItems[i].product_image
//             //     }
//             //     else {
//             //         order = order + this.cartItems[i].productName + ',' + this.cartItems[i].producerName + ',' + this.cartItems[i].productQuantity + ',' + this.cartItems[i].product_image + '|'
//             //     }
//             //     for(var j=0;j<diffProducersNew.length;j++) {
//             //         if(diffProducersNew[j].name==this.cartItems[i].producerName) {
//             //             diffProducersNew[j].order = diffProducersNew[j].order + '|' + orderForProd
//             //             diffProducersNew[j].sum = diffProducersNew[j].sum + parseFloat(this.cartItems[i].productPrice)*parseFloat(this.cartItems[i].productQuantity)
//             //             console.log(diffProducersNew[j])
//             //             check = true
//             //             break
//             //         }
//             //     }
//             //     if(!check) {
//             //         var obj = new Object();
//             //         obj.name = this.cartItems[i].producerName
//             //         obj.order = orderForProd
//             //         obj.sum = parseFloat(this.cartItems[i].productPrice)*parseFloat(this.cartItems[i].productQuantity)
//             //         console.log(obj)
//             //         diffProducersNew.push(obj)
//             //         console.log(diffProducersNew)
//             //     }
//             //     else {
//             //         check = false
//             //     }
//             // }

// /////////////////////////////////////

// // pass price for every product independently because you pass the whole sum on the other page --WWWWWWWW
            for(var i=0;i<this.cartItems.length;i++) {
                if(i==this.cartItems.length-1) {
                    order = order + this.cartItems[i].productName + ',' + this.cartItems[i].producerName + ',' + this.cartItems[i].productQuantity + ',' + this.cartItems[i].product_image
                }
                else {
                    order = order + this.cartItems[i].productName + ',' + this.cartItems[i].producerName + ',' + this.cartItems[i].productQuantity + ',' + this.cartItems[i].product_image + '|'
                }
                for(var j=0;j<diffProducers.length;j++) {
                    if(diffProducers[j]==this.cartItems[i].producerName) {
                        check = true
                    }
                }
                if(!check) {
                    diffProducers.push(this.cartItems[i].producerName)
                }
                else {
                    check = false
                }
            }
            console.log(diffProducers)
            order = order + '==' + this.sum
            var prodOrder = order
            if(this.prevOrders!='' && this.prevOrders!=undefined && this.prevOrders!=null) {
                order = this.prevOrders + '||' + order
            }
            console.log(order)
            console.log(prodOrder)
            console.log(this.checkOrders)
            if(this.checkOrders==null) {
                this.checkOrders = []
            }
            this.checkOrders.push(prodOrder)
            console.log(this.checkOrders)
            BackEndApi.postCalls('/users/editUser', {
                email: this.myEmail,
                orders_check: this.checkOrders
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })

//             // if(diffProducers.length>1) {
//             //     var producersWithOrders = [{producerNames: '',orderofHim: ''}]
//             //     var prodByProducer = ''
//             //     var priceForProd = 0
//             //     for(var j=0;j<diffProducers.length;j++) {
//             //         prodByProducer = orderFirst
//             //         for(i=0;i<this.cartItems.length;i++) {
//             //             if(diffProducers[j]==this.cartItems[i].producerName) {
//             //                 prodByProducer = prodByProducer + this.cartItems[i].productName + ',' + this.cartItems[i].producerName + ',' + this.cartItems[i].productQuantity + ',' + this.cartItems[i].product_image + '|'
//             //                 priceForProd = priceForProd + this.cartItems[i].productPrice*this.cartItems[i].productQuantity
//             //                 console.log(prodByProducer)
//             //                 console.log(priceForProd)
//             //             }
//             //         }
                    
//             //     }
//             // }
            
            console.log(diffProducers)
            console.log("hey")

            //await for every loop
            for(var p=0;p<diffProducers.length;p++) {
                ordersToProducers(diffProducers[p], this.prevOrdersProducer);
            }

//             // for(var p=0;p<diffProducersNew.length;p++) {
//             //     ordersToProducersNew(diffProducersNew[p]);
//             // }
        }
    },
    computed: {
        cartItems: function() {
            console.log(this.$store.state.cart)
            return this.$store.state.cart;
        },
        sum: function() {
            var items = this.cartItems
            var summary = 0
            for(var i=0;i<items.length;i++) {
                summary = summary+items[i].productPrice*items[i].productQuantity
            }
            return summary
        }
    }
}
</script>