import reduce from 'lodash/reduce';

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

export default calculateDepartmentUsageBillingTotal;