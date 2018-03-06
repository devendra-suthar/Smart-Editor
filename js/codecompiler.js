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