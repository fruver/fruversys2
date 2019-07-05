import * as React from 'react';

// MaterialUI
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';

// Type Objects
import {ObjectsProps} from '../hooks/useListView';

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    cellId: {
      fontWeight: 400,
      textDecoration: 'none'
    }
  }),
);

interface HeadRow {
  disablePadding: boolean;
  id: keyof ObjectsProps;
  label: string;
  numeric: boolean;
}

const TableList = ({
  objects
}: ObjectsProps[]) => {
  const classes = useStyles();

  const headRows = () => {
    const keys = Object.keys(objects[0]);
    console.log(`keys ${keys}`);
    return keys;
  };

  return (
    <>
      {console.log(objects)}
      {console.log(objects[0])}
      {objects.map((obj: ObjectsProps) => (
        <div key={obj}>
          <button
            type="button"
            onClick={() => alert(obj)}
          >Click Me
          </button>
        </div>
      ))}
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha de creación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map(object => 
            <TableRow>
              {object.map(item =>c )}
            </TableRow>
          )}
          <TableRow>
            <TableCell>Prueba</TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </>
  );
};

export default TableList;

