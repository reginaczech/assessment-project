import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FormView from "@/views/FormView.vue";
import { getUserDataById } from "@/core/getUserDataById";
import store from "@/store";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:userId",
    name: "form",
    component: FormView,
    beforeEnter: async (to, from, next) => {
      const userId = to.params.userId;
      const [user, error] = await getUserDataById(userId);
      if (error) {
        console.log(error);
        next({ name: "NotFound" });
      } else {
        store.commit("setUser", user);
        next();
      }
    },
  },
/*   {
    path: "/",
    name: "home",
    component: HomeView, //TODO: RC - change this component
  }, */
  //TODO: add a NotFound component to display the message
];

const router = new VueRouter({
  routes,
});

export default router;
