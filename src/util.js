export function getElementPosition(el) {
	var xPosition = 0;
	var yPosition = 0;

	while (el) {
		if (el.tagName === "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
			var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

			xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
			yPosition += (el.offsetTop - yScrollPos + el.clientTop);
		} else {
			xPosition += (el.offsetLeft || 0 - el.scrollLeft || 0 + el.clientLeft || 0);
			yPosition += (el.offsetTop || 0 - el.scrollTop || 0 + el.clientTop || 0);
		}

		el = el.offsetParent || el.parentNode;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}