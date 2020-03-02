function doGet(e) {
    var template = HtmlService.createTemplateFromFile('index');

    var permissions = createPermissionsDict();

    var user = Session.getActiveUser().getEmail();

    if(user != "bradley.parry@digital.cabinet-office.gov.uk"){
        var sheet = SpreadsheetApp.openByUrl(trackingSheetUrl).getSheetByName("UPDATE THIS");
        sheet.appendRow([user.replace("@digital.cabinet-office.gov.uk","").replace("."," "),new Date()]);
    }

    template.user = user;

    if(permissions[user]){
        return template.evaluate()
            .setTitle('Title')
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    }
}

function getData(){
    var data = SpreadsheetApp.openByUrl(hrDataStoreUrl)
                             .getSheetByName("Data").getDataRange().getValues();
    var val = SpreadsheetApp.openByUrl(hrDataStoreUrl)
                            .getSheetByName("Validation").getDataRange().getValues();

    return JSON.stringify({"Data": data,
                            "Val": val});
}

function createPermissionsDict(){
    var data = SpreadsheetApp.openByUrl(hrDataStoreUrl)
                             .getSheetByName("Permissions").getDataRange().getValues();
    var titles = data[0];
    var dict = {};
    for(var i = 1; i < data.length; i++){
        dict[data[i][0]] = {};
        for(var j = 1; j < titles.length; j++){
        dict[data[i][0]][titles[j]] = data[i][j];
        }
    }
    return dict;
}