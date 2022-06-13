// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
'use strict';

var state = {
  temp: 70,
  city: 'Seattle, WA'
}; // Changes background color of temp box

var changeColor = function changeColor() {
  var tempCityBox = document.getElementById('temp_city_box_grid');

  if (state.temp >= 80) {
    tempCityBox.style.backgroundColor = 'rgba(251, 10, 18, 0.7)';
  } else if (state.temp >= 70) {
    tempCityBox.style.backgroundColor = 'rgba(255, 145, 3, 0.7)';
  } else if (state.temp >= 60) {
    tempCityBox.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
  } else if (state.temp >= 50) {
    tempCityBox.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
  } else if (state.temp >= 40) {
    tempCityBox.style.backgroundColor = 'rgba(0, 204, 255, 0.7)';
  } else {
    tempCityBox.style.backgroundColor = 'rgba(59, 87, 158, 0.8)';
  }
}; // Changes background landscape


var changeBgImg = function changeBgImg() {
  if (state.temp >= 80) {
    document.body.style.backgroundImage = "url('assets/courtney-cook-HClKQKUodF4-unsplash.jpg')";
  } else if (state.temp >= 70) {
    document.body.style.backgroundImage = "url('assets/clement-fusil-Fpqx6GGXfXs-unsplash.jpg')";
  } else if (state.temp >= 60) {
    document.body.style.backgroundImage = "url('assets/dedu-adrian-BxT5oqgztNc-unsplash.jpg')";
  } else if (state.temp >= 50) {
    document.body.style.backgroundImage = "url('assets/nick-scheerbart-soGoAfesWO8-unsplash.jpg')";
  } else if (state.temp >= 40) {
    document.body.style.backgroundImage = "url('assets/james-donovan-kFHz9Xh3PPU-unsplash.jpg')";
  } else {
    document.body.style.backgroundImage = "url('assets/fabien-twb-6K_WE8FB3bE-unsplash.jpg')";
  }
}; // Changes temp based on situation (button click or function call)


var changeTemp = function changeTemp(event) {
  if (event === undefined) {
    'pass';
  } else if (event.composedPath()[1].id === 'down_arrow_btn') {
    state.temp -= 1;
  } else if (event.composedPath()[1].id === 'up_arrow_btn') {
    state.temp += 1;
  }

  var tempText = document.getElementById('temp');
  tempText.textContent = "".concat(state.temp, "\xB0");
  changeColor();
  changeBgImg();
}; // Makes input box hidden or visible


var controlInputBox = function controlInputBox() {
  var inputBox = document.getElementById('city_input_box');

  if (inputBox.getAttribute('type') === 'hidden') {
    inputBox.setAttribute('type', 'text');
  } else {
    inputBox.setAttribute('type', 'hidden');
  }
}; // Change placeholder text in search input box


var changePlaceholderText = function changePlaceholderText() {
  var openInputBox = document.getElementById('city_input_box');
  var placeholderText = openInputBox.getAttribute('placeholder');

  if (placeholderText === 'Type...') {
    openInputBox.setAttribute('placeholder', 'Type in a location and press Enter');
  } else {
    openInputBox.setAttribute('placeholder', 'Type...');
  }
}; // Update city in temp box with each keypress


var changeCity = function changeCity() {
  state.city = document.getElementById('city_input_box').value;
  document.querySelector('h2').textContent = state.city;
};

