<template>
    <v-app id="inspire" dark>
        <v-main>
            <v-parallax :src="require('../assets/backgroundHomepage.jpg')" height="1000">
                <v-container fluid fill-height>
                    <v-row align=center justify=center>
                        <v-snackbar v-model="snackbar_login_failed" :timeout="1200">Απαιτούνται email και password</v-snackbar> 
                        <!-- <v-snackbar v-model="snackbar_login_failed2" :timeout="1200">Login Failed</v-snackbar>  -->
                        <v-col cols=3>
                            <v-card class="elevation-24">
                                <v-toolbar dark color="success">
                                    <v-toolbar-title>Σύνδεση ως Παραγωγός</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="mdi-email" type="email" name="email" v-model="input.email" placeholder="Email" />
                                        <v-text-field prepend-icon="mdi-lock" type="password" name="password" v-model="input.password" placeholder="Password" />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="success" @click="loginProd()">Συνδεση</v-btn>
                                    <v-btn text small text depressed @click="gotoLog()">Συνδεση ως Καταναλωτης</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-parallax>
        </v-main>
    </v-app>
</template>

<script>
import BackEndApi from '../services/api/backEnd';

const sleep = (milliseconds) => { // sleep gia transition sto show info field
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
    name: 'Login',
    data() {
        return {
            snackbar_login_failed: false,
            // snackbar_login_failed2: false,
            input: {
                email: "",
                password: ""
            },
            isProducer: 1
        }
    },
    methods: {
        loginProd() {
            if(this.input.email != "" && this.input.password != "") {
                this.$store.dispatch('retrieveTokenProd', {
                    email: this.input.email,
                    password: this.input.password
                })
                .then(response => {
                    console.log("isproducer "+this.isProducer)
                    if(process.client)
                        localStorage.setItem("isProducer", this.isProducer);
                    this.$router.push({ path: '/shop'})
                    console.log('You are logged in now!');
                    this.input.email = ''
                    this.input.password = ''
                })
                .catch( function(error) {
                    // this.snackbar_login_failed2 = true;
                    console.log(error);
                });
            }
            else {
                this.snackbar_login_failed = true;
                console.log("A username and a password must be present");
            }
        },
        gotoLog() {
            this.$router.replace({ name: "login"});
        }
    },
    created () {
        // window.scrollTo(0,0);
        var yolo = false
        if(yolo==false) {
            var yolo = false
            // window.addEventListener('keydown', (e) => {
            //     if(!yolo) {
            //         if(e.key == 'Enter') {
            //             console.log(this.input.email)
            //             this.loginProd()
            //         }
            //     }
            // });
            // window.addEventListener('keyup', function() {
            //     yolo = false;
            // });
        }
    }
}
</script>
