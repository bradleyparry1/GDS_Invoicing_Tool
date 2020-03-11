//objDB library ID:
// MJMF2lqsgWV-I-dlyqJN6OrljYCrJdQKl

//updateObject,criteria
function crud(type,database,table,options){
    var db = objDB.open( getDatabaseId(database) );

    switch(type) {
        case 'create':
            const { updateObject } = options;
            objDB.insertRow( db, table, updateObject );
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



