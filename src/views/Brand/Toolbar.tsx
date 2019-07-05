import * as React from 'react';

// FontAwesome
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/pro-regular-svg-icons';

// MaterialUI
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1)
    },
    spacer: {
      flexGrow: 1
    }
  })
);

const Toolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Button
          color="primary"
          size="small"
          variant="outlined"
        >
          <Icon icon={faPlus} />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;