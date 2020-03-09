import reduce from 'lodash/reduce';

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

export default calculateDepartmentPoValue;