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
  sc.addEventListener("click",goto_soundcloud);
  var s=document.getElementById("submit");
  s.addEventListener("click", send_mail);
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

function send_mail() {

  var n=String(document.getElementById("name").value);
  var e=String(document.getElementById("email").value);
  var msg=String(document.getElementById("body").value);
  console.log(n+","+e+","+msg);
  var service_id = 'gmail';
  var template_id = 'feedback';
  var template_params = {
    name: n,
    reply_email: e,
    message: msg
};

  if (n && e && msg) {
  // emailjs.send(service_id,template_id,template_params);
  console.log("You have Submitted Your Message");
  emailjs.send('gmail','feedback',template_params);
  document.getElementById("name").value="";
  document.getElementById("email").value="";
  document.getElementById("body").value="";
  alert("Message Submitted");

  }
  else {
    alert("Please complete all of the required fields to submit");
  }

}