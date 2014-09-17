(function(window,undefined){
	var Venn = {};

	if (window.Venn) return;

    Venn.init = function(callback) {
        Venn.script("http://tim.api.getpeerio.com/v1/web-service-api/lib.js", function() {
            Venn._initializeLibrary(callback);
        });
    };

	function loadSupportingFiles(callback) {
		// Google Hosted AJAX
		var jQueryAjax = document.createElement('script');
		jQueryAjax.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
		jQueryAjax.async = true;

		// Insert jQuery script tag dependancy
		var sdkScriptTag = document.getElementsByTagName('script')[0];
		sdkScriptTag.parentNode.insertBefore(jQueryAjax, sdkScriptTag);

		jQueryAjax.onload = jQueryAjax.onreadystatechange = function() {
			var rdyState = jQueryAjax.readyState;
			// if (!rdyState || /complete|loaded/.test(jQueryAjax.readyState)) {
			if (!rdyState) {
				callback();
				jQueryAjax.onload = null;
				jQueryAjax.onreadystatechange = null;
			}
		};
	}
	
	function getWidget(callback) {
		var user_id = '9382SDFDS409SDDF23PAA';
		var venn_api_key = 'DJHS4389JKRH98FUD0SJL340934';
		
		var url = 'http://tim.api.getpeerio.com/v1/schedule.js?userId=' + user_id + '&apiKey=' + venn_api_key;
		
		$.ajax({
			url: url,
			method: 'GET',
			success: function(res){ callback(res);},
		});
	}

	loadSupportingFiles(function() {
		getWidget(function(res){
			var schedWidget = document.getElementById('schedule-widget');
			schedWidget.innerHTML = res;
		});
	});
  window.Venn = Venn;
})(this);

// # setting a user schedule
// post
// //tim.api.getpeerio.com/v1/user/9382SDFDS409SDDF23PAACC/settimeframes?apiKey=DJHS4389JKRH98FUD0SJL340934
// data = 
//     timezone: new Date().getTimezoneOffset()
//     timeframes: [
//         "209001200"
//         "412001400"
//         "612001400"
//         "014001700"
//     ]

// Embed the 'script' microlib into our initial script file for loading dependencies.
!function (name, definition) {
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
  else this[name] = definition()
}('$script', function() {
  var win = this, doc = document
    , head = doc.getElementsByTagName('head')[0]
    , validBase = /^https?:\/\//
    , old = win.$script, list = {}, ids = {}, delay = {}, scriptpath
    , scripts = {}, s = 'string', f = false
    , push = 'push', domContentLoaded = 'DOMContentLoaded', readyState = 'readyState'
    , addEventListener = 'addEventListener', onreadystatechange = 'onreadystatechange'

  function every(ar, fn, i) {
    for (i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
    return 1
  }
  function each(ar, fn) {
    every(ar, function(el) {
      return !fn(el)
    })
  }

  if (!doc[readyState] && doc[addEventListener]) {
    doc[addEventListener](domContentLoaded, function fn() {
      doc.removeEventListener(domContentLoaded, fn, f)
      doc[readyState] = 'complete'
    }, f)
    doc[readyState] = 'loading'
  }

  function $script(paths, idOrDone, optDone) {
    paths = paths[push] ? paths : [paths]
    var idOrDoneIsDone = idOrDone && idOrDone.call
      , done = idOrDoneIsDone ? idOrDone : optDone
      , id = idOrDoneIsDone ? paths.join('') : idOrDone
      , queue = paths.length
    function loopFn(item) {
      return item.call ? item() : list[item]
    }
    function callback() {
      if (!--queue) {
        list[id] = 1
        done && done()
        for (var dset in delay) {
          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
        }
      }
    }
    setTimeout(function () {
      each(paths, function(path) {
        if (scripts[path]) {
          id && (ids[id] = 1)
          return scripts[path] == 2 && callback()
        }
        scripts[path] = 1
        id && (ids[id] = 1)
        create(!validBase.test(path) && scriptpath ? scriptpath + path + '.js' : path, callback)
      })
    }, 0)
    return $script
  }

  function create(path, fn) {
    var el = doc.createElement('script')
      , loaded = f
    el.onload = el.onerror = el[onreadystatechange] = function () {
      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
      el.onload = el[onreadystatechange] = null
      loaded = 1
      scripts[path] = 2
      fn()
    }
    el.async = 1
    el.src = path
    head.insertBefore(el, head.firstChild)
  }

  $script.get = create

  $script.order = function (scripts, id, done) {
    (function callback(s) {
      s = scripts.shift()
      if (!scripts.length) $script(s, id, done)
      else $script(s, callback)
    }())
  }

  $script.path = function(p) {
    scriptpath = p
  }
  $script.ready = function(deps, ready, req) {
    deps = deps[push] ? deps : [deps]
    var missing = [];
    !each(deps, function(dep) {
      list[dep] || missing[push](dep);
    }) && every(deps, function(dep) {return list[dep]}) ?
      ready() : !function(key) {
      delay[key] = delay[key] || []
      delay[key][push](ready)
      req && req(missing)
    }(deps.join('|'))
    return $script
  }

  $script.noConflict = function () {
    win.$script = old;
    return this
  }

  return $script
})

Venn.script = $script.noConflict();