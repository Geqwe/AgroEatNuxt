<template>
    <v-app dark>
        <v-main>
            <v-container grid-list-md text-cols=-center>
                <v-snackbar v-model="wishlistSnackBarAdd" :timeout="1200" top>Προστέθηκε στη λίστα σας</v-snackbar>
                <v-snackbar v-model="wishlistSnackBarRemove" :timeout="1200" top>Αφαιρέθηκε από τη λίστα σας</v-snackbar>
                <v-row row >
                    <v-col cols=2>
                        <h1>Φίλτρα</h1>
                        <v-divider class="mt-2" color="#4caf50"></v-divider>
                        <h2 class="mt-5">Παραγωγοί</h2>
                        <v-col class="check" v-for="producer in producerInfo" :key="producer.id">
                            <v-checkbox @change="checkFilters()" style="col-wrap:wrap;display:col;" v-model="producer.checked" :label="producer.company_name"></v-checkbox>
                        </v-col>
                        <v-divider class="mt-2 mb-2"></v-divider>
                        <h2>Τιμή</h2>
                        <v-row row>
                            <v-col cols=10 align="center" justify="center">
                                <v-slider max="50" @change="sliderButton=true" v-model="range" label="Από" thumb-label="always" thumb-color="green"></v-slider>
                            </v-col>
                            <v-col cols=2>
                                <v-icon v-if="sliderButton" @click="checkFilters();sliderButton=false;" color="success">check_circle</v-icon>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-2"></v-divider>
                        <h2>Κατηγορίες</h2>
                        <div v-for="category in categoriesToShow" :key="category.name">
                            <v-checkbox @change="checkFilters()" style="col-wrap:nowrap" v-model="category.checked" :label="category.name"></v-checkbox>
                        </div>
                        <!-- <v-divider class="mt-2 mb-2"></v-divider> -->
                        <!-- <h2>Βαθμολογία Προϊόντος</h2>
                        <v-rating v-model="rating" background-color="green lighten-3" color="green" large></v-rating> -->
                    </v-col>
                    <v-col cols=1>
                        <v-divider vertical ></v-divider>
                    </v-col>
                    <v-col cols=6>
                        <h1>Προϊόντα</h1>
                        <v-divider class="mt-2" color="#4caf50"></v-divider>
                        <v-select @change="sortBy()" v-model="selectValue" class="mt-5 mr-3 ml-3" filled :items="items" label="Ταξινόμηση Κατά"></v-select>
                        <!-- <v-divider class="mt-2" color="#4caf50"></v-divider> -->
                        <v-container grid-list-md text-cols=-center>
                            <v-row  v-for="product in filteredProducts" :key="product.id">
                                <v-col cols=12>
                                    <v-card outlined dark class="mx-auto mt-2">
                                        <v-row align="center" justify="center">
                                            <v-col cols=3 align="start" justify="start">
                                                <img @click="gotoProd(product.name, product.producerName)" class="images" :src="'http://10.64.92.213:4001/'+product.image"/>
                                                <!-- <v-img @click="gotoProd(product.id)" class="images" v-bind:src="require(product.image)"/> -->
                                                <v-row row>
                                                    <v-col cols=12 align="start" justify="start">
                                                        <v-rating readonly v-model="product.ratings" color="yellow darken-3" small></v-rating>
                                                    </v-col>
                                                    <!-- <v-col cols=4>
                                                        <div><span class="font-weight-bold" style="font-size:20px;">{{ product.ratings }}</span></div>
                                                    </v-col> -->
                                                </v-row>
                                            </v-col>
                                            <!-- <v-col cols=1> -->
                                                <v-divider vertical></v-divider>
                                            <!-- </v-col> -->
                                            <v-col cols=3 align="center" justify="center">
                                                <h4 @click.right="gotoProdRight(product.name, product.producerName)" @click="gotoProd(product.name, product.producerName)" class="prod_text">{{product.name}}</h4>
                                                <span class="text-align-left">Κατηγορία: {{product.category}}</span>
                                            </v-col>
                                            <v-divider vertical></v-divider>
                                            <v-col cols=3 align="center" justify="center">
                                                <span class="text-align-left">Παραγωγός:<span @click="findProducer(product.producerName)" class="produc_Text"> {{product.producerName}}</span></span>
                                                <br><h5>Τιμή: {{product.price}} €</h5>
                                                <!-- <h3 v-else style="text-decoration:line-through">Τιμή: {{product.price}}</h3> -->
                                                <!-- <h3 v-if="product.onsale==true"> Με έκπτωση: {{product.sale_price}}</h3> -->
                                            </v-col>
                                            <v-divider vertical></v-divider>
                                            <v-col cols=2 align="center" justify="center">
                                                <add-to-cart :name="product.name" :price="product.price" :productID="product.id" :image="product.image" :producerName="product.producerName"></add-to-cart>
                                                <v-btn class="mt-2" v-if="product.favorite==false" @click="product.favorite=true;addToWishlist(product);wishlistSnackBarAdd=true;" block text small dark><v-icon dark color="primary">mdi-heart-outline</v-icon></v-btn>
                                                <v-btn v-if="product.favorite==true" @click="product.favorite=false;remFromWishlist(product);wishlistSnackBarRemove=true;" block text small dark><v-icon dark color="primary">mdi-cards-heart</v-icon></v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols=1>
                        <v-divider vertical ></v-divider>
                    </v-col>
                    <v-col cols=2>
                        <h1>Προσφορές</h1>
                        <v-divider class="mt-2" color="#4caf50"></v-divider>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import BackEndApi from '../services/api/backEnd';
