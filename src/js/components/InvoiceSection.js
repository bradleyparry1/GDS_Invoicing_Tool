import React from 'react';
import Scorecard from './Scorecard';
import { calculateDepartmentInvoiceValue } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function InvoiceSection(props) {
    const { department } = props;
    const invoiceAmount = calculateDepartmentInvoiceValue(department);

    return (
        <Scorecard 
            variant={'success'}
            title={"Total Amount Invoiced"}
            value={formatMoney(invoiceAmount)}
        />
    )
}

export default InvoiceSection;