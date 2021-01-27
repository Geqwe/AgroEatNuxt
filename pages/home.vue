<template>
    <v-app dark>
      <v-parallax :src="require('../assets/backgroundHomepage.jpg')" height="1200">
        <v-main>
          <div class="Home">
            <v-container grid-list-md text-cols=-center>
              <!-- top icons -->
                <v-row align="center" justify="center">
                    <v-col cols=4 align="center" justify="center">
                      <v-btn class="btn1" color="success" fab @click="gotoReg()">
                        <v-icon size="100px" @click="gotoReg()">mdi-account-circle</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols=4 align="center" justify="center">
                      <v-btn class="btn1" color="success" fab @click="gotoShop()">
                        <v-icon size="100px" @click="gotoShop()">mdi-basket</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols=4 align="center" justify="center">
                      <v-btn class="btn1" color="success" fab @click="gotoUser()">
                        <v-icon size="100px" @click="gotoUser()">mdi-home</v-icon>
                      </v-btn>
                    </v-col>
                </v-row>
                <!-- top btns -->
                <v-row  class="mb-2">
                    <v-col cols=4 align="center" justify="center">
                      <v-btn large color="success" @click="gotoReg()">
                        ΚΑΝΤΕ ΕΓΓΡΑΦΗ
                      </v-btn>
                    </v-col>
                    <v-col cols=4 align="center" justify="center">
                      <v-btn large color="success" @click="gotoShop()">
                        ΓΕΜΙΣΤΕ ΤΟ ΚΑΛΑΘΙ
                      </v-btn>
                    </v-col>
                    <v-col cols=4 align="center" justify="center">
                      <v-btn large color="success" @click="gotoUser()">
                        ΠΑΡΑΔΟΣΗ ΣΤΟ ΧΩΡΟ ΣΑΣ
                      </v-btn>
                    </v-col>
                </v-row>
                <!-- categories -->
                <!-- <v-row  class="mb-5">
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success" id="cards">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/meli.jpg')"/>
                            <h3 class="subtitle">Μέλι</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Θυμαρίσιο</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Ανθέων</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Πεύκου</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Πορτοκαλιάς</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Βελανιδιάς</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success" id="cards">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/fruits.jpg')"/>
                            <h3 class="subtitle">Φρούτα</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Μήλα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Αχλάδια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Καρπούζια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Ροδάκινα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Σύκα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>                    
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success" id="cards">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/legumes.jpg')"/>
                            <h3 class="subtitle">Όσπρια</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Φασόλια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Φακές</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Ρεβίθια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Κουκιά</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Αρακάς</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>  
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success" id="cards">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/nuts.jpg')"/>
                            <h3 class="subtitle">Ξηροί Καρποί</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Φιστίκια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Αμύγδαλα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Καρύδια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Φουντούκια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Κάσιους</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>                      
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/pasta.jpg')"/>
                            <h3 class="subtitle">Ζυμαρικά</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Σπαγγέτι</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Πέννες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Λαζάνια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Κοφτό</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Τορτελίνια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>                      
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/sweets.jpg')"/>
                            <h3 class="subtitle">Γλυκά & Αρτοπαρασκευάσματα</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Κουλούρια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Του Κουταλιού</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Κέικ</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Τάρτες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Τσουρέκια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>                      
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/veges.jpg')"/>
                            <h3 class="subtitle">Λαχανικά</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Κρεμμύδια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Πατάτες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Μαρούλια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Αγγούρια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Ντομάτες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>                      
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/kava.jpg')"/>
                            <h3 class="subtitle">Κάβα</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Ούζα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Τσίπουρα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Κρασιά</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Μπύρες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Σουμάδες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>                      
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-5">
                      <v-card color="success">
                        <v-row >
                          <v-col cols=5>
                            <v-img class="images" v-bind:src="require('@/assets/aporrupantika.jpg')"/>
                            <h3 class="subtitle">Υγιεινή & Περιποίηση</h3>
                          </v-col>
                          <v-col cols=1><v-divider vertical></v-divider></v-col>
                          <v-col cols=5 class="ml-3">
                            <h2 class="mt-1">Σαπούνια</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Αρώματα</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Απορρυπαντικά</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Κρέμες</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Αλοιφές</h2>
                            <v-divider></v-divider>
                            <h2 class="mt-1">Άλλο</h2>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                </v-row> -->

                <v-row  class="mb-5">
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Μέλι')" class="images" v-bind:src="require('@/assets/meli.jpg')">
                              <h1 @click="gotoShopCategory('Μέλι')" class="subtitle">Μέλι</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Φρούτα')" class="images" v-bind:src="require('@/assets/fruits.jpg')">
                              <h1 @click="gotoShopCategory('Φρούτα')" class="subtitle">Φρούτα</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Όσπρια')" class="images" v-bind:src="require('@/assets/legumes.jpg')">
                              <h1 @click="gotoShopCategory('Όσπρια')" class="subtitle">Όσπρια</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Ξηροί Καρποί')" class="images" v-bind:src="require('@/assets/nuts.jpg')">
                              <h1 @click="gotoShopCategory('Ξηροί Καρποί')" class="subtitle">Ξηροί Καρποί</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Ζυμαρικά')" class="images" v-bind:src="require('@/assets/pasta.jpg')">
                              <h1 @click="gotoShopCategory('Ζυμαρικά')" class="subtitle">Ζυμαρικά</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Γλυκά και Αρτοπαρασκευάσματα')" class="images" v-bind:src="require('@/assets/sweets.jpg')">
                              <h1 @click="gotoShopCategory('Γλυκά και Αρτοπαρασκευάσματα')" class="subtitle">Γλυκά <br>&<br> Αρτοπαρασκευάσματα</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Λαχανικά')" class="images" v-bind:src="require('@/assets/veges.jpg')">
                              <h1 @click="gotoShopCategory('Λαχανικά')" class="subtitle">Λαχανικά</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Κάβα')" class="images" v-bind:src="require('@/assets/kava.jpg')">
                              <h1 @click="gotoShopCategory('Κάβα')" class="subtitle">Κάβα</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols=4 align="center" justify="center" class="mt-3">
                        <v-row >
                          <v-col cols=12 align="center" justify="center">
                            <v-img @click="gotoShopCategory('Υγιεινή και Περιποίηση')" class="images" v-bind:src="require('@/assets/aporrupantika.jpg')">
                              <h1 @click="gotoShopCategory('Υγιεινή και Περιποίηση')" class="subtitle">Υγιεινή & Περιποίηση</h1>
                            </v-img>
                          </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <!-- recent seen products -->
              </v-container>  
            </div>
          </v-main>
        </v-parallax>
    </v-app>
