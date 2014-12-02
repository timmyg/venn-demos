$(function() {

	$( ".rec-type" ).bind( "click", function(e) {
		$(".recommendation-type a").removeClass("active");
		$(this).addClass("active");
  		var address1 = $("input#person-1").val();
  		var address2 = $("input#person-2").val();
  		// console.log(this.dataset.apiKey);
  		var apiKey = this.dataset.apiKey;
  		var type = $(this).attr("id");

  		if( address1 === '' || 
		    address2 === '' ){
		 	return toastAlert(".inputs");
		 }
		 // removeWidget();
		 // loadWidget(address1, address2, apiKey);
		 window.location.href = "../places/?address1="+address1+"&address2="+address2+"&apiKey="+apiKey+"&type="+type;
	});

	var removeWidget = function() {
		$("script[src*='getvenn.io']").remove();
		$("iframe").remove();
		$("#venn-picktimes").remove();
	}

	var loadWidget = function(address1, address2, apiKey) {
			var addresses = JSON.stringify([ {address: address1}, {address: address2} ]);
			console.log("loading widget with apiKey: ", apiKey);


			$("script[src*='getvenn.io']").remove();
			$("iframe").remove();
			$("#venn-picktimes").remove();
			$("script.venn-script").remove();

			var script = "";
		    script += "<div id=\"venn-picktimes\" class=\"venn\"></div>";
			script += "<script class=\"venn-script\">";
			script += "    config = {";
			script += "        apikey: \""+ apiKey +"\",";
			// script += "        userid: \"user999\",";
			// script += "        authoruserid: \"alwayshastimes888\",";
			// script += "        txnid: \"txn2345\",";
			script += "        addresses: "+addresses+"";
			script += "    };";
			script += "    var script = document.createElement(\"script\"); script.onload = function() {Venn.init(function() {data = { userid: config.userid, apiKey: config.apikey, authoruserid: config.authoruserid, addresses: config.addresses, txnid: config.txnid }; Venn.api(\"pickmeetup.js\", JSON.stringify(data), \"POST\", function(response) {document.getElementById(\"venn-picktimes\").innerHTML = response.data; Venn.picktimesLoaded(); if (typeof vennLoaded == \"function\") { vennLoaded(); }; Venn.setCoords(config.addresses);  }); }); }; script.src = \"//api.getvenn.io/v0.1/sdk.js?userid=\"+config.userid+\"&apikey=\"+config.apikey+\"&txnid=\"+config.txnid+\"&authoruserid=\"+config.authoruserid; document.getElementsByTagName(\"head\")[0].appendChild(script);";
			script += "</script>";

			$("div.widget-container").html(script);
			console.log("appended");
	}


	var toastAlert = function(selector) {
	  $(".alert" + selector).removeClass("hide");
	  return window.setTimeout((function() {
	    return $(".alert" + selector).addClass("hide");
	  }), 4000);
	};

	var getUrlParameter = function (sParam) {
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}

	// load widget if params are present
	var address1 = getUrlParameter("address1");
	var address2 = getUrlParameter("address2");
	var apiKey = getUrlParameter("apiKey");
	var type = getUrlParameter("type");
	if( address1 && address2 && apiKey ){
		console.log("loading widget");
		$("input#person-1").val(decodeURI( address1 ) );
  		$("input#person-2").val(decodeURI( address2 ) );
  		// for some reason adding slash to end sometimes
  		type = type.replace(/\//g, '');
  		$("a#" + type).addClass("active");
		loadWidget(address1, address2, apiKey);
	}

});