import axios from 'axios';

export default {
    name: 'Shop',
    data() {
        return {
            wishlistSnackBarAdd: false,
            wishlistSnackBarRemove: false,
            selectValue: 'Δημοτικότητα',
            items: [
                'Δημοτικότητα', 'Αύξουσα Τιμή'
            ],
            producers: [
                {id:'1', name:'Τάκης', checked:false,product: [{id:'1', name: "Μήλα Ζαγοράς", rating:5, price:10, producer:"Τάκης", stock: 10, category:"Μήλα", onsale:false, sale_price:8, image: "apples.jpg"}]},
                {id:'2', name:'Μήτσος', checked:false,product: [{id:'2', name: "Αχλάδια Μελιβοίας", rating:4.2, price:8, producer:"Μήτσος", stock: 5, category:"Αχλάδια", onsale:true, sale_price:6, image: "pears.jpg"}]},
            ],
            categories: [
                {name:'Μήλα', checked:false},
                {name:'Αχλάδια', checked:false},
            ],
            from: 0,
            to: 100,
            rating: 0,
            range: 0,
            producerInfo: [],
            prodsToShow: [],
            theSplittedProds: [],
            filteredProducts: [],
            sliderButton: false,
            checkSlider: false,
            categoriesToShow: [],
            beforeSort: [],
            firstTime: true,
            myWishlist: [],
            wishlistString: '',
            myEmail: ''
        }
    },
    created(){
        // window.scrollTo(0,0);
        
        var isProducer = "";
        var token = "";
        var myemail = "";
        if(process.client) {
            token = localStorage.getItem("access_token");
            axios.defaults.headers.common["Authorization"] =  token;
            myemail = localStorage.getItem("email");
            isProducer = localStorage.getItem("isProducer");
        }
        if(isProducer==0) {
            this.myEmail = myemail
            BackEndApi.postCalls('/users/email', {
                    email: myemail
                })
                .then(response => {
                    console.log(response.data);
                    this.wishlistString = response.data.wishlist
                    // console.log(this.wishlistString)
                    if(this.wishlistString!=undefined) {
                        this.myWishlist = this.wishlistString.split('|')
                    }
                    else {
                        this.myWishlist = []
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        BackEndApi.getCalls('/producers') // pare ta nea fields wste na allaksei to onoma sto fields
        .then(response => {
            this.producerInfo = response.data.message;
            this.splitProducts()
            // console.log(this.producerInfo)
            for(var i=0;i<this.categoriesToShow.length;i++) {
                // console.log(this.$route.params.category)
                if(this.$route.params.category == this.categoriesToShow[i].name) {
                        this.categoriesToShow[i].checked = true
                    }
            }
            // console.log("edw")
            // console.log(this.$route.params)
            // console.log(this.categoriesToShow)
            this.checkFilters()
        })
        .catch(error => {
          console.log(error)
        })
        
    },
    methods: {
        gotoProd(name, producerName) {
            this.$router.push({ name: "product-producerName-productName", params: {  producerName: producerName, productName: name}});
        },
        gotoProdRight(name, producerName) {
            var routeData = this.$router.resolve({ name: "product-producerName-productName", params: {  producerName: producerName, productName: name}});
            // window.open(routeData.href, '_blank');
        },
        findProducer(company_name) {
            for(var i=0;i<this.producerInfo.length;i++) {
                if(this.producerInfo[i].company_name == company_name) {
                    this.gotoProducer(this.producerInfo[i].company_name)
                }
            }
        },
        gotoProducer(company_name, products, image, address, about) {
            this.$router.push({ name: "producer-producerName", params: { producerName: company_name}});
        },
        splitProducts() {
            var k=0
            var checkCat = []
            for(var i=0;i<this.producerInfo.length;i++) {
                this.producerInfo[i].checked = false
                this.theSplittedProds = this.producerInfo[i].products.split('|')
                // this.prodsToShow = []
                for(var j=0;j<this.theSplittedProds.length;j++,k++) {
                    var productsForSplit = new Object();
                    productsForSplit.id = k.toString()
                    var splitted = [];
                    splitted = this.theSplittedProds[j].split(',') 
                    productsForSplit.name = splitted[0]
                    productsForSplit.price = parseInt(splitted[1])
                    productsForSplit.stock = splitted[2]
                    productsForSplit.category = splitted[3]
                    productsForSplit.image = splitted[4]
                    var avg = 0
                    if(splitted[5]!='' && splitted[5]!=null) {
                        var splitRatings = splitted[5].split('*');
                        for(var p=0;p<splitRatings.length;p++) {
                            var splitComsRats = splitRatings[p].split('-')
                            avg = avg + parseInt(splitComsRats[1])
                        }
                        avg = avg/p
                        console.log(avg)
                    }
                    productsForSplit.ratings = avg
                    productsForSplit.producerName = this.producerInfo[i].company_name
                    productsForSplit.favorite = false
                    
                    if(this.myWishlist!=[]) {
                        for(var p=0;p<this.myWishlist.length;p++) {
                            // console.log(this.myWishlist[p])
                            // console.log(productsForSplit.name + " "+ productsForSplit.producerName)
                            if(this.myWishlist[p].includes(productsForSplit.name) && this.myWishlist[p].includes(productsForSplit.producerName)) {
                                productsForSplit.favorite = true
                                break
                            }
                            else {
                                productsForSplit.favorite = false
                            }
                        }
                    }
                    else {
                        productsForSplit.favorite = false
                    }
                    // console.log(productsForSplit)
                    this.prodsToShow.push(productsForSplit)
                    if(!checkCat.includes(splitted[3])) {
                        checkCat.push(splitted[3])
                        var catObj = new Object();
                        catObj.name = splitted[3]
                        catObj.checked = false
                        if(catObj!='') {
                            this.categoriesToShow.push(catObj)
                        }
                    }
                }
            }
            // console.log(this.prodsToShow);
            this.filteredProducts = this.prodsToShow
            console.log(this.filteredProducts)
        },
        checkFilters() {
            var newArr = []
            var counter = 0
            for(var i=0;i<this.producerInfo.length;i++) {
                if(this.producerInfo[i].checked==true) {
                    for(var j=0;j<this.prodsToShow.length;j++) {
                        for(var k=0;k<this.categoriesToShow.length;k++) {
                            if(this.categoriesToShow[k].checked == true) {
                                counter=1
                                // console.log(this.prodsToShow[j].category+" "+this.categoriesToShow[k].name)
                                if(this.prodsToShow[j].producerName == this.producerInfo[i].company_name && this.prodsToShow[j].price >=this.range && this.prodsToShow[j].category == this.categoriesToShow[k].name) {
                                    newArr.push(this.prodsToShow[j])
                                }
                            }
                        }
                        if(counter!=1) { //no category checked
                            if(this.prodsToShow[j].producerName == this.producerInfo[i].company_name && this.prodsToShow[j].price >=this.range) {
                                newArr.push(this.prodsToShow[j])
                            }
                        }
                    }
                    counter=2 //there is check producer
                }
            }
            if(counter==2) {
                this.filteredProducts = newArr
            }
            else if(counter==0) {
                for(var j=0;j<this.prodsToShow.length;j++) {
                    for(var k=0;k<this.categoriesToShow.length;k++) {
                        if(this.categoriesToShow[k].checked == true) {
                            counter=1
                            if(this.prodsToShow[j].price >=this.range && this.prodsToShow[j].category == this.categoriesToShow[k].name) {
                                newArr.push(this.prodsToShow[j])
                            }
                        }
                    }
                    if(counter==0) {
                        if(this.prodsToShow[j].price >=this.range) {
                            newArr.push(this.prodsToShow[j])
                        }
                    }
                }
                this.filteredProducts = newArr
            }
        },
        sortBy() {
            if(this.selectValue=='Δημοτικότητα') {
                this.filteredProducts = this.beforeSort.slice(0)
                // console.log(this.beforeSort)
            }
            else if(this.selectValue=='Αύξουσα Τιμή') {
                // console.log(this.firstTime)
                if(this.firstTime==true) {
                    this.beforeSort = this.filteredProducts.slice(0)
                    this.firstTime = false
                }
                //  console.log(this.beforeSort)
                this.filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                //  console.log(this.beforeSort)
            }
        },
        addToWishlist(product) {
            var prodToAdd;
            // console.log(this.wishlistString)
            if(this.wishlistString==undefined || this.wishlistString==[] || this.wishlistString=='') {
                prodToAdd = product.name + "," + product.price + ',' + product.stock + ',' + product.category + ',' + product.image + ',' + product.ratings + ',' +product.producerName
                this.wishlistString = prodToAdd
            }
            else {
                prodToAdd = '|'+ product.name + "," + product.price + ',' + product.stock + ',' + product.category + ',' + product.image + ',' + product.ratings + ',' +product.producerName
                this.wishlistString = this.wishlistString+prodToAdd
            }
            // prodToAdd = product.name + "," + product.price + ',' + product.stock + ',' + product.category + ',' + product.image + ',' + product.ratings + ',' +product.producerName
            // this.wishlistString = prodToAdd
            this.myWishlist = this.wishlistString.split('|')
            // console.log(this.wishlistString)
            // console.log(this.myEmail)
            BackEndApi.postCalls('/users/editUser', {
                email: this.myEmail,
                wishlist: this.wishlistString
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        remFromWishlist(product) {
            var toReturn = ''
            var k =0
            console.log(this.myWishlist.length)
            for(var i=0;i<this.myWishlist.length;i++) {
                // console.log(this.myWishlist[i])
                if(this.myWishlist[i].includes(product.name) && this.myWishlist[i].includes(product.producerName)) {
                    if(i==this.myWishlist.length-1) {
                        toReturn = toReturn.slice(0, -1)
                    }
                    k = i
                    // console.log("yoloo")
                    // console.log(this.myWishlist[i])
                    continue
                }
                if(i==this.myWishlist.length-1) {
                    toReturn = toReturn+this.myWishlist[i]
                }
                else {
                    toReturn = toReturn+this.myWishlist[i]+'|'
                }
            }
            // console.log(k)
            this.myWishlist.splice(k,1)
            this.wishlistString = toReturn
            // console.log(toReturn)
            // console.log(this.myWishlist)
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
        }
    },
    mounted() {
        console.log("----------------")
        if(process.client)
            console.log(localStorage.getItem("access_token"))
    }
}
</script>

<style scoped>
.v-input {
    margin: 0px;
    padding: 0px;
}
.v-messages {
    display: none !important;
}
.prod_text {
    color: #4caf50;
    margin-bottom: 5%;
}
.prod_text:hover {
    cursor: pointer;
    text-decoration: underline;
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