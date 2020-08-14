import React, { useContext } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import AppContext from '../views/AppContext';
import keys from 'lodash/keys';
import values from 'lodash/values';
import { 
  calculateDepartmentUsageBillingTotal, 
  calculateDepartmentInvoiceValue, 
  calculateDepartmentPrepaidValueUsed 
} from '../functions/departmentFunctions';
import {formatMoney} from '../functions/utilities';

function DepartmentsList() {
    const { tree, product, department } = useContext(AppContext);
    const currentDepartments = tree.value[product.value].departments;
    const currentDepartmentsList = values(currentDepartments);
    
    const viewDepartment = departmentId => department.updateFunction(departmentId);

    const columns = [{
    Header: props => <span>Departments</span>,
    accessor: 'DepartmentName',
    Cell: props => <span onClick={() => viewDepartment(props.original.ID)}>{props.value}</span> ,
    filterable: true,
    filterMethod: (filter, row) => row.DepartmentName.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1,
    className: 'word-wrap btn btn-link',
    width: 390
    }, {
    id: 'departmentServices',
    Header: 'Number of Services',
    accessor: department => keys(department.services).length,
    className: 'text-center'
    }, {
    id: 'departmentTotalBillingAmount',
    Header: 'Total Amount To Bill',
    accessor: department => calculateDepartmentUsageBillingTotal(department),
    Cell: props => <span>{formatMoney(props.value)}</span> ,
    className: 'text-center'
    }, {
    id: 'departmentTotalInvoicedAmount',
    Header: 'Total Amount Invoiced / Prepaid',
    accessor: department => calculateDepartmentInvoiceValue(department) + calculateDepartmentPrepaidValueUsed(department),
    Cell: props => <span>{formatMoney(props.value)}</span> ,
    className: 'text-center'
    }, {
    id: 'departmentTotalOutstandingAmount',
    Header: 'Total Amount Outstanding',
    accessor: department => calculateDepartmentUsageBillingTotal(department) - calculateDepartmentInvoiceValue(department) - calculateDepartmentPrepaidValueUsed(department),
    Cell: props => <span className={props.value > 0 ? 'red' : 'green'}>{formatMoney(props.value)}</span> ,
    className: 'text-center'
    }]

    return (
        <ReactTable
        data={currentDepartmentsList}
        columns={columns}
        defaultSorted={[{id: 'departmentTotalOutstandingAmount', desc: true}]}
        resizable={false}
      />
    )
}

export default DepartmentsList;