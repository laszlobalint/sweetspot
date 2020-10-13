import React from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useBlockLayout } from 'react-table';
import PropTypes from 'prop-types';

import classes from './Orders.module.css';
import { formatDate, formatDelivery, formatAddress, numberWithDots } from '../../shared/utility';

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
        width: 130,
      },
      {
        Header: 'E-mail cím',
        accessor: 'email',
        width: 250,
      },
      {
        Header: 'Lakcím',
        accessor: 'address',
        width: 220,
        Cell: (props) => <div>{formatAddress(props.value)}</div>,
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
        width: 130,
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: 'Átvetel',
        accessor: 'delivery',
        Cell: (props) => <div>{formatDelivery(props.value)}</div>,
      },
      {
        Header: 'Megjegyzések',
        accessor: 'notes',
        width: 280,
      },
      {
        Header: 'Rendelés kelte',
        accessor: 'createdDate',
        width: 130,
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: 'Termékek',
        accessor: 'items',
        width: 330,
        Cell: (props) => {
          const items = props.data[parseInt(props.row.id)]['items'];
          const fullString = items.map((item) => item.title).join(', ');
          let result = '';
          items.forEach((e) => {
            if (!result.includes(e.title)) result += `${e.title} (${fullString.match(new RegExp(e.title, 'g')).length}), `;
          });
          return (
            <details>
              <summary>Rendelt elemek ({items.length}):</summary>
              {result.slice(0, -2)}
            </details>
          );
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

Orders.propTypes = {
  data: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Orders);
