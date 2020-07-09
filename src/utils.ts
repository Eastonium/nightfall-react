import { ParametricSelector } from "reselect";
import { useSelector } from "react-redux";

export function getElementPosition(el) {
	var xPosition = 0;
	var yPosition = 0;

	while (el) {
		if (el.tagName === "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
			var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

			xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
			yPosition += el.offsetTop - yScrollPos + el.clientTop;
		} else {
			xPosition += el.offsetLeft || 0 - el.scrollLeft || 0 + el.clientLeft || 0;
			yPosition += el.offsetTop || 0 - el.scrollTop || 0 + el.clientTop || 0;
		}

		el = el.offsetParent || el.parentNode;
	}
	return {
		x: xPosition,
		y: yPosition,
	};
}

export const useSelectorWithProps = <Result, Props = unknown>(
	selector: ParametricSelector<any, Props, Result>,
	selectorProps: Props,
	equalityFn?: (left: Result, right: Result) => boolean,
) => useSelector(store => selector(store, selectorProps), equalityFn);
export const selectSelectorProps = (_, props) => props;
