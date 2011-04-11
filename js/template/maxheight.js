var maxHeight = function(classname) {
var divs = document.getElements('div.' + classname);
var max = 0;
divs.each(function(div) {
	max = Math.max(max, div.getSize().size.y);
});
divs.setStyle('height', max);
return max;
}
window.addEvent('load', function() {
maxHeight('eqal');
maxHeight.delay(500, maxHeight, 'equal');
}); 