import {createMuiTheme} from '@material-ui/core/styles';
import common from '@material-ui/core/colors/common';
import teal from '@material-ui/core/colors/teal';
import palette from './palette';
// import typography from './typography';
// import overrides from './overrides';

const theme = createMuiTheme({
  palette: palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;

// #00544a
// #3a8f88