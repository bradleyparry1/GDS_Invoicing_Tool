//objDB library ID:
// MJMF2lqsgWV-I-dlyqJN6OrljYCrJdQKl

function crud(type,database,table,updateObject,criteria){
    var db = objDB.open( getDatabaseId(database) );

    switch(type) {
        case 'get':
            var rows = objDB.getRows( db, table);
            return JSON.stringify(rows);
    }
}

const getDatabaseId = (database) => {
    switch(database){
        case 'invoiceTool':
            return invoicingId;
    }
}



