import React from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';

import classes from './Orders.module.css';
import { formatDate, deliveryString, numberWithDots } from '../../shared/utility';

const Orders = (props) => {
  const { data } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Név',
        accessor: 'name',
      },
      {
        Header: 'Telefonszám',
        accessor: 'phone',
      },
      {
        Header: 'E-mail cím',
        accessor: 'email',
      },
      {
        Header: 'Lakcím / Kézbesítési cím',
        accessor: 'address',
        Cell: (props) => <div>{props.value.split(';')[0]}</div>,
      },
      {
        Header: 'Végösszeg',
        accessor: 'grandTotal',
        Cell: (props) => <div>{numberWithDots(props.value)} RSD</div>,
      },
      {
        Header: 'Átveli dátum',
        accessor: 'deliveryDate',
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: 'Átvetel',
        accessor: 'delivery',
        Cell: (props) => <div>{deliveryString(props.value)}</div>,
      },
      {
        Header: 'Megjegyzések',
        accessor: 'notes',
      },
      {
        Header: 'Rendelés kelte',
        accessor: 'createdDate',
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: 'Rendelés módosítva',
        accessor: 'updateDate',
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: 'Termékek',
        accessor: 'items',
        Cell: (props) => {
          return <div>{props.data[parseInt(props.row.id)]['items'].map((item) => item.title).join(', ')}</div>;
        },
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className={classes.Orders}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.adminReducer.orders,
  };
};

export default connect(mapStateToProps)(Orders);
