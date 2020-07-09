import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStoreAbstraction } from "redux-dogma";
import { Global } from "@emotion/core";
import * as serviceWorker from "./serviceWorker";

import globalStyles from "./ui/globalStyles";
import { Game, gameSlice } from "./game/index";

const store = createStoreAbstraction().addSlice(gameSlice).lockSideEffects().getStore();

export const ReduxProvider = ({ children }) => <Provider {...{ store, children }} />;

ReactDOM.render(
	<ReduxProvider>
		<Global styles={globalStyles} />
		<Game />
	</ReduxProvider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
