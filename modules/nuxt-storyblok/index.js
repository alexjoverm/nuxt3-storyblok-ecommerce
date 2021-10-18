import path from "path";
import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options) {
    addPluginTemplate({
      src: path.resolve(__dirname, "plugin-template.js"),
      mode: "client",
      options: { options },
    });
  },
});
