import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import * as serviceWorker from './serviceWorker';

import globalStyles from './globalStyles';
import { Game } from './game';

ReactDOM.render(<><Global styles={globalStyles} /><Game packId="base" /></>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
