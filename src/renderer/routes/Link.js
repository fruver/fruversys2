import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

// eslint-disable-next-line react/display-name
const Link = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props}/>);

export default Link;