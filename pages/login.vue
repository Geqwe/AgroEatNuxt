<template>
    <v-app id="inspire" dark>
        <v-main>
            <v-parallax :src="require('../assets/backgroundHomepage.jpg')" height="1000">
                <v-container fluid fill-height>
                    <v-row justify=center align=center>
                        <v-snackbar v-model="snackbar_login_failed" :timeout="1200">Απαιτούνται email και password</v-snackbar> 
                        <!-- <v-snackbar v-model="snackbar_login_failed2" :timeout="1200">Login Failed</v-snackbar>  -->
                        <v-col cols=3>
                            <v-card class="elevation-24">
                                <v-toolbar dark color="success">
                                    <v-toolbar-title>Σύνδεση ως Καταναλωτής</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="mdi-email" type="email" name="email" v-model="input.email" placeholder="Email" />
                                        <v-text-field prepend-icon="mdi-lock" type="password" name="password" v-model="input.password" placeholder="Password" />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="success" @click="login()">Συνδεση</v-btn>
                                    <v-btn text small text depressed @click="gotoLogProducer()">Συνδεση ως Παραγωγος</v-btn>
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
            isProducer: 0
        }
    },
    methods: {
        login() {
            if(this.input.email != "" && this.input.password != "") {
                this.$store.dispatch('retrieveToken', {
                    email: this.input.email,
                    password: this.input.password
                })
                .then(response => {
                    console.log("isproducer "+this.isProducer)
                    if(process.browser)
                        localStorage.setItem("isProducer", this.isProducer);
                    this.$router.push({ path: '/shop'})
                    console.log('You are logged in now!');
                    this.input.email = ''
                    this.input.password = ''
                    console.log("Login "+this.$store.state.loggedIn)
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
        gotoLogProducer() {
            this.$router.push({ name: "loginProducer"});
        },
    },
    created () {
        console.log("Login "+this.$store.state.loggedIn)
        // window.scrollTo(0,0);
        // window.addEventListener('keydown', (e) => {
            // if(e.key == 'Enter') {
                // this.login();
            // }
        // });
    }
}
</script>
