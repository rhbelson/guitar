function myMap() {
var mapProp= {
    center:new google.maps.LatLng(42.051709,-87.671492),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


window.onload=function() {
  var l=document.getElementById("linkedin");
  l.addEventListener("click",goto_linkedin);
  var t=document.getElementById("twitter");
  t.addEventListener("click",goto_twitter);
  var i=document.getElementById("insta");
  i.addEventListener("click",goto_insta);
  var sc=document.getElementById("soundcloud");
  sc.addEventListener("click"),gotosoundcloud);
}

function goto_soundcloud() {
  location.replace("https://soundcloud.com/robertbelson");
}

function goto_linkedin() {
	location.replace("https://www.linkedin.com/in/robert-belson-7886ba126/");
}
function goto_twitter() {
	location.replace("https://www.twitter.com/robertbelson");
}

function goto_insta() {
	location.replace("https://www.instagram.com/rhbelson");
}