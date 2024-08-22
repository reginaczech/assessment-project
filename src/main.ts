import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import FormComponent from "@/components/form.vue";
import TextComponent from "@/components/text.vue";
import SubmitComponent from "./components/submit.vue";
import InputComponent from "./components/input.vue";
import AddressEntryComponent from "./components/addressEntry.vue";
import FormView from "@/views/FormView.vue";
import HomeView from "@/views/HomeView.vue";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
    FormComponent,
    TextComponent,
    SubmitComponent,
    InputComponent,
    AddressEntryComponent,
    FormView,
    HomeView,
  },
}).$mount("#app");
