<template>
  <v-app>
    <client-only>
      <v-toolbar height="100px" dark v-app-bar fixed color="green lighten-1">
        <div>
          <v-img @click="gotoHome()" class="images_small"  height="90px" width="90px" v-bind:src="require('../assets/AgroEatLogo2.png')"></v-img>
        </div>
        <v-row align="center" justify="center">
          <v-col cols=12 align="center" justify="center">
            <v-text-field class="ml-5" append-icon="mdi-magnify" type="text" name="search" v-model="search" label="Αναζητήστε το προϊόν που επιθυμείτε"> </v-text-field>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <client-only>
        <v-btn  small text @click="gotoHome()"><h4 v-if="homeCheck" style="color:#add8e6;">Αρχικη</h4><h4 v-else>Αρχικη</h4></v-btn>
        <v-btn  small text @click="gotoShop()"><h4 v-if="shopCheck" style="color:#add8e6;">Καταστημα</h4><h4 v-else>Καταστημα</h4></v-btn>
        <v-btn  small text @click="gotoProducers()"><h4 v-if="producersCheck" style="color:#add8e6;">Παραγωγοι</h4><h4 v-else>Παραγωγοι</h4></v-btn>
        <v-btn v-if="loggedIn == false"  small text @click="gotoLog()">Συνδεση</v-btn>
        <v-btn v-if="loggedIn == false"  small text @click="gotoReg()">Εγγραφη</v-btn>
        <v-btn v-if="loggedIn==true"  small text @click="gotoUser()"><h4 v-if="userCheck" style="color:#add8e6;">Προφιλ</h4><h4 v-else>Προφιλ</h4></v-btn>
        <v-btn v-if="loggedIn==true"  small text @click="logout()">Αποσυνδεση</v-btn>
        </client-only>
        <v-btn class="ml-4" small icon dark @click="dialog=true;">
          <v-badge color="primary" bottom left overlap>
            <v-icon dark>mdi-basket</v-icon>
              <template v-slot:badge>
                <!-- <v-btn style="width:70%;height:10%;" color="primary" icon small fab>{{sum}} €</v-btn> -->
                <span >{{sum}} €</span>
              </template>
          </v-badge>
        </v-btn>
        <v-dialog ref="dial" v-model="dialog" max-width="500px" dark>
            <v-card dark>
              <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Το Καλάθι Μου</v-card-title>
              <v-divider></v-divider>
              <client-only>
              <v-row align="center" justify="center" v-for="item in cartItems" :key="item.productName">
                  <v-col cols=12 align="center" justify="center">
                      <v-card outlined dark class="mx-auto mt-2 ml-2">
                          <v-row align="center" justify="center">
                              <v-col cols=3>
                                  <img @click="gotoProd(item.product.name, item.product.producerName)" width="80px" :src="'http://10.64.92.213:4001/'+item.product_image"/>
                              </v-col>
                              <v-col cols=3>
                                  <h5>{{item.productName}}</h5>
                                  <span>{{item.productPrice}} €</span>
                              </v-col>
                              <v-col cols=3>
                                  <h5>Quantity: {{item.productQuantity}}</h5>
                              </v-col>
                              <v-col cols=3>
                                  <v-btn  small dark icon @click="delProd(item.productName)"><v-icon dark color="red">mdi-delete</v-icon></v-btn>
                              </v-col>
                          </v-row>
                      </v-card>
                  </v-col>
              </v-row>
              </client-only>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog=false"  color="primary" dark>Συνέχισε τα ψώνια σου</v-btn>
                  <v-btn @click="gotoCheckout();dialog=false;"  color="success" dark>Ταμείο</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
      </v-toolbar>
      <client-only>
      <!-- <router-link v-if="loggedIn" to="/login" v-on:click.native="logout()" replace>Αποσυνδεση</router-link> -->
      <v-expand-transition >
        <v-list style="margin-top:70px;margin-left:10.5%;z-index: 2;position:fixed;width:34.5%" v-show="search.length>=3 && expand==true">
          <v-row align="center" justify="center" v-for="product in filteredProducts" :key="product.name">
            <v-col cols=12 align="center" justify="center">
              <v-card dark>
                <v-row align="center" justify="center">
                    <v-col cols=2>
                        <img @click="gotoProd(product.name, product.producerName)" class="images_small" :src="'http://10.64.92.213:4001/'+product.image"/>
                    </v-col>
                    <v-col cols=1>
                        <v-divider vertical></v-divider>
                    </v-col>
                    <v-col cols=3 align-self-center>
                        <h3 @click="gotoProd(product.name, product.producerName)" style="color:#4caf50;cursor: pointer;">{{product.name}}</h3>
                        <span class="text-align-left">Κατηγορία: {{product.category}}</span>
                        <br><span class="text-align-left">Παραγωγός:<span  style="color:#4caf50;cursor: pointer;"> {{product.producerName}}</span></span>
                    </v-col>
                    <v-col cols=1>
                        <v-divider vertical></v-divider>
                    </v-col>
                    <v-col cols=2 align-self-center>
                        <h4>Τιμή: {{product.price}}</h4>
                    </v-col>
                    <v-col cols=1>
                        <v-divider vertical></v-divider>
                    </v-col>
                    <v-col cols=2 align-self-center>
                        <add-to-cart :name="product.name" :price="product.price" :productID="product.id" :image="product.image" :producerName="product.producerName"></add-to-cart>
                    </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols=12 align="center" justify="center">
              <v-divider inset></v-divider>
            </v-col>
          </v-row>
        </v-list>
      </v-expand-transition>
      </client-only>
    <router-view></router-view>
    <v-footer dark height="auto" class="green darken-3">
      <v-container grid-list-md text-cols=-center>
        <v-row align="center" justify="center">
          <v-col cols=4>
            <h1 style="text-decoration:underline;" class="mb-3">ΠΑΡΑΓΩΓΟΣ</h1>
            <h2 class="footers" @click="gotoLogProducer()">Σύνδεση</h2>
            <h2 class="footers" @click="gotoRegProducer()">Εγγραφή</h2>
            <h2 class="footers">Επικοινωνία</h2>
          </v-col>
          <v-col cols=4>
            <h1 style="text-decoration:underline;" class="mb-3">ΚΑΤΑΝΑΛΩΤΗΣ</h1>
            <h2 class="footers" @click="gotoLog()">Σύνδεση</h2>
            <h2 class="footers" @click="gotoReg()">Εγγραφή</h2>
            <h2 class="footers">Επικοινωνία</h2>
          </v-col>
          <v-col cols=4>
            <h1 style="text-decoration:underline;">ΣΥΝΔΕΘΕΙΤΕ ΜΑΖΙ ΜΑΣ</h1>
            <v-btn dark icon>
              <img src="https://img.icons8.com/color/48/000000/facebook-circled.png"/>
            </v-btn>
            <v-btn dark icon>
              <img src="https://img.icons8.com/color/48/000000/instagram-new.png"/>
            </v-btn>
            <h1 style="text-decoration:underline;">ΕΓΓΡΑΦΕΙΤΕ ΣΤΟ NEWSLETTER ΜΑΣ</h1>
            <v-row align="center" justify="center">
              <v-col cols=9>
                <v-text-field prepend-icon="mdi-email" type="email" name="email" v-model="newsEmail" placeholder="Email" />
              </v-col>
              <v-col cols=3>
                <v-btn color="success" @click="regOnNewsletter()">ΕΓΓΡΑΦΗ</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="ma-1"></v-divider>
        <v-row align="center" justify="center">
          <v-col cols=12 align="center" justify="center">
            &copy;2020 — <strong>AgroEat</strong>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    </client-only>
  </v-app>
