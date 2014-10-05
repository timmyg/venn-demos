$(function() {
	console.log("loaded");

	$( ".rec-type" ).bind( "click", function(e) {
  		var address1 = $("input#person-1").val();
  		var address2 = $("input#person-2").val();
  		var apiKey = e.currentTarget.dataset.apiKey;

  		if( address1 === '' || 
		    address2 === '' ){
		 	return toastAlert(".inputs");
		 }
		 removeWidget();
		 loadWiget(address1, address2, apiKey);
	});

	var removeWidget = function() {
		$("script[src*='getvenn.io']").remove();
		$("iframe").remove();
		$("#venn-picktimes").remove();
	}
	var loadWiget = function(address1, address2, apiKey) {
			console.log("ls");

			var addresses = JSON.stringify([ address1, address2 ]);
			var script = "";
		    script += "<div id=\"venn-picktimes\" class=\"venn\"></div>";
			script += "<script>";
			script += "    config = {";
			script += "        apikey: \""+ apiKey +"\",";
			script += "        userid: \"user999\",";
			script += "        authoruserid: \"alwayshastimes888\",";
			script += "        txnid: \"txn2345\",";
			script += "        addresses: "+addresses+"";
			script += "    };";
			script += "    var script = document.createElement(\"script\"); script.onload = function() {Venn.init(function() {Venn.api(\"pickmeetup.js\", { userid: config.userid, apiKey: config.apikey, authoruserid: config.authoruserid, addresses: config.addresses, txnid: config.txnid }, \"GET\", function(response) {document.getElementById(\"venn-picktimes\").innerHTML = response.data; Venn.picktimesLoaded(); if (typeof vennLoaded == \"function\") { vennLoaded(); }; Venn.setCoords(config.addresses);  }); }); }; script.src = \"//api.getvenn.io/v1/sdk.js?userid=\"+config.userid+\"&apikey=\"+config.apikey+\"&txnid=\"+config.txnid+\"&authoruserid=\"+config.authoruserid; document.getElementsByTagName(\"head\")[0].appendChild(script);";
			script += "</script>";

			$("iframe").remove();
			$("div.widget-container").html(script);
			console.log("appended");
	}


	var toastAlert = function(selector) {
	  $(".alert" + selector).removeClass("hide");
	  return window.setTimeout((function() {
	    return $(".alert" + selector).addClass("hide");
	  }), 4000);
	};

});