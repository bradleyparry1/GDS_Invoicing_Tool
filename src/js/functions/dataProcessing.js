import keyBy from "lodash/keyBy";
import keys from "lodash/keys";
import addAllIds from "./addIds";
import createTree from "./createTree";
import { getMonth, getYear, getFy } from "./utilities";

function processData(d, dict) {
  let parse = JSON.parse(d);

  const existingDepartments = keyBy(parse.departments, "ID");
  const existingServices = keyBy(parse.services, "ID");

  let { departments, services, notifyUsage } = addAllIds(parse, {
    existingDepartments,
    existingServices,
  });

  const products = keyBy(parse.products, "ID");
  const pos = keyBy(parse.pos, "ID");
  const prepayments = keyBy(parse.prepayments, "ID");
  const invoices = keyBy(parse.invoices, "ID");
  const contacts = keyBy(parse.contacts, "ID");

  const newFys = [];

  notifyUsage = notifyUsage.map((usageItem) => {
    usageItem.Period = `${getMonth(usageItem.StartDate)} ${getYear(
      usageItem.StartDate
    )}`;
    const fy = `${getFy(usageItem.StartDate)}`;
    if (!newFys.includes(fy)) newFys.push(fy);
    usageItem.Fy = fy;
    return usageItem;
  });

  // parse.invoices = parse.invoices.map((invoice) => {
  //   invoice.Fy =
  //   return invoice;
  // });

  const newFy = newFys[0];

  const newTree = createTree(
    parse.departments,
    parse.services,
    parse.prepayments,
    parse.invoices,
    parse.contacts,
    parse.pos,
    products,
    notifyUsage,
    newFy
  );

  dict.setNotifyUsage(notifyUsage);
  dict.setTree(newTree);
  dict.setProduct(keys(products)[0]);
  dict.setProducts(products);
  dict.setFy(newFy);
  dict.setFys(newFys);
  dict.setDepartments(departments);
  dict.setServices(services);
  dict.setPos(pos);
  dict.setPrepayments(prepayments);
  dict.setInvoices(invoices);
  dict.setContacts(contacts);
  dict.setLoading(false);
}

export default processData;
