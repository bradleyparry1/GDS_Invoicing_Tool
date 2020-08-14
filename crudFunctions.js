//objDB library ID:
// MJMF2lqsgWV-I-dlyqJN6OrljYCrJdQKl

//updateObject,criteria
function crud(type,database,table,options){
    var db = options.db ? options.db : open( getDatabaseId(database) );
    const { updateObject, criteriaObject, massUpdateObject } = options;

    switch(type) {
        case 'create':
            insertRow( db, table, updateObject );
            return;
        case 'update':
            updateRow( db, table, updateObject, criteriaObject );
            return;
        case 'delete':
            deleteRow( db, table, criteriaObject );
            return;
        case 'massUpdate':
            for(var update in massUpdateObject){
                updateRow( db, table, massUpdateObject[update].update, massUpdateObject[update].criteria );
            }
            return;
        default:
            var rows = getRows( db, table);
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
    var db = open(invoicingId);
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
    emailTemplate.textDescription = emailObject.textDescription;

    emailTemplate.location = emailObject.location;
    emailTemplate.customerNumber = emailObject.customerNumber;
    
    let recipient = Session.getActiveUser().getEmail();

    MailApp.sendEmail({
        to: recipient,
        subject: `Income Invoice Request: ${emailObject.department} ${emailObject.product} usage ${emailObject.period}`,
        htmlBody: emailTemplate.evaluate().getContent()
    })
}

function addToBulk(invoiceObject,usageItemUpdateObject,newRows){
    var db = open(invoicingId);
    crud('create','invoiceTool','Invoices',{updateObject: invoiceObject, db });
    crud('massUpdate','invoiceTool','Notify Usage Data',{massUpdateObject: usageItemUpdateObject, db});
    var exportSheet = SpreadsheetApp.openById(notifyBulk).getSheetByName("Tool Export");
    exportSheet.getRange(exportSheet.getLastRow() + 1, 1,newRows.length,newRows[0].length).setValues(newRows);
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
        notifyUsageSheet.getRange(2, 13, notifyUsageIds.length, 1).setValues(notifyUsageIds);
    }
}
