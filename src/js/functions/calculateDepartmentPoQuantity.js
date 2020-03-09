import reduce from 'lodash/reduce';
import keys from 'lodash/keys';

function calculateDepartmentPoQuantity(department){
    const services = department.services;
    return reduce(services,(total,service) => {
        total += keys(service.pos).length;
        return total;
    },0);
}

export default calculateDepartmentPoQuantity;