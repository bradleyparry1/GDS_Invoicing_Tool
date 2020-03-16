import React from 'react';
import Scorecard from './Scorecard';
import { calculateDepartmentUsageBillingTotal } from '../functions/departmentFunctions';
import formatMoney from '../functions/utilities';

function UsageSection(props) {
    const { department } = props;
    
    const billingAmount = calculateDepartmentUsageBillingTotal(department);

    return (
        <Scorecard 
            variant={'dark'}
            title={"Total Amount To Bill"}
            value={formatMoney(billingAmount)}
        />
    )
}

export default UsageSection;