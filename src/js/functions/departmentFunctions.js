import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import values from 'lodash/values';

function calculateDepartmentInvoiceQuantity(department){
    const services = department.services;
    return reduce(services,(total,service) => {
        total += keys(service.invoices).length;
        return total;
    },0);
}

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

function calculateDepartmentPoQuantity(department){
    const services = department.services;
    return reduce(services,(total,service) => {
        total += keys(service.pos).length;
        return total;
    },0);
}

function calculateDepartmentPoValue(department){
    const services = department.services;
    return reduce(services,(total,service) => {
        const pos = service.pos;
        total += reduce(pos,(subTotal,po) => {
            subTotal += Number(po.Amount)
            return subTotal;
        },0);
        return total;
    },0);
}

function calculateDepartmentUsageBillingTotal(department){
    const services = department.services;
    return reduce(services,(total,service) => {
        const usage = service.usage;
        total += reduce(usage,(subTotal,usageRow) => {
            subTotal += Number(usageRow.totalcost)
            return subTotal;
        },0);
        return total;
    },0);
}

function getDepartmentCharateristics(department,characteristic){
    const { services } = department;
    return reduce(services,(returnList,service) => {
        const characteristicList = values(service[characteristic]);
        returnList = returnList.concat(characteristicList);
        return returnList;
    },[])
}

export {
    calculateDepartmentInvoiceQuantity,
    calculateDepartmentInvoiceValue,
    calculateDepartmentPoQuantity,
    calculateDepartmentPoValue,
    calculateDepartmentUsageBillingTotal,
    getDepartmentCharateristics
}