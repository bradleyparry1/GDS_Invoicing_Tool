import keyBy from 'lodash/keyBy';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';

function processData(d,dict){
    let parse = JSON.parse(d);

    const products = keyBy(parse.products, 'ID');
    const departments = keyBy(parse.departments, 'ID');
    const services = keyBy(parse.services, 'ID');
    const pos = keyBy(parse.pos, 'ID');
    const invoices = keyBy(parse.invoices, 'ID');
    const contacts = keyBy(parse.contacts, 'ID');

    const createTree = () => {
        let treeObject = {};
        let departmentsGroups = groupBy(parse.departments,'ProductID');
        
        forEach(products,(value,key) => {
            
            treeObject.key = { ...value,  }
        });

        console.log(departments)
        //console.log()
    }

    createTree();

    dict.setProducts(products);
    dict.setDepartments(departments);
    dict.setServices(services);
    dict.setPos(pos);
    dict.setInvoices(invoices);
    dict.setContacts(contacts);
    dict.setLoading(false);
}



export default processData;