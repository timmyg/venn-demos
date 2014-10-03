$(function() {
	console.log("loaded");
	var header = "";
	header += "<div class='col-xs-3'><a href='marketplace.html' id='marketplace'>Marketplace</a></div>";
    header += "<div class='col-xs-3'><a href='dating.html' id='dating'>Dating</a></div>";
    header += "<div class='col-xs-3'><a href='professional.html' id='professional'>Professional</a></div>";
    header += "<div class='col-xs-3'><a href='social.html' id='social'>Social</a></div>";

	$("header").append(header);


	var script = "";
    script += "<div id='venn-picktimes' class='venn'></div>";
	script += "<script>";
	script += "    config = {";
	script += "        apikey: '2ae2077035c2250ff655',";
	script += "        userid: 'user999',";
	script += "        authoruserid: 'alwayshastimes888',";
	script += "        txnid: 'txn2345',";
	script += "        addresses: [";
	script += "            '45040',";
	script += "            '45208'";
	script += "        ]";
	script += "    };";
	script += "    var script = document.createElement('script'); script.onload = function() {Venn.init(function() {Venn.api('pickmeetup.js', { userid: config.userid, apiKey: config.apikey, authoruserid: config.authoruserid, addresses: config.addresses, txnid: config.txnid }, 'GET', function(response) {document.getElementById('venn-picktimes').innerHTML = response.data; Venn.picktimesLoaded(); if (typeof vennLoaded == 'function') { vennLoaded(); }; Venn.setCoords(config.addresses);  }); }); }; script.src = '//api.getvenn.io/v1/sdk.js?userid='+config.userid+'&apikey='+config.apikey+'&txnid='+config.txnid+'&authoruserid='+config.authoruserid; document.getElementsByTagName('head')[0].appendChild(script);";
	script += "</script>";

	$("div.container").append(script);


});