</template>

<script>
import axios from 'axios';
import BackEndApi from '../services/api/backEnd';

const sleep = (milliseconds) => { // sleep gia transition sto show info field
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
  name: 'App',
  data() {
    return {
      search: "",
      users: [],
      dialog: false,
      newsEmail: '',
      searchProds: [],
      expand:true,
      toReturn: [],
      homeCheck:false,
      shopCheck:false,
      userCheck:false,
      producersCheck:false,
      // loggedIn: false
    }
  },
  created() {
        if(process.client) {
          var token = localStorage.getItem("access_token");
          // if(token!= null) 
          //   this.loggedIn = true
          console.log(token)
        }
        // axios.defaults.headers.common["Authorization"] = token;
        console.log(this.filteredProducts)
        // console.log("App "+this.$store.state.loggedIn)
  },
  methods: {
    logout() {
      this.homeCheck = false
      this.shopCheck = false
      this.userCheck = false
      this.producersCheck = false
      // this.loggedIn = false
      this.$store.commit('deleteCart');
      this.$store.dispatch('deleteToken');
      this.$router.push({ path: '/home' });
    },
    gotoLog() {
      if(this.loggedIn) {
        this.gotoUser();
      }
      else {
        this.$router.push({ name: "login"});
      }
    },
    gotoReg() {
      if(this.loggedIn) {
        this.gotoUser();
      }
      else {
        this.$router.push({ name: "register"});
      }
    },
    gotoRegProducer() {
      if(this.loggedIn) {
        this.gotoUser();
      }
      else {
        this.$router.push({ name: "registerProducer"});
      }
    },
    gotoLogProducer() {
      if(this.loggedIn) {
        this.gotoUser();
      }
      else {
        this.$router.push({ name: "loginProducer"});
      }
    },
    gotoHome() {
      this.homeCheck = true
      this.shopCheck = false
      this.userCheck = false
      this.producersCheck = false
      this.$router.push({ name: "home"});
    },
    gotoShop() {
      this.homeCheck = false
      this.shopCheck = true
      this.userCheck = false
      this.producersCheck = false
      this.$router.push({ name: "shop"});
    },
    gotoUser() {
      this.homeCheck = false
      this.shopCheck = false
      this.userCheck = true
      this.producersCheck = false
      this.$router.push({ name: "user"});
    },
    gotoProducers() {
      this.homeCheck = false
      this.shopCheck = false
      this.userCheck = false
      this.producersCheck = true
      this.$router.push({ name: "producers"});
    },
    delProd(name) {
      this.$store.commit('delFromCart', name);
    },
    regOnNewsletter() {
      console.log(this.newsEmail)
    },
    gotoProd(name, producerName) {
      console.log("Router name "+this.$route.name)
      this.$router.push({ name: "product-producerName-productName", params: { producerName: producerName, productName: name}});
      if(this.$route.name == "product-producerName-productName") {
        sleep(10).then(() => {
          this.$router.go()
        })
      }
        
    },
    gotoCheckout() {
      this.$router.push({ name: "Checkout"});
    }
  },
  computed: {
    loggedIn() {
      console.log("Logged in "+ this.$store.state.loggedIn)
      return this.$store.state.loggedIn
    },
    cartItems: function() {
      console.log("app cart")
      console.log(this.$store.state.cart)
      return this.$store.state.cart;
    },
    sum: function() {
        var items = this.cartItems
        if(items==null) {
          items = []
        }
        var summary = 0
        for(var i=0;i<items.length;i++) {
            summary = summary+items[i].productPrice*items[i].productQuantity
        }
        return summary
    },
    filteredProducts: function() {
      if(this.search.length>=3) {
        this.expand = true
        BackEndApi.getSearch("/producers/searchProducts/?term="+this.search) // pare ta nea fields wste na allaksei to onoma sto fields
        .then(response => {
            sleep(1000).then(() => {
              this.searchProds = response.data.message;
              this.toReturn = []
              var k=0
              for(var i=0;i<this.searchProds.length;i++) {
                var splits = this.searchProds[i].products.split('|')
                for(var j=0;j<splits.length;j++) {
                  this.search = this.search[0].toUpperCase() + this.search.substring(1)
                  if(splits[j].includes(this.search)) {
                    var productsForSplit = new Object();
                    productsForSplit.id = k.toString()
                    k++
                    var splitted = [];
                    splitted = splits[j].split(',') 
                    productsForSplit.name = splitted[0]
                    productsForSplit.price = parseInt(splitted[1])
                    productsForSplit.stock = splitted[2]
                    productsForSplit.category = splitted[3]
                    productsForSplit.image = splitted[4]
                    productsForSplit.ratings = splitted[5]
                    productsForSplit.producerName = this.searchProds[i].company_name
                    this.toReturn.push(productsForSplit)
                  }
                }
              }
              console.log(this.toReturn)
            })
        })
        .catch(error => {
        console.log(error)
        })
        return this.toReturn;
      }
      else {
        this.toReturn = []
        return this.toReturn;
      }
    },
    
  }
}
</script>

<style scoped>
.footers:hover {
  cursor: pointer;
  opacity: 0.5;
}
.images_small {
    margin-bottom: 5%;
    margin-left: 5%;
    margin-top: 5%;
    cursor: pointer;
    max-height: 100px;
    max-width: 100px;
}
</style>
