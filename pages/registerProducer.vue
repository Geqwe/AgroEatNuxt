<template>
    <v-app id="inspire" dark>
        <v-main>
            <v-parallax :src="require('../assets/backgroundHomepage.jpg')" height="1000">
                <v-container fluid fill-height>
                    <v-row align=start justify=center>
                        <v-col cols=3 sm3 md3 lg3 xl3>
                            <v-card class="elevation-24">
                                <v-toolbar dark color="success">
                                    <v-toolbar-title>Εγγραφή ως Παραγωγός</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="mdi-email" type="email" name="email" v-model="email" placeholder="Email" />
                                        <v-text-field prepend-icon="mdi-account" type="text" name="username" v-model="username" placeholder="Όνομα Χρήστη" />
                                        <v-text-field prepend-icon="mdi-lock" type="password" name="password" v-model="password" placeholder="Password" />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="success" @click="registerProd()">Εγγραφη</v-btn>
                                     <v-btn text depressed small text @click="gotoReg()">Εγγραφη ως Καταναλωτης</v-btn>
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
    name: 'Register',
    data() {
        return {
            email: "",
            username: "",
            password: ""
        }
    },
    methods: {
        registerProd() {
            if(this.email != "" && this.username != "" && this.password != "") {
                BackEndApi.postCalls('/auth/registerProd', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                })
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'loginProducer' })
                    this.input.email = ''
                    this.input.password = ''
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else {
                console.log("An email, a username and a password must be present");
            }
        },
        gotoReg() {
            this.$router.push({ name: "register"});
        }
    },
    created () {
        // window.scrollTo(0,0);
        // window.addEventListener('keydown', (e) => {
        //     if(e.key == 'Enter') {
        //         this.registerProd();
        //     }
        // });
    }
}
</script>