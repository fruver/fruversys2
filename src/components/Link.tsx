import * as React from 'react';
import {LinkProps, Link as RouterLink} from 'react-router-dom';

// eslint-disable-next-line react/display-name
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <RouterLink innerRef={ref} {...props}/>);

export default Link;