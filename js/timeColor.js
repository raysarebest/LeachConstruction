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
function hour(input, date){
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
function minutes(date){
	if(date.getMinutes()<10){
		return "0"+date.getMinutes();
	}
	else{
		return date.getMinutes();
	}
}
function seconds(date){
	if(date.getSeconds()<10){
		return "0"+date.getSeconds();
	}
	else{
		return date.getSeconds();
	}
}
function getAndAssignTime(){
	var date = new Date();
}
function RGBToHSL(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r:
							h = (g - b) / d + (g < b ? 6 : 0);
							break;
            case g:
							h = (b - r) / d + 2;
							break;
            case b:
							h = (r - g) / d + 4;
							break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function HueToRGB(m1, m2, hue){
	if(hue < 0){
		hue += 1;
	}
	if(hue > 1){
		hue -=1;
	}
	if(hue * 6 < 1){
		return m1 + (m2 - m1) * hue * 6;
	}
	if(hue * 2 < 1){
		return m2;
	}
	if(hue * 3 < 2){
		return m1 + (m2 - m1) * (2/3 - hue) * 6;
	}
	return m1;
}
function HSLToRGB(h, s, l){
	h /= 360;
	s /= 100;
	l /= 100;
	var m1, m2, r, g, b;
  if(l <= 0.5){
		m2 = l * (s + 1);
	}
	else{
		m2 = l + s - l * s;
	}
	m1 = l * 2 - m2;
	r = HueToRGB(m1, m2, h + 1/3);
	g = HueToRGB(m1, m2, h);
	b = HueToRGB(m1, m2, h - 1/3);
	return [r, g, b];
}
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
var gmt=["AM","PM"];
var prevColor = RGBToHSL(34, 177, 76);
window.onload = function(){changeColorAndTime();};
setInterval(function(){
	changeColorAndTime();
}, 100);
function changeColorAndTime(){
	var date = new Date();
	var everything = document.getElementsByTagName("*");
	for(var i = 0; i < everything.length; i++){
		if(everything[i] != document.getElementById("blueprint") && everything[i] != document.getElementsByTagName("header")[0] && everything[i] != document.getElementsByTagName("h1")[0]){
			everything[i].style.background = "hsl("+prevColor[0]+", "+prevColor[1]+"%, "+prevColor[2]+"%)";
		}
	}
	document.getElementById('date').innerHTML=days[date.getDay()]+", "+months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" "+hour("number", date)+":"+minutes(date)+":"+seconds(date)+" "+gmt[hour("ap", date)];
	var color = HSLToRGB(prevColor[0], prevColor[1], prevColor[2]);
	for(var i = 0; i< 3; i++){
		color[i] = Math.round(color[i]*255);
	}
	document.getElementById('color').innerHTML = RGBToHex(color[0], color[1], color[2]);
	document.getElementById('rgb').innerHTML = "(rgb: "+color[0]+", "+color[1]+", "+color[2]+")";
	if(prevColor[0]===360){
		prevColor[0] = 0;
	}
	else{
		prevColor[0]++;
	}
	date = undefined;
}
