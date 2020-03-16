import reduce from 'lodash/reduce';
import { calculateDepartmentInvoiceValue, calculateDepartmentUsageBillingTotal } from './departmentFunctions';


const calculateProductTotalAmountInvoiced = (product) => {
    let departments = product.departments;
    return reduce(departments,(total,department) => {
        total += calculateDepartmentInvoiceValue(department);
        return total;
    },0)
}

const calculateProductTotalBillingAmount = (product) => {
    let departments = product.departments;
    return reduce(departments,(total,department) => {
        total += calculateDepartmentUsageBillingTotal(department);
        return total;
    },0)
}

export {
    calculateProductTotalAmountInvoiced,
    calculateProductTotalBillingAmount
}