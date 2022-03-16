import keyBy from "lodash/keyBy";
import groupBy from "lodash/groupBy";
import forEach from "lodash/forEach";
import reduce from "lodash/reduce";

const createTree = (
  departments,
  services,
  prepayments,
  invoices,
  contacts,
  pos,
  products,
  notifyUsage,
  fy
) => {
  let treeObject = {};
  const filteredNotifyUsage = notifyUsage.filter((usageItem) => {
    return usageItem.Fy === fy;
  });

  let departmentsGroups = groupBy(departments, "ProductID");
  let servicesGroups = groupBy(services, "DepartmentID");
  let prepaymentsGroups = groupBy(prepayments, "DepartmentID");
  let invoicesGroups = groupBy(invoices, "DepartmentID");
  let contactsGroups = groupBy(contacts, "DepartmentID");
  let posGroups = groupBy(pos, "DepartmentID");

  let notifyUsageGroups = groupBy(filteredNotifyUsage, "service_id");
  let notifyUsagePrepaymentGroups = groupBy(
    filteredNotifyUsage,
    "PrepaymentID"
  );

  forEach(products, (productObject, productId) => {
    let productDepartments = keyBy(departmentsGroups[productId], "ID");
    treeObject[productId] = {
      ...productObject,
      departments: productDepartments,
    };

    forEach(productDepartments, (departmentObject, departmentId) => {
      let departmentServices = keyBy(servicesGroups[departmentId], "ID");
      let departmentInvoices = keyBy(invoicesGroups[departmentId], "ID");
      let departmentPrepayments = keyBy(prepaymentsGroups[departmentId], "ID");
      let departmentContacts = keyBy(contactsGroups[departmentId], "ID");
      let departmentPos = keyBy(posGroups[departmentId], "ID");

      treeObject[productId].departments[departmentId] = {
        ...departmentObject,
        services: departmentServices,
        prepayments: departmentPrepayments,
        invoices: departmentInvoices,
        contacts: departmentContacts,
        pos: departmentPos,
      };

      forEach(departmentServices, (serviceObject, serviceId) => {
        //let servicePos = keyBy(posGroups[serviceId], 'ID');
        let serviceUsage = keyBy(notifyUsageGroups[serviceId], "ID");

        treeObject[productId].departments[departmentId].services[serviceId] = {
          ...serviceObject,
          usage: serviceUsage,
        };
      });

      forEach(departmentPrepayments, (prepaymentObject, prepaymentId) => {
        //let servicePos = keyBy(posGroups[serviceId], 'ID');
        let prepaymentUsage = keyBy(
          notifyUsagePrepaymentGroups[prepaymentId],
          "ID"
        );

        let prepaymentUsed = reduce(
          prepaymentUsage,
          (total, usageItem) => (total += usageItem.PrepaymentAmount),
          0
        );
        let prepaymentRemaining = prepaymentObject.Amount - prepaymentUsed;

        treeObject[productId].departments[departmentId].prepayments[
          prepaymentId
        ] = {
          ...prepaymentObject,
          usage: prepaymentUsage,
          Remaining: prepaymentRemaining,
        };
      });
    });
  });
  return treeObject;
};

export default createTree;
