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

function createInvoice(invoiceObject,usageItemUpdateObject,emailObject){
    var db = objDB.open(invoicingId);
    crud('create','invoiceTool','Invoices',{updateObject: invoiceObject, db });
    crud('massUpdate','invoiceTool','Notify Usage Data',{massUpdateObject: usageItemUpdateObject, db});
    let emailTemplate = HtmlService.createTemplateFromFile('invoice_email');

    emailTemplate.product = emailObject.product;
    emailTemplate.department = emailObject.department;
    emailTemplate.period = emailObject.period;
    emailTemplate.services = emailObject.services;
    emailTemplate.amount = emailObject.amount;
    emailTemplate.poNumber = emailObject.poNumber;
    emailTemplate.contactEmails = emailObject.contactEmails;
    emailTemplate.address = emailObject.address;

    MailApp.sendEmail({
        to: 'bradley.parry@digital.cabinet-office.gov.uk',
        subject: `Income Invoice Request: ${emailObject.department} ${emailObject.product} usage ${emailObject.period}`,
        htmlBody: emailTemplate.evaluate().getContent()
    })
}


function addNewIds(options){
    const { newDepartments, newServices, notifyUsageIds } = options;
    var ss = SpreadsheetApp.openById(invoicingId);

    if(newDepartments){
        var departmentSheet = ss.getSheetByName("Departments");
        departmentSheet.getRange(departmentSheet.getLastRow() + 1, 1, newDepartments.length, newDepartments[0].length).setValues(newDepartments);
    }

    if(newServices){
        var servicesSheet = ss.getSheetByName("Services");
        servicesSheet.getRange(servicesSheet.getLastRow() + 1, 1, newServices.length, newServices[0].length).setValues(newServices);
    }

    if(notifyUsageIds) {
        var notifyUsageSheet = ss.getSheetByName("Notify Usage Data");
        notifyUsageSheet.getRange(2, 11, notifyUsageIds.length, 1).setValues(notifyUsageIds);
    }
}
