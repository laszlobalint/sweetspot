import React from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useBlockLayout } from 'react-table';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import classes from './Orders.module.css';
import { formatDate, formatAddress, numberWithDots } from '../../shared/utility';

const Orders = (props) => {
  const { data } = props;

  const { t } = useTranslation();
  const columns = React.useMemo(
    () => [
      {
        Header: t('name'),
        accessor: 'name',
      },
      {
        Header: t('phone-number'),
        accessor: 'phone',
        width: 130,
      },
      {
        Header: t('email-address'),
        accessor: 'email',
        width: 250,
      },
      {
        Header: t('address-residental'),
        accessor: 'address',
        width: 220,
        Cell: (props) => <div>{formatAddress(props.value)}</div>,
      },
      {
        Header: t('grand-total'),
        accessor: 'grandTotal',
        width: 100,
        Cell: (props) => <div>{numberWithDots(props.value)} RSD</div>,
      },
      {
        Header: t('delivery-date'),
        accessor: 'deliveryDate',
        width: 130,
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: t('delivery'),
        accessor: 'delivery',
        Cell: (props) => <div>{props.value === 'SHIPPING' ? t('home-delivery') : t('pick-up')}</div>,
      },
      {
        Header: t('notes'),
        accessor: 'notes',
        width: 280,
      },
      {
        Header: t('created-date'),
        accessor: 'createdDate',
        width: 130,
        Cell: (props) => <div>{formatDate(props.value)}</div>,
      },
      {
        Header: t('items'),
        accessor: 'items',
        width: 330,
        Cell: (props) => {
          const items = props.data[parseInt(props.row.id)]['items'];
          const fullString = items.map((item) => item.titleHun).join(', ');
          let result = '';
          items.forEach((e) => {
            if (!result.includes(e.titleHun)) result += `${e.titleHun} (${fullString.match(new RegExp(e.titleHun, 'g')).length}), `;
          });
          return (
            <details>
              <summary>
                {t('ordered-items')} ({items.length}):
              </summary>
              {result.slice(0, -2)}
            </details>
          );
        },
      },
    ],
    [t],
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
