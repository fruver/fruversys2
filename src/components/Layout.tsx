import * as React from 'react';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faBug} from '@fortawesome/pro-regular-svg-icons';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import MUISnackbarContent from '@material-ui/core/SnackbarContent';
import LayoutBase from './LayoutBase';
import {SpinnerLinear} from './Spinner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    snackbarContentError: {
      backgroundColor: theme.palette.error.dark,
      padding: theme.spacing(2),
    },
    snackbarContentIcon: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    snackbarContentMessage: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

interface Props {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  children: any;
}

const Layout = ({
  title,
  isLoading,
  isError,
  children
}: Props) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <LayoutBase title={title}>
        <SpinnerLinear />
      </LayoutBase>
    );
  }

  if (isError) {
    return (
      <LayoutBase title={title}>
        <MUISnackbarContent
          className={classes.snackbarContentError}
          message={
            <span className={classes.snackbarContentMessage}>
              <Icon
                className={classes.snackbarContentIcon}
                icon={faBug}
                size="lg"
                fixedWidth
              />
              Ups! a ocurrido un error, si el problema persiste
              por favor contacta al equipo de soporte.
            </span>
          }
        />
      </LayoutBase>
    );
  }

  return (
    <LayoutBase title={title}>
      {children}
    </LayoutBase>
  );
};

export default Layout;