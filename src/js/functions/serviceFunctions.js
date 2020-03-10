import reduce from 'lodash/reduce';

function calculateServiceUsageBillingTotal(service){
    const usage = service.usage;
    return reduce(usage,(total,usageRow) => {
        total += Number(usageRow.totalcost);
        return total;
    },0);
}

export {
    calculateServiceUsageBillingTotal
}