import reduce from 'lodash/reduce';
import { 
    calculateDepartmentInvoiceValue, 
    calculateDepartmentUsageBillingTotal,
    calculateDepartmentPrepaidValue,
    calculateDepartmentPrepaidValueUsed
} from './departmentFunctions';


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

const calculateProductTotalAmountPrepaid = (product) => {
    let departments = product.departments;
    return reduce(departments,(total,department) => {
        total += calculateDepartmentPrepaidValue(department);
        return total;
    },0)
}

const calculateProductTotalAmountPrepaidUsed = (product) => {
    let departments = product.departments;
    return reduce(departments,(total,department) => {
        total += calculateDepartmentPrepaidValueUsed(department);
        return total;
    },0)
}



export {
    calculateProductTotalAmountInvoiced,
    calculateProductTotalBillingAmount,
    calculateProductTotalAmountPrepaid,
    calculateProductTotalAmountPrepaidUsed
}