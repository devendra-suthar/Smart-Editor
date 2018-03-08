/*============== sidenav for dashboard ============*/
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


/*=========== sidenav for progress bar =============*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/*-------------- funciton for opening differet pages in iframe-------*/
function openPage(){
	//var iframe = document.getElementById('openPages');
	//iframe.src = "textEditor.html";
	var ifile = "C:\Users\ADMIN\Desktop\se editor\Smart-Editor\textEditor.html";
	$('#editor').click(function(){
		$('<iframe>')
		.attr('src', ifile)
		.attr('height', 500)
		.attr('width', 500)
		.appendTo('#iframe_div');
		});
}