import React from 'react';

import spybotImage from 'assets/base/textures/spybots/Snaptrax S45.png';

export const Grid = props => (
	<div {...props}>
		<img src={spybotImage} style={{ width: "100%", height: "100%", opacity: 0.2 }} />
	</div>
);