import 'core-js';
import 'regenerator-runtime';

let resource = require('./apps.resource');
let apps = [];
let appContent = null;

import {EventBus} from './eventBus.js';

initialize();

function loadMatchingApp() {
    let match = matchRoute(window.location);

    if (match) {
        loadAppContent(match.app);
        configureNavbar(match.route);
        updateTitle();
    }
}

function loadAppContent(app) {
    if(!app) {
      return;
    }

    if (appContent.contentWindow.location.href.startsWith(app.root)) {
        appContent.contentWindow.location.hash = window.location.hash;
        return;
    }

    let location = `${app.root}${window.location.hash}`;
    appContent.contentWindow.location.replace(location);
}

function matchRoute(location) {
    let match = {
        app: null,
        route: null
    };

    apps.forEach(app => {
        let matchingRoute = app.routes.find(m => new RegExp(m.hashPattern).test(location.hash));
        if (matchingRoute) {
            match.app = app;
            match.route = matchingRoute;
            return;
        }
    });

    return match;
}

async function registerApps() {
    resource.getApps().then(x =>
      {
        apps = x.results;
        appContent = document.querySelector('#app-content');

        appContent.addEventListener('load', () => {
            updateApplicationUrl(true);
            setAppContentEvents();
        });

        setDefaultRoute();
        loadMatchingApp();
      });
}

function select2maskblur() {
  let select2mask = appContent.contentWindow.window.document.querySelector('#select2-drop-mask');
  if (select2mask) {
    select2mask.click();
  }
}

function configureNavbar(route) {
    // var hasNavbar = !route || route.hasNavbar === false ? false : true;
    // window.navbar.hasNavbar(hasNavbar);
}

function updateApplicationUrl(checkMatchingApp) {
    let location = `${window.location.origin}/${appContent.contentWindow.window.document.location.hash}`;
    window.history.replaceState(null, appContent.contentWindow.window.document.title, location);

    if(checkMatchingApp) {
      loadMatchingApp();
    }

    updateTitle();
}

function initialize() {
    const events = new EventBus();
    events.subscribe('message-from-child', function(data){
        console.log('recieved message from child iframe');
    //    sendReceivedMessageToAllIframes({type: 'message-to-child', data: {}});
    });

    window.addEventListener('load', async () => {
      appContent = document.querySelector('#app-content');
        if(appContent) { //if cached and loads off back button / else load function adds these
          setAppContentEvents();
        }

        await registerApps();

        window.addEventListener("hashchange", () => {
            loadMatchingApp();
        });

        window.addEventListener('blur', function () {
            let openNavbarDropdown = document.querySelector('#navbar-content').querySelector('.dropdown.open .dropdown-toggle');
            if (openNavbarDropdown) {
                openNavbarDropdown.parentElement.classList.remove('open');
            }
        });
    });
}


function setAppContentEvents() {
  appContent.contentWindow.addEventListener('hashchange', updateApplicationUrl);
  appContent.contentWindow.addEventListener('blur', select2maskblur);
  setupRouteChangeDetectionForAngularApplication();
}

function setDefaultRoute() {
  window.location.href = window.location.href.includes("/#/") ? window.location.href : window.location.origin + "/#/";
}

function setupRouteChangeDetectionForAngularApplication() {
  ((history) => {
    var pushState = history.pushState;
    history.pushState = (state, key, path) => {
      setTimeout(function() {
        updateApplicationUrl();
      });

      return pushState.apply(history,[state,key,path]);
    };
  })(appContent.contentWindow.history);
}

function updateTitle() {
  setTimeout(function() {
    let title = appContent.contentWindow.window.document.title;
    window.document.title = title;
  });
}

function sendReceivedMessageToAllIframes(event) {
  document
    .querySelectorAll("iframe")
    .forEach(function(iframe) {
      console.log(iframe);
      iframe.contentWindow.postMessage({ type: 'message-to-child', data: { test: 4} }, '*');
    });
};

//window.addEventListener("message", sendReceivedMessageToAllIframes);