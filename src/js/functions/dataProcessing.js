import keyBy from 'lodash/keyBy';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';

function processData(d,dict){
    let parse = JSON.parse(d);
    
    //const notifyUsage = keyBy(parse.notifyUsage, 'ID');
    const products = keyBy(parse.products, 'ID');
    const departments = keyBy(parse.departments, 'ID');
    const services = keyBy(parse.services, 'ID');
    const pos = keyBy(parse.pos, 'ID');
    const invoices = keyBy(parse.invoices, 'ID');
    const contacts = keyBy(parse.contacts, 'ID');

    const createTree = () => {
        let treeObject = {};

        let departmentsGroups = groupBy(parse.departments,'ProductID');
        let servicesGroups = groupBy(parse.services,'DepartmentID');
        let posGroups = groupBy(parse.pos,'ServiceIDs');
        let invoicesGroups = groupBy(parse.invoices,'ServiceIDs');
        let contactsGroups = groupBy(parse.contacts,'ServiceID');

        let notifyUsageGroups = groupBy(parse.notifyUsage,'service_id');
        
        forEach(products,(productObject,productId) => {

            let productDepartments = keyBy(departmentsGroups[productId], 'ID');
            treeObject[productId] = 
            { 
                ...productObject, 
                departments: productDepartments 
            }

            forEach(productDepartments,(departmentObject,departmentId) => {
                let departmentServices = keyBy(servicesGroups[departmentId], 'ID');
                treeObject[productId].departments[departmentId] = 
                { 
                    ...departmentObject, 
                    services: departmentServices 
                }

                forEach(departmentServices,(serviceObject, serviceId) => {
                    let servicePos = keyBy(posGroups[serviceId], 'ID');
                    let serviceInvoices = keyBy(invoicesGroups[serviceId], 'ID');
                    let serviceContacts = keyBy(contactsGroups[serviceId], 'ID');
                    let serviceUsage = keyBy(notifyUsageGroups[serviceId], 'ID');
                    
                    treeObject[productId].departments[departmentId].services[serviceId] = 
                    { 
                        ...serviceObject, 
                        pos: servicePos, 
                        usage: serviceUsage,
                        invoices: serviceInvoices,
                        contacts: serviceContacts
                    }
                });
            });
        });
        return treeObject;
    }

    dict.setTree(createTree());
    dict.setProduct(keys(products)[0]);
    dict.setProducts(products);
    dict.setDepartments(departments);
    dict.setServices(services);
    dict.setPos(pos);
    dict.setInvoices(invoices);
    dict.setContacts(contacts);
    dict.setLoading(false);
}

export default processData;