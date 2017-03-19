window.onload=function() {
	var w=document.getElementById("welcome");
  	w.addEventListener("click",go_home);
}

function go_home() {
	location.replace("index.html");
}