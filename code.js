function doGet(e) {
  var template = HtmlService.createTemplateFromFile("index");

  var permissions = createPermissionsDict();

  var user = Session.getActiveUser().getEmail();

  if (user !== "bradley.parry@digital.cabinet-office.gov.uk") {
    var sheet =
      SpreadsheetApp.openById(trackingSheetId).getSheetByName("Invoicing Tool");
    sheet.appendRow([
      user.replace("@digital.cabinet-office.gov.uk", "").replace(".", " "),
      new Date(),
    ]);
  }

  template.user = user;

  if (permissions[user]) {
    return template
      .evaluate()
      .setTitle("Invoicing Tool")
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setFaviconUrl(
        "https://pbs.twimg.com/profile_images/1278310956901285888/sIOYGv2N_400x400.png"
      );
  }
}

function getData() {
  var db = open(invoicingId);

  const notifyUsage = getRows(db, "Notify Usage Data");
  const products = getRows(db, "Products");
  const departments = getRows(db, "Departments");
  const services = getRows(db, "Services");
  const pos = getRows(db, "POs");
  const invoices = getRows(db, "Invoices");
  const prepayments = getRows(db, "Prepayments");
  const contacts = getRows(db, "Contacts");

  return JSON.stringify({
    products,
    departments,
    services,
    pos,
    prepayments,
    invoices,
    contacts,
    notifyUsage,
  });
}

function createPermissionsDict() {
  var data = SpreadsheetApp.openById(invoicingId)
    .getSheetByName("Permissions")
    .getDataRange()
    .getValues();
  var titles = data[0];
  var dict = {};
  for (var i = 1; i < data.length; i++) {
    dict[data[i][0]] = {};
    for (var j = 1; j < titles.length; j++) {
      dict[data[i][0]][titles[j]] = data[i][j];
    }
  }
  return dict;
}
