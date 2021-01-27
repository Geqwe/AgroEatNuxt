import Vue from 'vue';
import Vuex from 'vuex';
import BackEndApi from '../services/api/backEnd';
// import account from './account';
// import createDeliveryNote from './modules/createDeliveryNote';
import createPersistedState from "vuex-persistedstate";
import plugClient from "./plug.client.js"

Vue.use(Vuex)

var checkToken;
if(process.client) {
  checkToken = localStorage.getItem('access_token') || null
}

export const state = () => ({
    cart:[],
    loggedIn: false,
    // token: mutations.retrieveToken || null
    token: checkToken
})

export const getters = {
  loggedIn(state) {
    if(process.client) {
      console.log("in getter "+localStorage.getItem('access_token'))
      if(localStorage.getItem('access_token')!=null) {
        return true
      }
      else {
        return false
      }
    }
    // return state.token != null
  }
}


export const mutations = {
  addToCart(state, item) {
    let found = state.cart.find(product => product.productID == item.productID);
    console.log(item)
    if(found) {
      item.productQuantity = item.productQuantity + 1;
    }
    else {
      state.cart.push(item);
      item.productQuantity = 1
    }
  },
  delFromCart(state, name) {
    var item;
    for(var i=0;i<state.cart.length;i++) {
        item = state.cart[i];
        console.log(item.productName)
        if(item.productName == name) {
            state.cart.splice(i,1);
            break;
        }
    }
    return;
  },
  retrieveToken(state, token) {
    state.token = token
    state.loggedIn = true
  },
  retrieveTokenProd(state, token) {
      state.token = token
    },
  deleteToken(state){
    state.token = null
    state.loggedIn = false
  },
  deleteCart(state) {
    console.log("Deleting cart")
    state.cart = []
  }
}

export const actions = {
  retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
          BackEndApi.postCalls('/auth/login', {
              email: credentials.email,
              password: credentials.password
          })
          .then(response => {
              var token = response.data.token
              var email = credentials.email
              console.log("User")
              //store the token
              state.loggedIn = true
              console.log(state.loggedIn)
              localStorage.setItem('access_token', token)
              localStorage.setItem('email', email)
              context.commit('retrieveToken', token)
              resolve(response)
              console.log(response)
          })
          .catch( error => {
              console.log(error)
              alert("Wrong Username/Password")
              reject(response)
          })
      })
  },
  retrieveTokenProd(context, credentials) {
      return new Promise((resolve, reject) => {
          BackEndApi.postCalls('/auth/loginProd', {
              email: credentials.email,
              password: credentials.password
          })
          .then(response => {
              var token = response.data.token
              var email = credentials.email
              console.log("Producer")
              state.loggedIn = true
              //store the token
              localStorage.setItem('access_token', token)
              localStorage.setItem('email', email)
              context.commit('retrieveTokenProd', token)
              resolve(response)
              console.log(response)
          })
          .catch( error => {
              console.log(error)
              alert("Wrong Username/Password")
              reject(response)
          })
      })
  },
  deleteToken(context){
      if(context.getters.loggedIn){
          //delete the token
          state.loggedIn = false
          localStorage.removeItem('access_token')
          localStorage.removeItem('email')
          context.commit('deleteToken')
      }
  }
}

  // export const plugins = {

  // }

// new Vuex.Store({
//   state: () => ({
//     cart:[]
//   }),
//   mutations: {
//     addToCart(state, item) {
//       let found = state.cart.find(product => product.productID == item.productID);
//       console.log(item)
//       if(found) {
//         item.productQuantity = item.productQuantity + 1;
//       }
//       else {
//         state.cart.push(item);
//         item.productQuantity = 1
//       }
//     },
//     delFromCart(state, name) {
//       var item;
//       for(var i=0;i<state.cart.length;i++) {
//           item = state.cart[i];
//           console.log(item.productName)
//           if(item.productName == name) {
//               state.cart.splice(i,1);
//               break;
//           }
//       }
//       return;
//     }
//   },
//   plugins: [
//     // {createPersistedState()},
//     {src: plugClient, ssr: false, mode: "client"}
//   ],
//   modules: {
//     account
//     // createDeliveryNote
//   }
// })
  


// });
