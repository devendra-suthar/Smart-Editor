function UserAction() {

	//Accessing the editor
	var editor = ace.edit("codeEditor");
	
	//Getting text form the editor
	var text = editor.getValue();
	
	var langOptions = document.getElementById("languages");
	var language = langOptions.options[langOptions.selectedIndex].value;
	console.log(language);
    
	//Forming http request
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://api.jdoodle.com/v1/execute", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
	//OnResponse from the server
	xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        var json = JSON.parse(xhttp.responseText);
		document.getElementById('output').innerHTML = json.output;
		console.log(json.output + ", " + json.statusCode);
    }
};

	//Creating data
	var data = JSON.stringify({
		"script":text,
		"language":language,
		"versionIndex":"0",
		"clientId":"69cdf4df5bd85a70a0bade64fbd66ecf",
		"clientSecret":"f902c22c3cb7549296ea02f72c9de8f81c8b3cec71da0bc86d2f030816214eec"
	});

	//Sending request to the server
    xhttp.send(data);
}


// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
	xhr.setRequestHeader("Content-type", "application/json");
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
	xhr.setRequestHeader("Content-type", "application/json");
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://api.jdoodle.com/execute';
  var corsURL = 'https://cors-anywhere.herokuapp.com/' + url;
  
  var xhr = createCORSRequest('POST', corsURL);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  
	//Accessing the editor
	var editor = ace.edit("codeEditor");

	//Getting text form the editor
	var text = editor.getValue();

	var langOptions = document.getElementById("languages");
	var language = langOptions.options[langOptions.selectedIndex].value;
	console.log(language);
	//Creating data
	var data = JSON.stringify({
		"script":text,
		"language":language,
		"versionIndex":"0",
		"clientId":"69cdf4df5bd85a70a0bade64fbd66ecf",
		"clientSecret":"f902c22c3cb7549296ea02f72c9de8f81c8b3cec71da0bc86d2f030816214eec"
	});
  // Response handlers.
  xhr.onload = function() {
    //var text = xhr.responseText;
		var json = JSON.parse(xhr.responseText);
		document.getElementById('output').innerHTML = json.output;
		console.log(json.output + ", " + json.statusCode);
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send(data);
}
