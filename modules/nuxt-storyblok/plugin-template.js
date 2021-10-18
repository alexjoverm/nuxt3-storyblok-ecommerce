// import StoryblokVue from "./storyblok-vue";
import StoryblokClient from 'storyblok-js-client'


// --------------------------------
// @todo: IMPORTING storyblok-vue ABOVE IS NOT WORKING
// For now, here's the code from storyblok-vue
const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!new RegExp("\\b" + className + "\\b").test(el.className)) {
    el.className += " " + className;
  }
};

const StoryblokVue = {
  install: (app) => {
    app.directive("editable", {
      beforeMount(el, binding) {
        console.log(el)
        console.log(binding)
        if (binding.value) {
          const node = binding.value.content._editable;
          if (typeof node === "undefined" || node === null) return;
  
          const cleared = node.replace("<!--#storyblok#", "").replace("-->", "");
          const options = JSON.parse(cleared);
  
          el.setAttribute("data-blok-c", JSON.stringify(options));
          el.setAttribute("data-blok-uid", options.id + "-" + options.uid);
  
          addClass(el, "storyblok__outline");
        }
      },
    });
  },
};
// --------------------------------



const loadScript = (src, cb) => {
  if (document.getElementById("storyblok-javascript-bridge")) {
    return cb();
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.id = "storyblok-javascript-bridge";

  script.onerror = function () {
    cb(new Error("Failed to load" + src));
  };

  script.onload = function () {
    cb();
  };

  document.getElementsByTagName("head")[0].appendChild(script);
};

let doLoadScript = true;

const initStoryapi = () => {
   return new StoryblokClient({
      accessToken: '<%= options.accessToken %>',
      cache: {
        clear: 'auto',
        type: '<%= options.cacheProvider || 'memory' %>'
      },
      timeout: <%= options.timeout || 0 %><% if (options.region) { %>,
      region: '<%= options.region %>'<% } %><% if (typeof options.https !== 'undefined') { %>,
      https: <%= options.https %><% } %>
    }<% if (typeof options.endpoint !== 'undefined') { %>, '<%= options.endpoint %>'<% } %>)
}

const initStorybridge = (cb, errorCb) => {
  if (typeof errorCb !== "function") {
    errorCb = function () {};
  }
  if (window.location == window.parent.location) {
    errorCb("You are not in the edit mode.");
    return;
  }
  if (!doLoadScript) {
    if (!window.StoryblokBridge) {
      errorCb("The Storyblok bridge script is already loading.");
      return;
    }
    cb();
    return;
  }
  doLoadScript = false;
  loadScript("https://app.storyblok.com/f/storyblok-v2-latest.js", cb);
};

export default ({ app }, inject) => {
  app.use(StoryblokVue);

  inject("storyapi", initStoryapi());
  inject("storybridge", initStorybridge());
};
