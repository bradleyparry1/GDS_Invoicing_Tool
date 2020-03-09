import reduce from 'lodash/reduce';

function calculateDepartmentInvoiceValue(department){
    
    const services = department.services;
    
    return reduce(services,(total,service) => {
        const invoices = service.invoices;
        total += reduce(invoices,(subTotal,invoice) => {
            subTotal += Number(invoice.Amount)
            return subTotal;
        },0);
        return total;
    },0);
}

export default calculateDepartmentInvoiceValue;