console.log('Executing read-read write-write');

var div1 = document.getElementById('div-1');
var div2 = document.getElementById('div-2');

var divHeight = div1.clientWidth / 1.7;
var div2Height = div2.clientWidth / 1.7;

div1.style.height = divHeight + 'px';
div2.style.height = div2Height + 'px';