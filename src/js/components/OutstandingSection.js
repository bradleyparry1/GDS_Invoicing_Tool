import React from 'react';
import Scorecard from './Scorecard';
import { 
    calculateDepartmentUsageBillingTotal,
    calculateDepartmentInvoiceValue
 } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function OutstandingSection(props) {
    const { department } = props;
    
    const billingAmount = calculateDepartmentUsageBillingTotal(department);
    const invoiceAmount = calculateDepartmentInvoiceValue(department);
    const outstanding = billingAmount - invoiceAmount;

    return (
        <Scorecard 
            variant={outstanding === 0 ? 'success' : 'danger'}
            title={"Outstanding Amount"}
            value={formatMoney(outstanding)}
        />
    )
}

export default OutstandingSection;