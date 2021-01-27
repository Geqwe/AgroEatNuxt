// import BackEndApi from '../../services/api/backEnd';

// const state = {
// //   token: localStorage.getItem('access_token') || null
//     token : ''
// };

// const getters = {          /**Retrieve Data from Store,get the data from the state */
//     loggedIn(state) {
//       return state.token != null
//     }
// };

// const mutations = {
//     retrieveToken(state, token) {
//       state.token = token
//     },
//     retrieveTokenProd(state, token) {
//         state.token = token
//       },
//     deleteToken(state){
//       state.token = null
//     }
// };

// const actions = {
//     retrieveToken(context, credentials) {
//         return new Promise((resolve, reject) => {
//             BackEndApi.postCalls('/auth/login', {
//                 email: credentials.email,
//                 password: credentials.password
//             })
//             .then(response => {
//                 const token = response.data.token
//                 const email = credentials.email
//                 console.log("User")
//                 //store the token
//                 localStorage.setItem('access_token', token)
//                 localStorage.setItem('email', email)
//                 context.commit('retrieveToken', token)
//                 resolve(response)
//                 console.log(response)
//             })
//             .catch( error => {
//                 console.log(error)
//                 alert("Wrong Username/Password")
//                 reject(response)
//             })
//         })
//     },
//     retrieveTokenProd(context, credentials) {
//         return new Promise((resolve, reject) => {
//             BackEndApi.postCalls('/auth/loginProd', {
//                 email: credentials.email,
//                 password: credentials.password
//             })
//             .then(response => {
//                 const token = response.data.token
//                 const email = credentials.email
//                 console.log("Producer")
//                 //store the token
//                 localStorage.setItem('access_token', token)
//                 localStorage.setItem('email', email)
//                 context.commit('retrieveTokenProd', token)
//                 resolve(response)
//                 console.log(response)
//             })
//             .catch( error => {
//                 console.log(error)
//                 alert("Wrong Username/Password")
//                 reject(response)
//             })
//         })
//     },
//     deleteToken(context){
//         if(context.getters.loggedIn){
//             //delete the token
//             localStorage.removeItem('access_token')
//             localStorage.removeItem('email')
//             context.commit('deleteToken')
//         }
//     }
// };

// export default {
//     state,
//     getters,
//     mutations,
//     actions
// }