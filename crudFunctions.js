//objDB library ID:
// MJMF2lqsgWV-I-dlyqJN6OrljYCrJdQKl

//updateObject,criteria
function crud(type,database,table,options){
    var db = options.db ? options.db : objDB.open( getDatabaseId(database) );

    switch(type) {
        case 'create':
            const { updateObject } = options;
            objDB.insertRow( db, table, updateObject );
            return;
        case 'massUpdate':
            const { massUpdateObject } = options;
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
