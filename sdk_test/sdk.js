var VENN = (function(window,undefined){
	var VENN = {};

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

	return VENN;
}());

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