</template>

<script>
import axios from 'axios';
import BackEndApi from '../services/api/backEnd';

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  created() {
    
  },
  methods: {
    logout() {
      // this.$store.dispatch('deleteToken');
      this.$router.push({ path: '/' });
    },
    gotoLog() {
      this.$router.push({name: "login"});
    },
    gotoReg() {
      if(this.loggedIn) {
        this.gotoUser();
      }
      else {
        this.$router.push({ name: "register"});
      }
    },
    gotoHome() {
      this.$router.push({ name: "homepage"});
    },
    gotoShop() {
      this.$router.push({ name: "shop"});
    },
    gotoProfile() {
      this.$router.push({ name: "profile"});
    },
    gotoUser() {
      this.$router.push({ name: "user"});
    },
    gotoShopCategory(category) {
      this.$router.push({ name: "shop", params: { category: category }});
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
.btn1 {
  width: 100px;
  height: 100px;
}
.images {
    height: 250px;
    width: 350px;
    /* margin-bottom: 5%; */
    /* margin-left: 5%; */
    transition: 1s;
    cursor: pointer;
    margin: auto;
    opacity: 0.7;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
}
.images:hover {
    transition: 1s;
    transform: scale(1.05);
    cursor: pointer;
    margin: auto;
    opacity: 1;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5);
}
.subtitle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.5s;
}
.subtitle:hover {
  color: black;
  cursor: pointer;
  transition: 0.5s;
}
#cards {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  transition: box-shadow 500ms;
}
#cards:hover {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5);
}
h2:hover {
  color: #DCDCDC;
  cursor: pointer;
}
</style>