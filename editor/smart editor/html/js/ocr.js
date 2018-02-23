function progressUpdate(packet){
	var log = document.getElementById('log');

	if(log.firstChild && log.firstChild.status === packet.status){
		if('progress' in packet){
			var progress = log.firstChild.querySelector('progress')
			progress.value = packet.progress
		}
	}else{
		var line = document.createElement('div');
		line.status = packet.status;
		var status = document.createElement('div')
		status.className = 'status'
		status.appendChild(document.createTextNode(packet.status))
		line.appendChild(status)

		if('progress' in packet){
			var progress = document.createElement('progress')
			progress.value = packet.progress
			progress.max = 1
			line.appendChild(progress)
		}


		if(packet.status == 'done'){
			var pre = document.createElement('pre')
			pre.appendChild(document.createTextNode(packet.data.text))
			line.innerHTML = ''
			line.appendChild(pre)

		}

		log.insertBefore(line, log.firstChild)
	}
}

function recognizeFile(file){
	document.querySelector("#log").innerHTML = ''

	Tesseract.recognize(file, {
		lang: document.querySelector('#langsel').value
	})
		.progress(function(packet){
			console.info(packet)
			progressUpdate(packet)

		})
		.then(function(data){
			console.log(data)
			progressUpdate({ status: 'done', data: data })
		})
}

$("#upload").click(function(){
    $("#upload-file").trigger('click');
});