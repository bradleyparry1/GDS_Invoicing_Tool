import keyBy from 'lodash/keyBy';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import addAllIds from './addIds';

function processData(d,dict){
    let parse = JSON.parse(d);

    const existingDepartments = keyBy(parse.departments, 'ID');
    const existingServices = keyBy(parse.services, 'ID');

    const { departments, services, notifyUsage } = addAllIds( parse, { existingDepartments, existingServices });

    const products = keyBy(parse.products, 'ID');
    const pos = keyBy(parse.pos, 'ID');
    const prepayments = keyBy(parse.prepayments, 'ID');
    const invoices = keyBy(parse.invoices, 'ID');
    const contacts = keyBy(parse.contacts, 'ID');

    const createTree = () => {
        let treeObject = {};

        let departmentsGroups = groupBy(parse.departments,'ProductID');
        let servicesGroups = groupBy(parse.services,'DepartmentID');
        let prepaymentsGroups = groupBy(parse.prepayments,'DepartmentID');
        let invoicesGroups = groupBy(parse.invoices,'DepartmentID');
        let contactsGroups = groupBy(parse.contacts,'DepartmentID');
        let posGroups = groupBy(parse.pos,'DepartmentID');
        
        let notifyUsageGroups = groupBy(notifyUsage,'service_id');
        let notifyUsagePrepaymentGroups = groupBy(notifyUsage,'PrepaymentID');
        
        forEach(products,(productObject,productId) => {

            let productDepartments = keyBy(departmentsGroups[productId], 'ID');
            treeObject[productId] = 
            { 
                ...productObject, 
                departments: productDepartments 
            }

            forEach(productDepartments,(departmentObject,departmentId) => {
                let departmentServices = keyBy(servicesGroups[departmentId], 'ID');
                let departmentInvoices = keyBy(invoicesGroups[departmentId], 'ID');
                let departmentPrepayments = keyBy(prepaymentsGroups[departmentId], 'ID');
                let departmentContacts = keyBy(contactsGroups[departmentId], 'ID');
                let departmentPos = keyBy(posGroups[departmentId], 'ID');
                
                treeObject[productId].departments[departmentId] = 
                { 
                    ...departmentObject, 
                    services: departmentServices,
                    prepayments: departmentPrepayments,
                    invoices: departmentInvoices,
                    contacts: departmentContacts,
                    pos: departmentPos
                }

                forEach(departmentServices,(serviceObject, serviceId) => {
                    //let servicePos = keyBy(posGroups[serviceId], 'ID');
                    let serviceUsage = keyBy(notifyUsageGroups[serviceId], 'ID');
                    
                    treeObject[productId].departments[departmentId].services[serviceId] = 
                    { 
                        ...serviceObject, 
                        usage: serviceUsage,
                    }
                });

                forEach(departmentPrepayments,(prepaymentObject, prepaymentId) => {
                    //let servicePos = keyBy(posGroups[serviceId], 'ID');
                    let prepaymentUsage = keyBy(notifyUsagePrepaymentGroups[prepaymentId], 'ID');
                    
                    let prepaymentUsed = reduce(prepaymentUsage,(total,usageItem) => total += usageItem.PrepaymentAmount,0);
                    let prepaymentRemaining = prepaymentObject.Amount - prepaymentUsed;

                    treeObject[productId].departments[departmentId].prepayments[prepaymentId] = 
                    { 
                        ...prepaymentObject, 
                        usage: prepaymentUsage,
                        Remaining: prepaymentRemaining
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
    dict.setPrepayments(prepayments);
    dict.setInvoices(invoices);
    dict.setContacts(contacts);
    dict.setLoading(false);
}

export default processData;