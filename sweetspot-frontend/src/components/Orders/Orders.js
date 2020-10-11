import React from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useBlockLayout } from 'react-table';

import classes from './Orders.module.css';
import { formatDate, deliveryString, numberWithDots } from '../../shared/utility';

const Orders = (props) => {
  const { data } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Név',
        accessor: 'name',
      },
      {
        Header: 'Telefonszám',
        accessor: 'phone',
        width: 120,
      },
      {
        Header: 'E-mail cím',
        accessor: 'email',
        width: 250,
      },
      {
        Header: 'Lakcím',
        accessor: 'address',
        width: 250,
        Cell: (props) => <div>{props.value.split(';')[0]}</div>,
      },
      {
        Header: 'Végösszeg',
        accessor: 'grandTotal',
        width: 100,
        Cell: (props) => <div>{numberWithDots(props.value)} RSD</div>,
      },
      {
        Header: 'Átveli dátum',
        accessor: 'deliveryDate',
        width: 100,
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
        width: 280,
      },
      {
        Header: 'Rendelés kelte',
        accessor: 'createdDate',
        width: 100,
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: 'Termékek',
        accessor: 'items',
        width: 350,
        Cell: (props) => {
          const fullString = props.data[parseInt(props.row.id)]['items'].map((item) => item.title).join(', ');
          let result = '';
          props.data[parseInt(props.row.id)]['items'].forEach((e) => {
            if (!result.includes(e.title)) result += `${e.title} (${fullString.match(new RegExp(e.title, 'g')).length}), `;
          });
          return <div>{result.slice(0, -2)}</div>;
        },
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSortBy,
  );

  return (
    <div className={classes.Orders}>
      <table {...getTableProps()} className={classes.Orders}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.adminReducer.orders,
  };
};

export default connect(mapStateToProps)(Orders);
