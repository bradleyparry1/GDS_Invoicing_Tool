//objDB
// MJMF2lqsgWV-I-dlyqJN6OrljYCrJdQKl

function crud(type,database,table,updateObject,criteria){
    var db = objDB.open( getDatabaseId(database) );

    
}

const getDatabaseId = (database) => {
    switch(database){
        case 'hrdb':
            return hrDataStoreId;
    }
}



