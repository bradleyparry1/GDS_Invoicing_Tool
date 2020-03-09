import reduce from 'lodash/reduce';
import keys from 'lodash/keys';

function calculateDepartmentInvoiceQuantity(department){
    const services = department.services;
    return reduce(services,(total,service) => {
        total += keys(service.invoices).length;
        return total;
    },0);
}

export default calculateDepartmentInvoiceQuantity;