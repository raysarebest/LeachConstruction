function componentToHex(value){
	var hex = value.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function RGBToHex(r,g,b){
	return "#"+componentToHex(r)+componentToHex(g)+componentToHex(b);
}
function getRandomColorValue(){
	return Math.round(Math.random()*255);
}
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
var gmt=["AM","PM"];
window.onload = function(){changeColorAndTime();}
setInterval(function(){
	changeColorAndTime();
}, 1000);
function changeColorAndTime(){
	var date = new Date();
	function hour(input){
		if(input==="number"){
			var hours;
			if(date.getHours()>12){
				return date.getHours()-12;
			}
			else if(date.getHours()===0){
				return 12;
			}
			else{
				return date.getHours();
			}
		}
		else if(input==="ap"){
			if(date.getHours()>=12){
				return 1;
			}
			else{
				return 0;
			}
		}
	}
	function minutes(){
		if(date.getMinutes()<10){
			return "0"+date.getMinutes();
		}
		else{
			return date.getMinutes();
		}
	}
	function seconds(){
		if(date.getSeconds()<10){
			return "0"+date.getSeconds();
		}
		else{
			return date.getSeconds();
		}
	}
	var r = getRandomColorValue();
	var g = getRandomColorValue();
	var b = getRandomColorValue();
	if(r+g+b<383 && g<175){
		for(var i = 0; i < document.getElementsByTagName('p').length; i++){
			document.getElementsByTagName('p')[i].style.color = "#ccc";
		}
		document.getElementsByTagName('header')[0].style.boxShadow = "0 0 10px 1px #ccc";
		document.getElementsByTagName('h2')[0].style.color = "#ccc";
	}
	else{
		for(var x = 0; x < document.getElementsByTagName('p').length; x++){
			document.getElementsByTagName('p')[x].style.color = "#000";
		}
		document.getElementsByTagName('header')[0].style.boxShadow = "0 0 10px 1px #000";
		document.getElementsByTagName('h2')[0].style.color = "#000";
	}
	var color = RGBToHex(r,g,b);
	document.getElementById('color').innerHTML=color;
	document.getElementById('date').innerHTML=days[date.getDay()]+", "+months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" "+hour("number")+":"+minutes()+":"+seconds()+" "+gmt[hour("ap")];
	var rgb = "(rgb: "+r+", "+g+", "+b+")";
	document.getElementById('rgb').innerHTML=rgb;
	document.getElementsByTagName("html")[0].style.background=color;
	console.log(color+", "+ rgb);
}