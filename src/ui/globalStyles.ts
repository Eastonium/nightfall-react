import { css } from "@emotion/core";

export default css`
	@font-face {
		font-family: "Abstract";
		src: url("/fonts/Abstract.ttf");
	}
	@font-face {
		font-family: "BitLight";
		src: url("/fonts/BitLight.ttf");
	}
	@font-face {
		font-family: "04b_25";
		src: url("/fonts/04b_25.ttf");
	}

	* {
		box-sizing: border-box;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		line-height: 1em;
	}

	:focus {
		outline: none;
	}

	html {
		width: 100%;
		height: 100%;
	}

	body {
		width: 100%;
		height: 100%;
		margin: 0;
		font-family: "BitLight";
		font-size: 10px;
		/* font-smooth: never; */
		-webkit-font-smoothing: none;
		image-rendering: pixelated;
		background: #000;
		color: #fff;
	}

	button {
		margin: 0;
		border: 0;
		border-radius: 0;
		padding: 0;
		background: none;
	}

	#root {
		height: 100%;
	}
`;
