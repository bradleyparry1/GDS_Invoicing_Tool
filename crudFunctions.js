//objDB library ID:
// MJMF2lqsgWV-I-dlyqJN6OrljYCrJdQKl

//updateObject,criteria
function crud(type,database,table,options){
    var db = options.db ? options.db : objDB.open( getDatabaseId(database) );
    const { updateObject, criteriaObject, massUpdateObject } = options;

    switch(type) {
        case 'create':
            objDB.insertRow( db, table, updateObject );
            return;
        case 'update':
            objDB.updateRow( db, table, updateObject, criteriaObject );
            return;
        case 'delete':
            objDB.deleteRow( db, table, criteriaObject );
            return;
        case 'massUpdate':
            for(var update in massUpdateObject){
                objDB.updateRow( db, table, massUpdateObject[update].update, massUpdateObject[update].criteria );
            }
            return;
        default:
            var rows = objDB.getRows( db, table);
            return JSON.stringify(rows);
    }
}

const getDatabaseId = (database) => {
    switch(database){
        default:
            return invoicingId;
    }
}


function createInvoice(invoiceObject,usageItemUpdateObject,invoiceContact){
    var db = objDB.open(invoicingId);
    crud('create','invoiceTool','Invoices',{updateObject: invoiceObject, db });
    crud('massUpdate','invoiceTool','Notify Usage Data',{massUpdateObject: usageItemUpdateObject, db});
}
