import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
    authId: null
  },
  mutations: {
    setItem(state, { item, id, resource }) {
      item[".key"] = id;
      Vue.set(state[resource], id, item);
    },
    setAuthId(state, id) {
      state.authId = id;
    }
  },
  actions: {
    createUser({ state, commit }, { id, email }) {
      return new Promise(resolve => {
        const registeredAt = Math.floor(Date.now() / 1000);
        email = email.toLowerCase();
        const user = {
          email,
          registeredAt
        };
        firebase
          .database()
          .ref("users")
          .child(id)
          .set(user)
          .then(() => {
            commit("setItem", { resource: "users", id: id, item: user });
            resolve(state.users[id]);
          });
      });
    },
    registerUserWithEmailAndPassword({ dispatch }, { email, password }) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          return dispatch("createUser", {
            id: user.user.uid,
            email,
            password
          });
        });
    },
    signInWithEmailAndPassword(context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    signOut({ commit }) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setAuthId", null);
        });
    },
    fetchAuthUser({ dispatch, commit }) {
      const userId = firebase.auth().currentUser.uid;
      return dispatch("fetchUser", { id: userId }).then(() => {
        commit("setAuthId", userId);
      });
    },
    fetchUser: ({ dispatch }, { id }) =>
      dispatch("fetchItem", { resource: "users", id, emoji: "🙋" }),
    fetchItem({ state, commit }, { id, emoji, resource }) {
      console.log("🔥‍", emoji, id);
      return new Promise(resolve => {
        firebase
          .database()
          .ref(resource)
          .child(id)
          .once("value", snapshot => {
            commit("setItem", {
              resource,
              id: snapshot.key,
              item: snapshot.val()
            });
            resolve(state[resource][id]);
          });
      });
    }
  },
  getters: {
    authUser(state) {
      return state.authId ? state.users[state.authId] : null;
    }
  },
  modules: {}
});
