<template>
    <div class="add-to-cart">
        <v-dialog ref="dial" v-model="dialog" persistent max-width="500px" dark>
            <v-btn slot="activator" small text block dark @click="dialog=true;addToCart()"><v-icon dark color="success">mdi-basket</v-icon></v-btn>
            <v-card dark>
                <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Το Καλάθι Μου</v-card-title>
                <v-divider></v-divider>
                <client-only>
                <v-row align="center" justify="center" v-for="item in cartItems" :key="item.productID">
                    <v-col cols=12>
                        <v-card outlined dark class="mx-auto mt-2 ml-2">
                            <v-row align="center" justify="center">
                                <v-col cols=3>
                                    <img @click="gotoProd(item.productName, item.producerName)" width="80px" :src="'http://10.64.92.213:4001/'+item.product_image"/>
                                </v-col>
                                <v-col cols=3 align-self-center>
                                    <h5>{{item.productName}}</h5>
                                    <span>{{item.productPrice}} €</span>
                                </v-col>
                                <v-col cols=4 align-self-center>
                                    <h5>Ποσότητα: {{item.productQuantity}} 
                                        <v-icon dark small fab color="primary" @click="item.productQuantity++">mdi-plus</v-icon>
                                        <v-icon dark small fab color="primary" @click="item.productQuantity--">mdi-minus</v-icon>
                                    </h5>
                                </v-col>
                                <v-col cols=2 align-self-center>
                                    <v-btn text small dark icon @click="delProd(item.productName)"><v-icon dark color="red">mdi-delete</v-icon></v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                </client-only>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog=false" text color="primary" dark>Συνεχισε τα ψώνια σου</v-btn>
                    <v-btn @click="dialog=false;gotoCheckout()" text color="success" dark>Ταμειο</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    name: "add-to-cart",
    props: {
        name: String,
        price: Number,
        productID: String,
        image: String,
        producerName: String
    },
    data() {
        return {
            item : {
                productName: this.name,
                productPrice: this.price,
                productID: this.productID,
                product_image: this.image,
                producerName: this.producerName,
                productQuantity: 1
            },
            dialog: false,
        }
    },
    methods: {
        addToCart() {
            this.$store.commit('addToCart', this.item);
        },
        delProd(name) {
            this.$store.commit('delFromCart', name);
        },
        gotoProd(name, producerName) {
            this.$router.push({ name: "product", params: { productName: name, producerName: producerName}});
        },
        gotoCheckout() {
            this.$router.push({ name: "Checkout"});
        }
    },
    computed: {
        cartItems: function() {
            console.log(this.$store.state.cart)
            return this.$store.state.cart;
        }
    }
}
</script>