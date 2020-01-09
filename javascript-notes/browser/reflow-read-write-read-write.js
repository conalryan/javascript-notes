console.log('Executing read-write read-write');

var div1 = document.getElementById('div-1');
var divHeight = div1.clientWidth / 1.7;
div1.style.height = divHeight + 'px';

var div2 = document.getElementById('div-2');
var div2Height = div2.clientWidth / 1.7;
div2.style.height = div2Height + 'px';