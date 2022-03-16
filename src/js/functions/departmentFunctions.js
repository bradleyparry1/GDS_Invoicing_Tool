import reduce from "lodash/reduce";
import keys from "lodash/keys";
import values from "lodash/values";

function calculateDepartmentInvoiceQuantity(department) {
  return keys(department.invoices).length;
}

function calculateDepartmentInvoiceValue(department) {
  const { services } = department;

  return reduce(
    services,
    (total, service) => {
      const { usage } = service;
      total += reduce(
        usage,
        (usageItemTotal, usageItem) => {
          console.log(usageItem.InvoiceID);
          usageItemTotal += usageItem.InvoiceID ? usageItem.InvoiceAmount : 0;
          return usageItemTotal;
        },
        0
      );
      return total;
    },
    0
  );

  // const invoices = department.invoices;
  // return reduce(
  //   invoices,
  //   (total, invoice) => {
  //     total += Number(invoice.Amount);
  //     return total;
  //   },
  //   0
  // );
}

function calculateDepartmentIncomeGenerated(department) {
  const invoices = department.invoices;
  return reduce(
    invoices,
    (total, invoice) => {
      total += invoice.InvoiceNumber ? Number(invoice.Amount) : 0;
      return total;
    },
    0
  );
}

function calculateDepartmentPrepaidValue(department) {
  const prepayments = department.prepayments;
  return reduce(
    prepayments,
    (total, prepayment) => {
      total += Number(prepayment.Amount);
      return total;
    },
    0
  );
}

function calculateDepartmentPrepaidValueUsed(department) {
  const prepayments = department.prepayments;
  return reduce(
    prepayments,
    (total, prepayment) => {
      total += Number(prepayment.Amount - prepayment.Remaining);
      return total;
    },
    0
  );
}

function calculateDepartmentPoQuantity(department) {
  const services = department.services;
  return reduce(
    services,
    (total, service) => {
      total += keys(service.pos).length;
      return total;
    },
    0
  );
}

function calculateDepartmentPoValue(department) {
  const services = department.services;
  return reduce(
    services,
    (total, service) => {
      const pos = service.pos;
      total += reduce(
        pos,
        (subTotal, po) => {
          subTotal += Number(po.Amount);
          return subTotal;
        },
        0
      );
      return total;
    },
    0
  );
}

function calculateDepartmentUsageBillingTotal(department) {
  const services = department.services;
  return reduce(
    services,
    (total, service) => {
      const usage = service.usage;
      total += reduce(
        usage,
        (subTotal, usageRow) => {
          subTotal += Number(usageRow.totalcost);
          return subTotal;
        },
        0
      );
      return total;
    },
    0
  );
}

function getDepartmentCharateristics(department, characteristic) {
  const { services } = department;
  return reduce(
    services,
    (returnList, service) => {
      const characteristicList = values(service[characteristic]);
      returnList = returnList.concat(characteristicList);
      return returnList;
    },
    []
  );
}

export {
  calculateDepartmentInvoiceQuantity,
  calculateDepartmentIncomeGenerated,
  calculateDepartmentInvoiceValue,
  calculateDepartmentPoQuantity,
  calculateDepartmentPoValue,
  calculateDepartmentUsageBillingTotal,
  getDepartmentCharateristics,
  calculateDepartmentPrepaidValue,
  calculateDepartmentPrepaidValueUsed,
};