var getLatAndLong = function getLatAndLong() {
  var location = state.city;
  var latitude, longitude;
  axios.get('http://localhost:5000/location', {
    params: {
      q: location
    }
  }).then(function (response) {
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    var displayName = response.data[0].display_name;
    var nameArray = displayName.split(',');
    var apiCityName = "".concat(nameArray[0], ", ").concat(nameArray[2]);
    state.city = apiCityName;
    document.querySelector('h2').textContent = state.city;
    return {
      latitude: latitude,
      longitude: longitude
    };
  }).then(function (response) {
    axios.get('http://localhost:5000/weather', {
      params: {
        lat: parseFloat(response.latitude),
        lon: parseFloat(response.longitude)
      }
    }).then(function (response) {
      var condition = response.data.current.weather[0].main;
      var tempKelvin = response.data.current.temp;
      state.temp = Math.round((tempKelvin - 273.15) * (9 / 5) + 32);
      changeTemp();
      changeColor();
      changeBgImg(); // Change sky based on API response

      var h1 = document.querySelector('h1');
      var conditions = ['Rain', 'Drizzle', 'Thunderstorm', 'Squall'];

      if (condition === 'Clear') {
        h1.textContent = '☀️ 🌞 🔆 Weather App ☀️ 🌞 🔆';
        h1.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
      } else if (condition === 'Clouds') {
        h1.textContent = '☁️🌤 ☁️ Weather App ☁️🌤 ☁️ ';
        h1.style.backgroundColor = 'rgba(174, 171, 171, 0.7)';
      } else if (condition in conditions) {
        h1.textContent = '🌧 ⛈ 🌧 Weather App 🌧 ⛈ 🌧 ';
        h1.style.backgroundColor = 'rgba(0, 204, 255, 0.7)';
      } else if (condition === 'Snow') {
        h1.textContent = '❄️ 🌨 ❄️ Weather App ❄️ 🌨 ❄️';
        h1.style.backgroundColor = 'white';
      } else {
        h1.textContent = 'Weather App';
        h1.style.backgroundColor = 'rgba(174, 171, 171, 0.7)';
      }
    }).catch(function (error) {
      console.log("Encountered an error: ".concat(error));
    });
  }).catch(function (error) {
    console.log("Encountered an error with getLatAndLong: ".concat(error));
  });
}; // Change sky based on dropdown selection


var changeSky = function changeSky() {
  var select = document.getElementById('sky_drop_down');
  var option = select.options[select.selectedIndex].text;
  var h1 = document.querySelector('h1');

  if (option === 'Sunny') {
    h1.textContent = '☀️ 🌞 🔆 Weather App ☀️ 🌞 🔆';
    h1.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
  } else if (option === 'Cloudy') {
    h1.textContent = '☁️🌤 ☁️ Weather App ☁️🌤 ☁️ ';
    h1.style.backgroundColor = 'rgba(174, 171, 171, 0.7)';
  } else if (option === 'Rainy') {
    h1.textContent = '🌧 ⛈ 🌧 Weather App 🌧 ⛈ 🌧 ';
    h1.style.backgroundColor = 'rgba(0, 204, 255, 0.7)';
  } else if (option === 'Snowy') {
    h1.textContent = '❄️ 🌨 ❄️ Weather App ❄️ 🌨 ❄️';
    h1.style.backgroundColor = 'white';
  } else if (option === 'Choose a Sky') {
    var _h = document.querySelector('h1');

    _h.textContent = 'Weather App';
    _h.style.backgroundColor = 'rgba(174, 171, 171, 0.7)';
  }
};

var resetDropdown = function resetDropdown() {
  var select = document.getElementById('sky_drop_down');
  var option = document.getElementById('select_title');
  select.value = option.value;
};

var resetInfo = function resetInfo() {
  state.city = 'Seattle, WA';
  state.temp = 70;
  resetDropdown();
  changeSky();
  document.querySelector('h2').textContent = state.city;
  changePlaceholderText();
  changeTemp();
};

var registerEventHandlers = function registerEventHandlers(event) {
  // Increase temp when click up arrow
  var upArrowBtn = document.getElementById('up_arrow_btn');
  upArrowBtn.addEventListener('click', changeTemp); // Decrease temp with down arrow

  var downArrowBtn = document.getElementById('down_arrow_btn');
  downArrowBtn.addEventListener('click', changeTemp); // Show input with magnifier

  var magnBtn = document.getElementById('magn_btn');
  magnBtn.addEventListener('click', controlInputBox); // On focus/blur, update placeholder

  var openInputBox = document.getElementById('city_input_box');
  openInputBox.addEventListener('focus', changePlaceholderText);
  openInputBox.addEventListener('focusout', changePlaceholderText); //On text box keyup, update city name

  openInputBox.addEventListener('keyup', changeCity); // Search city name on enter or get real temp btn

  openInputBox.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      controlInputBox();
      getLatAndLong();
    }
  }); //

  var getRealTempBtn = document.getElementById('real_temp_btn');
  getRealTempBtn.addEventListener('click', function () {
    var inputBox = document.getElementById('city_input_box');
    inputBox.setAttribute('type', 'hidden');
    getLatAndLong();
  });
  var form = document.getElementById('holds_input_box');
  form.addEventListener('submit', function (event) {
    return event.preventDefault();
  });
  var select = document.getElementById('sky_drop_down');
  select.addEventListener('change', changeSky);
  var resetBtn = document.getElementById('reset_btn');
  resetBtn.addEventListener('click', resetInfo);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', changeColor);
document.addEventListener('DOMContentLoaded', changeBgImg);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64692" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map