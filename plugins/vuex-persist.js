import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
        key: 'str-vuex',
        storage: window.localStorage,
        reducer: state => ({ cart: state.cart , loggedIn: state.loggedIn})
    }).plugin(store);
  });
};