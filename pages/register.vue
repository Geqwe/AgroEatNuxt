<template>
    <v-app id="inspire" dark>
        <v-main>
            <v-parallax :src="require('../assets/backgroundHomepage.jpg')" height="1000">
                <v-container fluid fill-height>
                    <v-row align=center justify=center>
                        <v-col cols=3>
                            <v-card class="elevation-24">
                                <v-toolbar dark color="success">
                                    <v-toolbar-title>Εγγραφή ως Καταναλωτής</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="mdi-email" type="email" name="email" v-model="email" placeholder="Email" />
                                        <v-text-field prepend-icon="mdi-account" type="text" name="username" v-model="username" placeholder="Όνομα Χρήστη" />
                                        <v-text-field prepend-icon="mdi-lock" type="password" name="password" v-model="password" placeholder="Password" />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="success" @click="register()">Εγγραφη</v-btn>
                                     <v-btn text depressed small text @click="gotoRegProducer()">Εγγραφη ως Παραγωγος</v-btn>
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
        register() {
            if(this.email != "" && this.username != "" && this.password != "") {
                BackEndApi.postCalls('/auth/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                })
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: 'login' })
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
        gotoRegProducer() {
            this.$router.push({ name: 'registerProducer' })
        }
    },
    created () {
        // window.scrollTo(0,0);
        // window.addEventListener('keydown', (e) => {
        //     if(e.key == 'Enter') {
        //         this.register();
        //     }
        // });
    }
}
</script>