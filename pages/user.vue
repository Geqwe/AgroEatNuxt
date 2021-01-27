<template>
    <v-app dark>
        <v-main>
            <div class="User">
                <v-row >
                    <v-col cols=12 align="center" justify="center">
                        <h1 v-if="isProducerHere==0" class="text-lg-center" style="font-size:40px">Προφίλ</h1>
                        <h1 v-if="isProducerHere==1" class="text-lg-center" style="font-size:40px">Πίνακας Ελέγχου</h1>
                    </v-col>
                </v-row>
                <v-container v-if="isProducerHere==0" fluid fill-height text-cols=-center>
                        <v-row >
                            <v-col cols=3>
                                <v-row >
                                    <v-col cols=12 align="center" justify="center">
                                        <img class="userProf" style="max-height: 350px;max-width: 350px;" src=""/>
                                        <br>
                                        <label class="new-button" for="file">Αλλαγή εικόνας προφίλ</label>
                                        <input @click="save=true" @change="GetImage" type="file" id="file" ref="file" />
                                        <v-btn v-if="save==true" color="success" @click="changePic();save=false;">Αποθήκευση</v-btn>
                                    </v-col>
                                    <v-col cols=12 align="center" justify="center" class="ml-4">
                                        <h2 class="prod_text">{{ input.username }}</h2>
                                        <v-icon dark color="primary">mdi-map-marker</v-icon>
                                        <span style="font-size:18px" >{{input.address}}, {{input.city}}</span>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols=1><v-divider vertical></v-divider></v-col>
                            <v-col cols=8 align="center" justify="center">
                                <v-tabs centered color="#4caf50" dark icons-and-text>
                                    <v-tabs-slider color="yellow"></v-tabs-slider>
                                    <v-tab href="#tab-1">
                                        Επεξεργασία
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-tab>
                                    <v-tab href="#tab-2">
                                        Παραγγελίες
                                    <v-icon>mdi-storefront</v-icon>
                                    </v-tab>
                                    <v-tab href="#tab-3">
                                        Λίστα
                                    <v-icon>mdi-cards-heart</v-icon>
                                    </v-tab>

                                    <v-tab-item v-for="tab in tabs" :key="tab.id" :value="'tab-' + tab.id">
                                        <v-card text>
                                            <div v-if="tab.id=='2'">
                                                <v-tabs centered color="#4caf50" dark icons-and-text>
                                                    <v-tabs-slider color="yellow"></v-tabs-slider>
                                                    <v-tab href="#tab-1">
                                                        Τρέχουσες Παραγγελίες
                                                    <v-icon>mdi-assignment_late</v-icon>
                                                    </v-tab>
                                                    <v-tab href="#tab-2">
                                                        Ιστορικό Παραγγελιών
                                                        <v-icon>mdi-history</v-icon>
                                                    </v-tab>
                                                    <v-tab-item v-for="tab in ordertabs2" :key="tab.id" :value="'tab-' + tab.id">
                                                        <div v-if="tab.id=='1'">
                                                            <v-card outlined dark class="mx-auto mt-2">
                                                                <v-row v-for="order in pendingOrders" :key="order.id" >
                                                                    <v-col cols=12 align="center" justify="center">
                                                                        <div id="divider" style="height: 5px; width:100%;"></div>
                                                                        <v-card>
                                                                            <v-row > 
                                                                                <v-col cols=2 align-self-center>
                                                                                    <span>Παραγγελία</span>
                                                                                </v-col>
                                                                                <v-col cols=5 align-start>
                                                                                    <div v-for="product in order.products" :key="product.productName">
                                                                                        <span>{{product.productName}}({{product.productQuantity}}) -- {{product.producerName}}</span>
                                                                                    </div>
                                                                                </v-col>
                                                                                <v-col cols=2 align-self-center>
                                                                                    <span>Σύνολο: {{order.sum}} €</span>
                                                                                </v-col>
                                                                                <v-col cols=3 align-self-center>
                                                                                    <span>Κατάσταση: <span style="color:#add8e6">Συλλογή Αποθεμάτων</span></span>
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-card>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card>
                                                        </div>
                                                        <div v-if="tab.id=='2'">
                                                            <v-card outlined dark class="mx-auto mt-2">
                                                                <v-row v-for="order in pendingOrders" :key="order.id" >
                                                                    <v-col cols=12 align="center" justify="center">
                                                                        <v-row >
                                                                            <v-col cols=2 align-self-center>
                                                                                <span>Παραγγελία</span>
                                                                            </v-col>
                                                                            <v-col cols=5 align-start>
                                                                                <div v-for="product in order.products" :key="product.productName">
                                                                                    <span>{{product.productName}}({{product.productQuantity}}) -- {{product.producerName}}</span>
                                                                                    <v-btn color="success" @click="openRating=true;ratingProdName=product.producerName;ratingName=product.productName;">Βαθμολογηστε</v-btn>
                                                                                    
                                                                                </div>
                                                                                <v-dialog persistent ref="dial4" v-model="openRating" max-width="1000px" dark>
                                                                                        <v-card dark>
                                                                                            <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Πώς σας φάνηκε το προϊόν;</v-card-title>
                                                                                            <v-divider></v-divider>
                                                                                            <v-row >
                                                                                                <v-col cols=9>
                                                                                                    <v-text-field class="ml-2" prepend-icon="mdi-comment" label="Σχόλιο" v-model="comment"></v-text-field>
                                                                                                </v-col>
                                                                                                <v-col cols=3>
                                                                                                    <v-rating v-model="rateForProd"></v-rating>
                                                                                                </v-col>
                                                                                                <v-col cols=12 align="center" justify="center">
                                                                                                    <v-btn color="success" @click="rate(ratingName, ratingProdName);openRating=false">Καταχωρηση</v-btn>
                                                                                                    <v-btn @click="openRating=false">Κλεισιμο</v-btn>
                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </v-card>
                                                                                    </v-dialog>
                                                                            </v-col>
                                                                            <v-col cols=2 align-self-center>
                                                                                <span>Σύνολο: {{order.sum}} €</span>
                                                                            </v-col>
                                                                            <v-col cols=3 align-self-center>
                                                                                <v-btn text small dark icon><v-icon color="red" dark>mdi-delete</v-icon></v-btn>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card>
                                                        </div>
                                                    </v-tab-item>
                                                </v-tabs>
                                            </div>
                                            <v-form v-else-if="tab.id=='1' && edit==false">
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-account-circle" type="text" name="username" v-model="input.username" placeholder="Όνομα Χρήστη">{{input.username}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-email" type="email" name="email" v-model="input.email" placeholder="Email">{{input.email}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-map-marker" type="text" name="address" v-model="input.address" placeholder="Διεύθυνση">{{input.address}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-city" type="text" name="city" v-model="input.city" placeholder="Πόλη">{{input.city}}</v-text-field>
                                                <v-btn class="ml-2" color="success" @click="edit=true">Edit</v-btn>
                                            </v-form>
                                            <v-form v-else-if="tab.id=='1' && edit==true">
                                                <v-text-field class="ml-2" prepend-icon="mdi-account-circle" label="Username" v-model="input.username">{{input.username}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-email" label="Email" v-model="input.email">{{input.email}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-map-marker" label="Διεύθυνση" v-model="input.address">{{input.address}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-city" label="Πόλη" v-model="input.city">{{input.city}}</v-text-field>
                                                <v-btn class="ml-2" color="success" @click="EditProfile()">Submit</v-btn>
                                            </v-form>
                                            <v-container v-else-if="tab.id=='3'" grid-list-md text-cols=-center>
                                                <v-row align="center" justify="center" v-for="product in wishlistProducts" :key="product.id">
                                                    <v-col v-if="product.favorite==true" cols=12 align="center" justify="center">
                                                        <v-card outlined dark class="mx-auto mt-2">
                                                            <v-row align="center" justify="center">
                                                                <v-col cols=3 align="start" justify="start">
                                                                    <img @click="gotoProd(product.name, product.producerName)" class="images" :src="'http://10.64.92.213:4001/'+product.image"/>
                                                                    <!-- <v-img @click="gotoProd(product.id)" class="images" v-bind:src="require(product.image)"/> -->
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
                                                                <v-col cols=4 align="center" justify="center">
                                                                    <h3 @click="gotoProd(product.name, product.producerName)" class="product_text">{{product.name}}</h3>
                                                                    <span class="text-align-left">Κατηγορία: {{product.category}}</span>
                                                                    <br><span class="text-align-left">Παραγωγός:<span @click="findProducer(product.producerName)" class="produc_Text"> {{product.producerName}}</span></span>
                                                                </v-col>
                                                                <v-divider vertical></v-divider>
                                                                <v-col cols=3 align="center" justify="center">
                                                                    <h3>Τιμή: {{product.price}} €</h3>
                                                                    <!-- <h3 v-else style="text-decoration:line-through">Τιμή: {{product.price}}</h3> -->
                                                                    <!-- <h3 v-if="product.onsale==true"> Με έκπτωση: {{product.sale_price}}</h3> -->
                                                                </v-col>
                                                                <v-divider vertical></v-divider>
                                                                <v-col cols=1 align="center" justify="center">
                                                                    <add-to-cart :name="product.name" :price="parseInt(product.price)" :productID="product.id.toString()" :image="product.image" :producerName="product.producerName"></add-to-cart>
                                                                    <v-btn @click="product.favorite=false;remFromWishlist(product);" block text small dark><v-icon dark color="primary">mdi-cards-heart</v-icon></v-btn>
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
                <v-container v-else-if="isProducerHere==1" fluid fill-height text-cols=-center>
                        <v-row >
                            <v-col cols=3>
                                <v-row >
                                    <v-col cols=12 align="center" justify="center">
                                        <img class="prof" style="max-height: 250px;max-width: 250px;" src=""/>
                                        <br>
                                        <label class="new-button" for="file">Αλλαγή εικόνας προφίλ</label>
                                        <input @click="save=true" @change="GetImage" type="file" id="file" ref="file" />
                                        <v-btn v-if="save==true" color="success" @click="changePic();save=false;">Αποθήκευση</v-btn>
                                    </v-col>
                                    <v-col cols=12 align="center" justify="center">
                                        <h3 class="prod_text">{{ input.company_name }}</h3>
                                        <v-icon dark color="primary">mdi-map-marker</v-icon>
                                        <span style="font-size:18px" >{{input.address}}, {{input.city}}</span>
                                        <h3>{{numOfProds}} Προϊόντα</h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols=1><v-divider vertical></v-divider></v-col>
                            <v-col cols=8 align="center" justify="center">
                                <v-tabs centered color="#4caf50" dark icons-and-text>
                                    <v-tabs-slider color="yellow"></v-tabs-slider>
                                    <v-tab href="#tab-1">
                                        Περιγραφη
                                    <v-icon>mdi-information</v-icon>
                                    </v-tab>
                                    <v-tab href="#tab-2">
                                        Πληροφοριες
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-tab>
                                    <v-tab href="#tab-3">
                                        Προϊοντα
                                    <v-icon>mdi-storefront</v-icon>
                                    </v-tab>
                                    <v-tab href="#tab-4">
                                        Παραγγελιες
                                    <v-icon>mdi-clipboard-text</v-icon>
                                    </v-tab>
                                    <v-tab href="#tab-5">
                                        Στατιστικα
                                    <v-icon>mdi-poll-box</v-icon>
                                    </v-tab>

                                    <v-tab-item v-for="tab in tabs" :key="tab.id" :value="'tab-' + tab.id">
                                        <v-card text>
                                            <div v-if="tab.id=='1'">
                                                <v-card-text class="ml-2 mr-2" v-if="edit==false">{{ input.about }}</v-card-text>
                                                <v-btn v-if="edit==false" class="ml-2" color="success" @click="edit=true">Επεξεργασια</v-btn>
                                                <v-text-field class="ml-2 mr-2" v-else-if="edit==true" v-model="input.about">{{ input.about }} </v-text-field>
                                                <v-btn v-if="edit==true" class="ml-2" color="success" @click="EditAboutProducer()">Καταχωρηση</v-btn>
                                            </div>
                                            <v-form class="ml-2 mr-5" v-else-if="tab.id=='2' && edit==false">
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-account-circle" type="text" name="username" v-model="input.username" placeholder="Όνομα Χρήστη">{{input.username}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-email" type="email" name="email" v-model="input.email" placeholder="Email">{{input.email}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-map-marker" type="text" name="address" v-model="input.address" placeholder="Διεύθυνση">{{input.address}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-domain" type="text" name="city" v-model="input.city" placeholder="Πόλη">{{input.city}}</v-text-field>
                                                <v-text-field disabled class="ml-2" prepend-icon="mdi-city" type="text" name="company_name" v-model="input.company_name" placeholder="Επωνυμία Εταιρείας">{{input.company_name}}</v-text-field>
                                                <v-btn class="ml-2" color="success" @click="edit=true">Επεξεργασια</v-btn>
                                            </v-form>
                                            <v-form class="ml-2 mr-5" v-else-if="tab.id=='2' && edit==true">
                                                <v-text-field class="ml-2" prepend-icon="mdi-account-circle" v-model="input.username">{{input.username}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-email" v-model="input.email">{{input.email}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-map-marker" v-model="input.address">{{input.address}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-business" v-model="input.city">{{input.city}}</v-text-field>
                                                <v-text-field class="ml-2" prepend-icon="mdi-city" v-model="input.company_name">{{input.company_name}}</v-text-field>
                                                <v-btn class="ml-2" color="success" @click="EditProfileProducer()">Καταχωρηση</v-btn>
                                            </v-form>
                                            <v-container v-else-if="tab.id=='3'" grid-list-md text-cols=-center>
                                                <v-dialog persistent ref="dial2" v-model="dialog2" max-width="1000px" dark>
                                                    <v-card dark>
                                                        <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Επεξεργασία Προϊόντος</v-card-title>
                                                        <v-divider></v-divider>
                                                        <v-row align="center" justify="center">
                                                            <v-col cols=12 align="center" justify="center">
                                                                <v-card text dark class="mx-auto mt-2 ml-2" >
                                                                    <v-row  style="align-items: center; justify-content: center;">
                                                                        <v-col cols=4>
                                                                            <img id="edit_image" class="image_prod" style="max-height: 100%;max-width: 100%;" :src="'http://10.64.92.213:4001/'+dial_product.image"/>
                                                                            <br>
                                                                            <label class="new-button2" for="file2">Φωτογραφία Προϊόντος</label>
                                                                            <input @change="GetImageProd" class="image_prod" type="file" id="file2" ref="file2" />
                                                                        </v-col>
                                                                        <v-col cols=3>
                                                                            <v-text-field class="ml-2" type="text" v-model="dial_product.name" label="Όνομα">{{dial_product.name}}</v-text-field>
                                                                            <v-text-field class="ml-2" type="number" v-model="dial_product.price" label="Τιμή">{{dial_product.price}} €</v-text-field>
                                                                        </v-col>
                                                                        <v-col cols=3>
                                                                            <v-text-field class="ml-2" type="number" v-model="dial_product.stock" label="Διαθέσιμα">{{dial_product.stock}}</v-text-field>
                                                                            <v-select class="ml-2" :items="categories" v-model="dial_product.category" label="Κατηγορία">{{dial_product.category}}</v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                        <v-card-actions style="align-items: center; justify-content: center;">
                                                            <v-btn color="success" @click="EditProduct(dial_product, dial_product.image);dialog2=false;">Επικυρωση</v-btn>
                                                            <v-btn color="gray" @click="dialog2=false;">Κλεισιμο</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-dialog persistent ref="dial3" v-model="dialog3" max-width="1000px" dark>
                                                    <v-card dark>
                                                        <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Διαγραφή Προϊόντος</v-card-title>
                                                        <v-divider></v-divider>
                                                        <v-row align="center" justify="center">
                                                            <v-col cols=12 align="center" justify="center">
                                                                <v-card flat dark class="mx-auto mt-2 ml-2">
                                                                    <v-row >
                                                                        <v-col cols=12 align="center" justify="center">
                                                                            <img class="image_prod" style="max-height: 250px;max-width: 250px;" :src="'http://10.64.92.213:4001/'+dial_product.image"/>
                                                                            <br>
                                                                            <label class="new-button2" for="file2">Φωτογραφία Προϊόντος</label>
                                                                            <input @change="GetImageProd" class="image_prod" type="file" id="file2" ref="file2" />
                                                                        </v-col>
                                                                        <v-col cols=6>
                                                                            <v-text-field class="ml-2" type="text" v-model="dial_product.name" label="Όνομα">{{dial_product.name}}</v-text-field>
                                                                            <v-text-field class="ml-2" type="number" v-model="dial_product.price" label="Τιμή">{{dial_product.price}} €</v-text-field>
                                                                        </v-col>
                                                                        <v-col cols=6>
                                                                            <v-text-field class="ml-2" type="number" v-model="dial_product.stock" label="Διαθέσιμα">{{dial_product.stock}}</v-text-field>
                                                                            <v-select class="ml-2" :items="categories" v-model="dial_product.category" label="Κατηγορία">{{dial_product.category}}</v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                        <v-card-actions>
                                                            <v-btn color="red" @click="DeleteProduct(dial_product);dialog3=false;">Σβησιμο</v-btn>
                                                            <v-btn color="gray" @click="dialog3=false;">Κλεισιμο</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-row align="center" justify="center" v-for="product in prodsToShow" :key="product.name">
                                                    <v-col cols=12 align="center" justify="center">
                                                        <v-card outlined dark class="mx-auto mt-2">
                                                            <v-row align="center" justify="center">
                                                                <v-col cols=2 align="start" justify="center">
                                                                    <img @click="gotoProd(product.name, input.company_name)" class="images" :src="'http://10.64.92.213:4001/'+product.image"/>
                                                                    <!-- <v-img @click="gotoProd(product.id)" class="images" v-bind:src="require(product.image)"/> -->
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
                                                                <v-col cols=4 align="center" justify="center">
                                                                    <h3 @click="gotoProd(product.name, input.company_name)" style="color:#4caf50;cursor: pointer;">{{product.name}}</h3>
                                                                    <span class="text-align-left">Κατηγορία: {{product.category}}</span>
                                                                </v-col>
                                                                <v-divider vertical></v-divider>
                                                                <v-col cols=3 align="center" justify="center">
                                                                    <h3>Τιμή: {{product.price}} €</h3>
                                                                    <!-- <h3 v-else style="text-decoration:line-through">Τιμή: {{product.price}}</h3> -->
                                                                    <!-- <h3 v-if="product.onsale==true"> Με έκπτωση: {{product.sale_price}}</h3> -->
                                                                </v-col>
                                                                <v-divider vertical></v-divider>
                                                                <v-col cols=1 align="center" justify="center">
                                                                    <v-btn text small dark icon slot="activator" @click="dialog2=true;dial_product=product;dial_product.image=product.image;"><v-icon color="primary" dark>mdi-pencil</v-icon></v-btn>
                                                                    <v-btn text small dark icon slot="activator" @click="dialog3=true;dial_product=product"><v-icon color="red" dark>mdi-delete</v-icon></v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                                <v-dialog ref="dial" persistent v-model="dialog" max-width="1000px" dark>
                                                    <v-btn color="primary" slot="activator" @click="dialog=true;" dark class="mt-3"><v-icon dark>mdi-plus</v-icon></v-btn>
                                                    <v-card dark>
                                                        <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Νέο Προϊόν</v-card-title>
                                                        <v-divider></v-divider>
                                                        <v-row align="center" justify="center">
                                                            <v-col cols=12 align="center" justify="center">
                                                                <v-card flat dark class="mx-auto mt-2 ml-2">
                                                                    <v-row align="center" justify="center">
                                                                        <v-col cols=12 align="center" justify="center">
                                                                            <img class="image_prod" style="max-height: 250px;max-width: 250px;" :src="'http://10.64.92.213:4001/'+product.image"/>
                                                                            <br>
                                                                            <label class="new-button2" for="file2">Φωτογραφία Προϊόντος</label>
                                                                            <input @change="GetImageProd" class="image_prod" type="file" id="file2" ref="file2" />
                                                                        </v-col>
                                                                        <v-col cols=6 align="center" justify="center">
                                                                            <v-text-field class="ml-2" type="text" v-model="product.name" label="Όνομα">{{product.name}}</v-text-field>
                                                                            <v-text-field class="ml-2" type="number" v-model="product.price" label="Τιμή">{{product.price}} €</v-text-field>
                                                                        </v-col>
                                                                        <v-col cols=6 align="center" justify="center">
                                                                            <v-text-field class="ml-2" type="number" v-model="product.stock" label="Διαθέσιμα">{{product.stock}}</v-text-field>
                                                                            <v-select class="ml-2" :items="categories" v-model="product.category" label="Κατηγορία">{{product.category}}</v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                        <v-card-actions>
                                                            <v-btn color="success" @click="AddNewProduct();dialog=false;">Προσθηκη</v-btn>
                                                            <v-btn color="red" @click="dialog=false;">Κλεισιμο</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <br>
                                                <label class="new-button mt-2" for="input">Ανέβασμα προϊόντων μέσω XLSX</label>
                                                <input class="mt-2" @click="save2=true" type="file" id="input" />
                                                <v-btn class="mt-2" v-if="save2==true" color="success" @click="excelFile();save2=false;">Αποθήκευση Προϊόντων</v-btn>
                                                <br>
                                                <label class="new-button mt-2" for="inputPhotos">Ανέβασμα πολλαπλών φωτογραφιών</label>
                                                <input @click="multipleSave=true" type="file" id="inputPhotos" ref="inputPhotos" multiple/>
                                                <v-btn class="mt-2" v-if="multipleSave==true" color="success" @click="uploadMultiplePhotos();multipleSave=false;">Αποθήκευση Φωτογραφιών</v-btn>
                                            </v-container>
                                            <div v-if="tab.id=='4'">
                                                <v-tabs centered color="#4caf50" dark icons-and-text>
                                                    <v-tabs-slider color="yellow"></v-tabs-slider>
                                                    <v-tab href="#tab-1">
                                                        Τρέχουσες Παραγγελίες
                                                    <v-icon>mdi-assignment_late</v-icon>
                                                    </v-tab>
                                                    <v-tab href="#tab-2">
                                                        Ιστορικό Παραγγελιών
                                                        <v-icon>mdi-history</v-icon>
                                                    </v-tab>
                                                    <v-tab-item v-for="tab in order_tabs" :key="tab.id" :value="'tab-' + tab.id">
                                                        <div v-if="tab.id=='1'">
                                                            <v-card outlined dark class="mx-auto mt-2">
                                                                <v-row v-for="order in pendingOrders" :key="order.id" >
                                                                    <v-col cols=12 align="center" justify="center">
                                                                        <div id="divider" style="height: 5px; width:100%;"></div>
                                                                        <v-card>
                                                                            <v-row > 
                                                                                <v-col cols=2 align-self-center>
                                                                                    <span>Παραγγελία</span>
                                                                                </v-col>
                                                                                <v-col cols=4 align-self-center>
                                                                                    <div v-for="product in order.products" :key="product.productName">
                                                                                        <span v-if="product.producerName==input.company_name">{{product.productName}}({{product.productQuantity}}) -- {{product.producerName}}</span>
                                                                                    </div>
                                                                                </v-col>
                                                                                <v-col cols=2 align-self-center>
                                                                                    <v-btn text small dark color="primary" @click="openOrder(order);orderDial=true;">Προεπισκοπηση</v-btn>
                                                                                </v-col>
                                                                                <v-col cols=2 align-self-center>
                                                                                    <span>Σύνολο: {{order.sum}} €</span>
                                                                                </v-col>
                                                                                <v-col cols=2 align-self-center>
                                                                                    <v-btn @click="openOrder(order);orderDial=true;" text small dark icon><v-icon color="primary" dark>mdi-information</v-icon></v-btn>
                                                                                    <v-btn text small dark icon><v-icon color="success" dark>mdi-check_circle</v-icon></v-btn>
                                                                                    <v-btn tet small dark icon><v-icon color="red" dark>mdi-highlight_off</v-icon></v-btn>
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-card>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-dialog persistent ref="dial5" v-model="orderDial" max-width="1000px" dark>
                                                                    <v-card dark>
                                                                        <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Στοιχεία Παραγγελίας</v-card-title>
                                                                        <v-divider></v-divider>
                                                                        <v-row >
                                                                            <v-col cols=12 align="center" justify="center">
                                                                                <v-row >
                                                                                    <v-col cols=6>
                                                                                        <v-text-field disabled class="ml-2 mr-2" type="text" v-model="dialOrder.firstName" label="Όνομα">{{dialOrder.firstName}}</v-text-field>
                                                                                        <v-text-field disabled class="ml-2 mr-2" type="text" v-model="dialOrder.company_name" label="Επωνυμία Εταιρείας">{{dialOrder.companyName}}</v-text-field>
                                                                                        <v-text-field disabled class="ml-2 mr-2" type="text" v-model="dialOrder.address" label="Διεύθυνση Αποστολής">{{dialOrder.shippingAddress}}</v-text-field>
                                                                                    </v-col>
                                                                                    <v-col cols=6>
                                                                                        <v-text-field disabled class="ml-2 mr-2" type="text" v-model="dialOrder.lastName" label="Επίθετο">{{dialOrder.lastName}}</v-text-field>
                                                                                        <v-text-field disabled class="ml-2 mr-2" type="text" v-model="dialOrder.phoneNumber" label="Αριθμός Τηλεφώνου">{{dialOrder.phoneNumber}}</v-text-field>
                                                                                        <v-text-field disabled class="ml-2 mr-2" type="text" v-model="dialOrder.postalCode" label="Ταχυδρομικός Κώδικας">{{dialOrder.postalCode}}</v-text-field>
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-col>
                                                                            <v-col cols=12 align="center" justify="center">
                                                                                <v-row >
                                                                                    <v-col cols=6>
                                                                                        <div v-for="product in dialOrder.products" :key="product.productName">
                                                                                            <v-row v-if="product.producerName==input.company_name" >
                                                                                                <v-col cols=3>
                                                                                                    <img class="ml-2" width="80px" :src="'http://10.64.92.213:4001/'+product.product_image"/>
                                                                                                </v-col>
                                                                                                <v-col cols=9 align-self-center>
                                                                                                    <h4 class="mr-2">{{product.productName}}({{product.productQuantity}}) -- {{product.producerName}}</h4>
                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </div>
                                                                                    </v-col>
                                                                                    <v-col cols=6>
                                                                                        <v-row >
                                                                                            <v-col cols=6>
                                                                                                <!-- <barcode v-bind:value="dialOrder.phoneNumber" /> -->
                                                                                                <div >
                                                                                                    <qrcode-vue id="toPrint" :value="dialOrder.phoneNumber" renderAs="svg" :size="200" level="H"></qrcode-vue>
                                                                                                </div>
                                                                                            </v-col>
                                                                                            <v-col cols=6 align-self-center>
                                                                                                
                                                                                                <v-btn @click="printQR()" color="primary"><v-icon class="mr-2" color="white" dark>mdi-print</v-icon>Εκτυπωση QR Code</v-btn>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-col>
                                                                            <v-col cols=12 align="center" justify="center">
                                                                                <!-- <v-btn color="success" @click="rate(ratingName, ratingProdName);openRating=false">Καταχωρηση{{ratingProdName}}</v-btn> -->
                                                                                <v-btn @click="orderDial=false">Κλεισιμο</v-btn>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </v-card>
                                                        </div>
                                                        <div v-if="tab.id=='2'">
                                                            <v-card outlined dark class="mx-auto mt-2">
                                                                <v-row v-for="order in pendingOrders" :key="order.id" >
                                                                    <v-col cols=12 align="center" justify="center">
                                                                        <v-row >
                                                                            <v-col cols=2 align-self-center>
                                                                                <span>Παραγγελία</span>
                                                                            </v-col>
                                                                            <v-col cols=5 align-self-center>
                                                                                <div v-for="product in order.products" :key="product.productName">
                                                                                    <span v-if="product.producerName==input.company_name">{{product.productName}}({{product.productQuantity}}) -- {{product.producerName}}</span>
                                                                                    <!-- <v-btn color="success" @click="openRating=true;ratingProdName=product.producerName;ratingName=product.productName;">Βαθμολογηστε</v-btn> -->
                                                                                    
                                                                                </div>
                                                                                <!-- <v-dialog persistent ref="dial4" v-model="openRating" max-width="1000px" dark>
                                                                                        <v-card dark>
                                                                                            <v-card-title style="font-size:40px; font-weight: bold;" primary-title>Πώς σας φάνηκε το προϊόν;</v-card-title>
                                                                                            <v-divider></v-divider>
                                                                                            <v-row >
                                                                                                <v-col cols=9>
                                                                                                    <v-text-field class="ml-2" prepend-icon="comment" label="Σχόλιο" v-model="comment"></v-text-field>
                                                                                                </v-col>
                                                                                                <v-col cols=3>
                                                                                                    <v-rating v-model="rateForProd"></v-rating>
                                                                                                </v-col>
                                                                                                <v-col cols=12 align="center" justify="center">
                                                                                                    <v-btn color="success" @click="rate(ratingName, ratingProdName);openRating=false">Καταχωρηση{{ratingProdName}}</v-btn>
                                                                                                    <v-btn @click="openRating=false">Κλεισιμο</v-btn>
                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </v-card>
                                                                                    </v-dialog> -->
                                                                            </v-col>
                                                                            <v-col cols=2 align-self-center>
                                                                                <span>Σύνολο: {{order.sum}} €</span>
                                                                            </v-col>
                                                                            <v-col cols=2 align-self-center>
                                                                                <v-btn text small dark icon><v-icon color="red" dark>mdi-delete</v-icon></v-btn>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card>
                                                        </div>
                                                    </v-tab-item>
                                                </v-tabs>
                                            </div>
                                            <div v-if="tab.id=='5'">
                                                <v-row >
                                                    <v-col cols=6>
                                                    <v-card flat class="mx-auto text-center" color="#03ad6f" dark max-width="1000px">
                                                        <v-card-text>
                                                            <v-sheet color="rgba(0, 0, 0, .12)">
                                                                <v-sparkline :value="value" color="rgba(255, 255, 255, .7)" height="100" padding="24" show-labels />
                                                            </v-sheet>
                                                        </v-card-text>
                                                        <v-card-text>
                                                            <div class="display-1 font-weight-thin">Μηνιαίες Πωλήσεις</div>
                                                        </v-card-text>
                                                        <v-divider></v-divider>
                                                    </v-card>
                                                </v-col>
                                                <v-col cols=6>
                                                    <v-card flat class="mx-auto text-center" color="#04df8f" dark max-width="1000px">
                                                        <v-progress-circular rotate="90" class="mt-4" size="210" width="20" :value="progress_circle_value" color="blue" style="font-size: 35px;">{{progress_circle_value}}%</v-progress-circular>
                                                        <v-card-text>
                                                            <div class="display-1 font-weight-thin">Απόθεμα Προϊόντων</div>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                </v-row>
                                            </div>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>
                            </v-col>
                        </v-row>
                </v-container>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import BackEndApi from '../services/api/backEnd';
import readXlsxFile from 'read-excel-file'
import VueBarcode from 'vue-barcode';
import QrcodeVue from 'qrcode.vue';
import VueHtmlToPaper from 'vue-html-to-paper';
import Vue from 'vue';

Vue.use(VueHtmlToPaper);

export default {
    name: "User",
    components: {
        'barcode': VueBarcode,
        QrcodeVue,
        // VueHtmlToPaper
    },
    
    data() {
        return {
            dialOrder: [],
            orderDial: false,
            barcodeValue: 'yolo',
            ratingProdName: '',
            ratingName: '',
            save2:false,
            multipleSave:false,
            progress_circle_value: 25,
            ordertabs2: [{id:'1',text:"Δεν βρέθηκαν κριτικές"},
                {id:'2',text:"Δεν βρέθηκαν κριτικές"}],
            value: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
            ],
            name:'Γιώργος Κλέτσας', address:"Φιλικής Εταιρείας 78", city:"Βόλος", image:"profile.png",
            order_tabs: [
                {id:'1',text:"Δεν βρέθηκαν κριτικές"},
                {id:'2',text:"Δεν βρέθηκαν κριτικές"}
            ],
            tabs: [
                {id:'1',text:"Δεν βρέθηκαν κριτικές"},
                {id:'2',text:"Δεν βρέθηκαν κριτικές"},
                {id:'3',text: [
                    {id:1, name: "Μήλα Ζαγοράς", rating:5, price:10, producer:"Τάκης", stock: 10, category:"Μήλα", onsale:false, sale_price:8, image: "apples.jpg"},
                    {id:2, name: "Αχλάδια Μελιβοίας", rating:4.2, price:8, producer:"Μήτσος", stock: 5, category:"Αχλάδια", onsale:true, sale_price:6, image: "pears.jpg"},
                ],
                },
                {id:'4',text:"Παραγγελία: Αχλάδια Μελιβοίας(2)"},
                {id:'5',text:"Στατιστικα"},
            ],
            input: {
                email: "",
                old_password: "",
                new_password: "",
                username: "",
                address: "",
                image: '',
                about: '',
                ratings: '',
                products: '',
                company_name: '',
                city: "",
                wishlist: '',
                orders: []
            },
            dialog2: false,
            edit: false,
            file: '',
            save: false,
            isProducerHere: '',
            dialog: false,
            dialog3: false,
            file2: '',
            product: {
                name: "", price: "", stock: '', category: "", image: "", ratings: ''
            },
            dial_product: {
                name: "", price: "", stock: '', category: "", image: "", ratings: ''
            },
            di_product: {
                name: "", price: "", stock: '', category: "", image: "", ratings: ''
            },
            productToAdd: '',
            lastID: '',
            productsForSplit: {
                // {id:''}, {name: ""}, {price: ""}, {stock: ''}, {category: ""}, {image: ""}, {ratings: ""}
                id:'',name: "",price: "",stock: '',category: "",image: "",ratings: ""
            
            },
            theSplittedProds: [],
            prodsToShow: [],
            split: '',
            check: '',
            numOfProds: 0,
            categories: [
                'Μέλι','Φρούτα','Όσπρια','Ξηροί Καρποί','Ζυμαρικά','Γλυκά και Αρτοπαρασκευάσματα','Λαχανικά','Κάβα','Υγιεινή και Περιποίηση'
            ],
            wishlistProducts: [],
            myEmail: '',
            pendingOrders: [],
            openRating: false,
            rateForProd: 0,
            comment: ''
        }
    },
    created () {
        if(process.client)
            window.scrollTo(0,0);
        this.getInfo()
    },
    methods: {
        openOrder(order) {
            console.log(order);
            this.dialOrder = order
        },
        getInfo() {
            // var barc = new VueBarcode();
            var isProducer = 0;
            var token = "";
            var myemail = "";
            if(process.client) {
                token = localStorage.getItem("access_token");
                axios.defaults.headers.common["Authorization"] =  token;
                myemail = localStorage.getItem("email");
                isProducer = localStorage.getItem("isProducer");
            }
            this.myEmail = myemail
            this.isProducerHere = isProducer;
            console.log(this.isProducerHere + " "+ isProducer)
            if(isProducer == 0) {
                BackEndApi.postCalls('/users/email', {
                    email: myemail
                })
                .then(response => {
                    console.log(response.data);
                    this.input.email = response.data.email
                    this.input.username = response.data.username
                    this.input.address = response.data.address
                    this.input.city = response.data.city
                    this.input.image = response.data.image
                    this.input.wishlist = response.data.wishlist
                    this.input.orders = response.data.orders_check
                    console.log(this.input.orders)
                    var splittedProds = this.input.wishlist.split('|')
                    for(var i=0;i<splittedProds.length;i++) {
                         var productsForSplit = new Object();
                        productsForSplit.id = i
                        var splitted = [];
                        splitted = splittedProds[i].split(',') 
                        productsForSplit.name = splitted[0]
                        productsForSplit.price = parseInt(splitted[1])
                        productsForSplit.stock = splitted[2]
                        productsForSplit.category = splitted[3]
                        productsForSplit.image = splitted[4]
                        productsForSplit.ratings = splitted[5]
                        productsForSplit.producerName = splitted[6]
                        productsForSplit.favorite = true
                        this.wishlistProducts.push(productsForSplit)
                    }
                    console.log(this.wishlistProducts)
                    const preview = document.querySelector('img[class=userProf]');
                    preview.src = 'http://10.64.92.213:4001/'+this.input.image
                    console.log(preview.src)
                    this.splitOrders()
                })
                .catch(error => {
                    console.log(error);
                })
            }
            else if(isProducer == 1) {
                BackEndApi.postCalls('/producers/email', {
                    email: myemail
                })
                .then(response => {
                    console.log(response.data);
                    this.input.email = response.data.email
                    this.input.username = response.data.username
                    this.input.address = response.data.address
                    this.input.about = response.data.about
                    this.input.ratings = response.data.ratings
                    this.input.company_name = response.data.company_name
                    this.input.products = response.data.products
                    if(this.input.products!=null) {
                        this.splitProducts(this.input.products)
                    }
                    this.input.orders = response.data.my_orders
                    this.input.image = response.data.image
                    this.input.city = response.data.city
                    const preview = document.querySelector('img[class=prof]');
                    preview.src = 'http://10.64.92.213:4001/'+this.input.image
                    console.log(preview.src)
                    this.splitOrders()
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        uploadMultiplePhotos() {
            for(var i=0;i<this.$refs.inputPhotos[0].files.length;i++) {
                console.log(this.$refs.inputPhotos[0].files[i])
                let formData = new FormData();
                formData.set('email',this.input.email);
                formData.append('file', this.$refs.inputPhotos[0].files[i]);
                axios.post('http://10.64.92.213:4001/producers/imageProduct', formData,
                    { headers: {'Content-Type': 'multipart/form-data'}}
                )
                .then(response => {
                    console.log(response)
                    console.log('Image added!');
                    if(i==this.$refs.inputPhotos[0].files.length-1) {
                        this.getInfo()
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        },
        excelFile() {
            const input1 = document.getElementById('input')
            readXlsxFile(input1.files[0]).then((rows) => {
                console.log(rows)
                this.productToAdd = this.input.products
                for(var i=1;i<rows.length;i++) {
                    if(this.input.products=='' || this.input.products==null) {
                        this.productToAdd = rows[i][0] + "," + rows[i][1] + ',' + rows[i][2] + ',' + rows[i][3] + ',' + 'Upload\\' + rows[i][4] + ','
                    }
                    else{
                        this.productToAdd = this.productToAdd + '|' + rows[i][0] + "," + rows[i][1] + ',' + rows[i][2] + ',' + rows[i][3] + ',' + 'Upload\\' + rows[i][4] + ','
                    }
                    // this.productToAdd = this.product.name + "," + this.product.price + ',' + this.product.stock + ',' + this.product.category + ',' + this.product.image
                    console.log(this.productToAdd)
                    BackEndApi.postCalls('/producers/edit', {
                        email: this.input.email,
                        products: this.productToAdd
                    })
                    .then(response => {
                        console.log(response.data);
                        this.getInfo()
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
        },
        AddNewProduct() {
            this.file2 = this.$refs.file2[2].files[0];
            // this.product.image = this.file2
            // console.log("yoo")
            console.log(this.$refs)
            let formData = new FormData();
            if(this.file2 != null) {
                formData.set('email',this.input.email);
                formData.append('file', this.file2);
                this.product.image = "Upload\\"+this.file2.name
                console.log(formData.get("file"))
            }
            else {
                console.log("no file")
            }
            axios.post('http://10.64.92.213:4001/producers/imageProduct', formData,
                { headers: {'Content-Type': 'multipart/form-data'}}
            )
            .then(response => {
                console.log(response)
                console.log('Image added!');
            })
            .catch(function(error) {
                console.log(error);
            });
            if(this.input.products=='' || this.input.products==null) {
                this.productToAdd = this.product.name + "," + this.product.price + ',' + this.product.stock + ',' + this.product.category + ',' + this.product.image + ',' + this.product.ratings
            }
            else{
                this.productToAdd = this.input.products + '|' + this.product.name + "," + this.product.price + ',' + this.product.stock + ',' + this.product.category + ',' + this.product.image + ',' + this.product.ratings
            }
            // this.productToAdd = this.product.name + "," + this.product.price + ',' + this.product.stock + ',' + this.product.category + ',' + this.product.image
            console.log(this.productToAdd)
            BackEndApi.postCalls('/producers/edit', {
                email: this.input.email,
                products: this.productToAdd
            })
            .then(response => {
                console.log(response.data);
                this.getInfo()
            })
            .catch(error => {
                console.log(error);
            })
        },
        EditProduct(di_product, image) {
            // this.splitt = image.split('http://10.64.92.213:4001/',2)
            di_product.image = image
            this.check = image
            if(this.$refs.file2[2].files[0]!=null) {
                // console.log("tre1")
                this.file2 = this.$refs.file2[2].files[0];
                let formData = new FormData();
                if(this.file2 != null) {
                    formData.set('email',this.input.email);
                    formData.append('file', this.file2);
                    di_product.image = "Upload\\"+this.file2.name
                    this.check = "Upload\\"+this.file2.name
                    // console.log(product.image)
                    console.log(formData.get("file"))
                    axios.post('http://10.64.92.213:4001/producers/imageProduct', formData,
                        { headers: {'Content-Type': 'multipart/form-data'}}
                    )
                    .then(response => {
                        console.log(response)
                        // console.log('Image added!');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    console.log("no file")
                }
            }
            else {
                // console.log("tre2")
                this.file2 = di_product.image;
            }
            // this.product.image = this.file2
            // console.log(this.file2)
            
            
            var newProds = ''
            for(var i=0;i<this.prodsToShow.length;i++) {
                // this.splitt = this.prodsToShow[i].image.split('http://10.64.92.213:4001/',2)
                // this.prodsToShow[i].image = 

                if(this.prodsToShow[i].id == di_product.id) {
                    this.prodsToShow[i].price = di_product.price
                    this.prodsToShow[i].stock = di_product.stock
                    this.prodsToShow[i].category = di_product.category
                    this.prodsToShow[i].image = this.check
                    this.prodsToShow[i].ratings = di_product.ratings
                }
                if(i==this.prodsToShow.length-1) {
                    newProds = newProds + this.prodsToShow[i].name + "," + this.prodsToShow[i].price + ',' + this.prodsToShow[i].stock + ',' + this.prodsToShow[i].category + ',' + this.prodsToShow[i].image + ',' + this.prodsToShow[i].ratings
                    break;
                }
                newProds = newProds + this.prodsToShow[i].name + "," + this.prodsToShow[i].price + ',' + this.prodsToShow[i].stock + ',' + this.prodsToShow[i].category + ',' + this.prodsToShow[i].image + ',' + this.prodsToShow[i].ratings + '|'
            }
            document.querySelector('#file2').value = ''
            console.log(newProds)
            BackEndApi.postCalls('/producers/edit', {
                email: this.input.email,
                products: newProds
            })
            .then(response => {
                console.log(response.data);
                
                this.getInfo()
            })
            .catch(error => {
                console.log(error);
            })
        },
        DeleteProduct(product) {
            var newProds = ''
            for(var i=0;i<this.prodsToShow.length;i++) {
                // this.splitt = this.prodsToShow[i].image.split('http://10.64.92.213:4001/',2)
                // this.prodsToShow[i].image = this.splitt[1]
                if(this.prodsToShow[i].id == product.id && i==this.prodsToShow.length-1) {
                    newProds = newProds.slice(0, -1)
                    continue
                }
                else if(this.prodsToShow[i].id == product.id) {
                    continue
                }
                if(i==this.prodsToShow.length-1) {
                    newProds = newProds + this.prodsToShow[i].name + "," + this.prodsToShow[i].price + ',' + this.prodsToShow[i].stock + ',' + this.prodsToShow[i].category + ',' + this.prodsToShow[i].image + ',' + this.prodsToShow[i].ratings
                    break;
                }
                newProds = newProds + this.prodsToShow[i].name + "," + this.prodsToShow[i].price + ',' + this.prodsToShow[i].stock + ',' + this.prodsToShow[i].category + ',' + this.prodsToShow[i].image + ',' + this.prodsToShow[i].ratings + '|'
            }
            BackEndApi.postCalls('/producers/edit', {
                email: this.input.email,
                products: newProds
            })
            .then(response => {
                console.log(response.data);
                this.getInfo()
            })
            .catch(error => {
                console.log(error);
            })
        },
        EditProfileProducer() {
            BackEndApi.postCalls('/producers/edit', {
                username: this.input.username,
                email: this.input.email,
                company_name: this.input.company_name,
                address: this.input.address,
                about: this.input.about,
                city: this.input.city
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            this.edit=false
        },
        EditAboutProducer() {
            BackEndApi.postCalls('/producers/edit', {
                username: this.input.username,
                email: this.input.email,
                company_name: this.input.company_name,
                address: this.input.address,
                about: this.input.about
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            this.edit=false
        },
        GetImage(e) {
            console.log(this.$refs)
            const preview = document.querySelector('img[class=userProf]');
            const file = document.querySelector('input[id=file]').files[0];
            console.log(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                preview.src = reader.result;
            };
            if(file) {
                reader.readAsDataURL(file);
            }
        },
        GetImageProd(e) {
            console.log(document.querySelector('input[class=image_prod]').files)
            const preview = document.querySelector('img[class=image_prod]');
            const editPrev = document.querySelector('img[id=edit_image]');
            const file2 = document.querySelector('input[class=image_prod]').files[0];
            console.log(file2)
            const reader = new FileReader();
            reader.onloadend = () => {
                preview.src = reader.result;
                editPrev.src = reader.result;
                console.log(preview.src)
            };
            if(file2) {
                reader.readAsDataURL(file2);
            }
        },
        gotoProd(name, producerName) {
            this.$router.push({ name: "product-producerName-productName", params: {producerName: producerName, productName: name}});
        },
        findProducer(company_name) {
            BackEndApi.postCalls('/producers/company_name', {
                company_name: company_name
            })
            .then(response => {
                console.log(response.data);
                var producer = response.data
                this.gotoProducer(producer.company_name)
            })
            .catch(error => {
                console.log(error);
            })
        },
        gotoProducer(company_name) {
            this.$router.push({ name: "producer-producerName", params: { producerName: company_name}});
        },
        EditProfile() {
            BackEndApi.postCalls('/users/editUser', {
                username: this.input.username,
                email: this.input.email,
                address: this.input.address,
                city: this.input.city
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            this.edit=false
        },
        changePic() {
            this.file = this.$refs.file.files[0];
            console.log(this.file)
            this.input.image = this.file
            let formData = new FormData();
            if(this.file != null) {
                formData.set('email',this.input.email);
                formData.append('file', this.file);
                console.log(formData.get("file"))
            }
            else {
                console.log("no file")
            }
            if(this.isProducerHere==0) {
                axios.post('http://10.64.92.213:4001/users/image', formData,
                    { headers: {'Content-Type': 'multipart/form-data'}}
                )
                .then(response => {
                    console.log(response)
                    console.log('Image Updated!');
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
            else if(this.isProducerHere==1) {
                axios.post('http://10.64.92.213:4001/producers/image', formData,
                    { headers: {'Content-Type': 'multipart/form-data'}}
                )
                .then(response => {
                    console.log(response)
                    this.getInfo()
                    console.log('Image Updated!');
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        },
        splitProducts(prods) {
            this.theSplittedProds = prods.split('|')
            this.numOfProds = this.theSplittedProds.length
            this.prodsToShow = []
            for(var i=0;i<this.theSplittedProds.length;i++) {
                var productsForSplit = new Object();
                productsForSplit.id = i
                var splitted = [];
                splitted = this.theSplittedProds[i].split(',') 
                productsForSplit.name = splitted[0]
                productsForSplit.price = splitted[1]
                productsForSplit.stock = splitted[2]
                productsForSplit.category = splitted[3]
                productsForSplit.image = splitted[4]
                productsForSplit.ratings = splitted[5]
                this.prodsToShow.push(productsForSplit)
            }
            console.log(this.prodsToShow);
        },
        remFromWishlist(product) {
            var toReturn = ''
            var k =0
            for(var i=0;i<this.wishlistProducts.length;i++) {
                // var newImage = this.wishlistProducts[i].image.split('http://10.64.92.213:5000/',2)
                // this.wishlistProducts[i].image = newImage[1]
                if(this.wishlistProducts[i].name == product.name && this.wishlistProducts[i].producerName == product.producerName) {
                    if(i==this.wishlistProducts.length-1) {
                        toReturn = toReturn.slice(0, -1)
                    }
                    k = i
                    console.log(this.wishlistProducts[i])
                    continue
                }
                if(i==this.wishlistProducts.length-1) {
                    toReturn = toReturn + this.wishlistProducts[i].name + "," + this.wishlistProducts[i].price + ',' + this.wishlistProducts[i].stock + ',' + this.wishlistProducts[i].category + ',' + this.wishlistProducts[i].image + ',' + this.wishlistProducts[i].ratings + ',' + this.wishlistProducts[i].producerName
                }
                else {
                    toReturn = toReturn+this.wishlistProducts[i].name + "," + this.wishlistProducts[i].price + ',' + this.wishlistProducts[i].stock + ',' + this.wishlistProducts[i].category + ',' + this.wishlistProducts[i].image + ',' + this.wishlistProducts[i].ratings + ',' + this.wishlistProducts[i].producerName + '|'
                }
            }
            console.log(k)
            this.wishlistProducts.splice(k,1)
            console.log(toReturn)
            console.log(this.wishlistProducts)
            BackEndApi.postCalls('/users/editUser', {
                email: this.myEmail,
                wishlist: toReturn
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        splitOrders() {
            console.log(this.input.orders)
            var splitted = this.input.orders
            console.log(splitted)
            if(splitted!='' && splitted!=null) {
                for(var i=0;i<splitted.length;i++) {
                    var objToAdd = new Object()
                    objToAdd.id = i
                    var sum = splitted[i].split('==',2)
                    objToAdd.sum = sum[1]
                    var info_prods = sum[0].split('=',2)
                    var info = info_prods[0]
                    var splitInfo = info.split(',')
                    objToAdd.firstName = splitInfo[0]
                    objToAdd.lastName = splitInfo[1]
                    objToAdd.company_name = splitInfo[2]
                    objToAdd.address = splitInfo[3]
                    objToAdd.postalCode = splitInfo[4]
                    objToAdd.phoneNumber = splitInfo[5]
                    var prods = info_prods[1].split('|')
                    var products = new Array()
                    for(var j=0;j<prods.length;j++) {
                        var splitProd = prods[j].split(',')
                        var prodToAdd = new Object()
                        prodToAdd.productName = splitProd[0]
                        prodToAdd.producerName = splitProd[1]
                        prodToAdd.productQuantity = splitProd[2]
                        prodToAdd.product_image = splitProd[3]
                        products.push(prodToAdd)
                    }
                    objToAdd.products = products
                    this.pendingOrders.push(objToAdd)
                }
            }
            else {
                var objToAdd = new Object()
                var info_prods = splitted[i].split('=')
                var info = info_prods[0]
                var splitInfo = info.split(',')
                objToAdd.firstName = splitInfo[0]
                objToAdd.lastName = splitInfo[1]
                objToAdd.company_name = splitInfo[2]
                objToAdd.address = splitInfo[3]
                objToAdd.postalCode = splitInfo[4]
                objToAdd.phoneNumber = splitInfo[5]
                var prods_sum = info_prods[1].split('==')
                var prods = prods_sum[0].split('|')
                for(var j=0;j<prods.length;j++) {
                    var splitProd = prods[j].split(',')
                    objToAdd.product[j].productName = splitProd[0]
                    objToAdd.product[j].producerName = splitProd[1]
                    objToAdd.product[j].productQuantity = splitProd[2]
                    objToAdd.product[j].product_image = splitProd[3]
                }
                objToAdd.sum = prods_sum[1]
                this.pendingOrders.push(objToAdd)
            }
            console.log(this.pendingOrders)
        },
        rate(productName, producerName) {
            console.log(producerName + " "+productName)
            console.log(this.comment+" "+this.rateForProd)
            var productsHere = ''
            BackEndApi.postCalls('/producers/company_name', {
                company_name: producerName
            })
            .then(response => {
                console.log(response.data);
                productsHere = response.data.products
                console.log(productsHere)
                var prodsToShow = []
                console.log("here")
                var theRating = ''
                var k=0
                var splittedHere = productsHere.split('|')
                for(var i=0;i<splittedHere.length;i++) {
                    var productsForSplit = new Object();
                    productsForSplit.id = k.toString()
                    var splitted = [];
                    splitted = splittedHere[i].split(',') 
                    productsForSplit.name = splitted[0]
                    productsForSplit.price = parseInt(splitted[1])
                    productsForSplit.stock = splitted[2]
                    productsForSplit.category = splitted[3]
                    productsForSplit.image = splitted[4]
                    console.log(splitted[5]+" "+i)
                    if(productName == splitted[0]) {
                        if(splitted[5].trim()!='' && splitted[5].trim()!=null) {
                            theRating = splitted[5] + '*' + this.comment+"-"+this.rateForProd
                        }
                        else {
                            theRating = this.comment+"-"+this.rateForProd
                        }
                        productsForSplit.ratings = theRating
                    }
                    else{
                        productsForSplit.ratings = splitted[5]
                    }
                    productsForSplit.producerName = producerName
                    productsForSplit.favorite = false
                    prodsToShow.push(productsForSplit)
                    k++
                }

                
                console.log(prodsToShow)
                var newProds = ''
                for(var i=0;i<prodsToShow.length;i++) {
                    if(i==prodsToShow.length-1) {
                        newProds = newProds + prodsToShow[i].name + "," + prodsToShow[i].price + ',' + prodsToShow[i].stock + ',' + prodsToShow[i].category + ',' + prodsToShow[i].image + ',' +prodsToShow[i].ratings
                        break;
                    }
                    newProds = newProds + prodsToShow[i].name + "," + prodsToShow[i].price + ',' + prodsToShow[i].stock + ',' + prodsToShow[i].category + ',' + prodsToShow[i].image + ',' + prodsToShow[i].ratings + '|'
                }
                console.log(newProds)
                BackEndApi.postCalls('/producers/editCompany', {
                    company_name: producerName,
                    products: newProds
                })
                .then(response => {
                    console.log(response.data);
                    // this.getInfo()
                })
                .catch(error => {
                    console.log(error);
                })
                this.comment = ''
                this.rateForProd = 0
            })
            .catch(error => {
                console.log(error);
            })
            
            
        },
        printQR() {
            // const prtHtml = document.getElementById('toPrint').innerHTML;
            // console.log(prtHtml)
            // let stylesHtml = '';
            // for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            //     stylesHtml += node.outerHTML;
            // }

            // // Open the print // window
            // const WinPrint = // window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            // WinPrint.document.write(`<!DOCTYPE html>
            // <html>
            // <head>
            //     ${stylesHtml}
            // </head>
            // <body>
            //     ${prtHtml}
            // </body>
            // </html>`);

            // WinPrint.document.close();
            // WinPrint.focus();
            // WinPrint.print();
            // WinPrint.close();
            this.$htmlToPaper('toPrint');
        }
    }
}
</script>

<style scoped>
.prod_text {
    color: #4caf50;
    font-size: 60px;
}
.product_text {
    color: #4caf50;
    font-size: 20px;
}
.product_text:hover {
    color: #4caf50;
    font-size: 20px;
    text-decoration: underline;
    cursor: pointer;
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
.new-button {
    display: inline-block;
    padding: 8px 12px; 
    cursor: pointer;
    border-radius: 4px;
    background-color: #4caf50;
    font-size: 16px;
    color: #fff;
}
.new-button2 {
    display: inline-block;
    padding: 4px 6px; 
    cursor: pointer;
    border-radius: 2px;
    background-color: #4caf50;
    font-size: 12px;
    color: #fff;
}
input[type="file"] {
  position: absolute;
  z-index: -1;
  top: 6px;
  left: 0;
  font-size: 15px;
  color: rgb(153,153,153);
}
.button-wrap {
  position: relative;
}
.produc_Text {
    color:#4caf50;
    cursor: pointer;
}
.produc_Text:hover {
    color:#4caf50;
    cursor: pointer;
    text-decoration: underline;
}
</style>