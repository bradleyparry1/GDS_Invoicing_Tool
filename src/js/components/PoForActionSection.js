import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ForActionsItemsList from "./ForActionItemsList";
import ForActionToolbar from "./ForActionToolbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import reduce from "lodash/reduce";
import map from "lodash/map";
import keys from "lodash/keys";
import groupBy from "lodash/groupBy";
import {
  formatMoney,
  addMonthToDate,
  createPeriodString,
} from "../functions/utilities";

function PoForActionSection(props) {
  let { product, department, tree, contacts, pos, usage } = props;

  const contactIds = keys(contacts);
  const poIds = keys(pos);

  const [invoiceUsageItems, setInvoiceUsageItems] = useState({});
  const [invoicePeriod, setInvoicePeriod] = useState([]);
  const [invoiceServiceIds, setInvoiceServiceIds] = useState([]);
  const [invoiceServiceNames, setInvoiceServiceNames] = useState([]);
  const [invoiceContact, setInvoiceContact] = useState(
    contactIds[0] ? contactIds[0] : ""
  );
  const [invoicePo, setInvoicePo] = useState(poIds[0] ? poIds[0] : "GPC");
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    updateInvoiceAmount();
    updateInvoicePeriod();
    updateInvoiceServiceIds();
    updateInvoiceServiceNames();
  }, [invoiceUsageItems]);

  useEffect(() => {
    if (!invoiceContact && contactIds[0]) {
      setInvoiceContact(contactIds[0]);
    }
  }, [contactIds]);

  useEffect(() => {
    if (poIds[0]) {
      setInvoicePo(poIds[0]);
    }
  }, [poIds]);

  const updatePrepayment = (usageItem) => {
    const newTree = { ...tree.value };
    usageItem.PrepaymentAmount = usageItem.potentialPrepaymentAmount;
    newTree[product.value].departments[department.ID].prepayments[
      usageItem.PrepaymentID
    ].usage[usageItem.ID] = usageItem;
    newTree[product.value].departments[department.ID].prepayments[
      usageItem.PrepaymentID
    ].Remaining -= usageItem.potentialPrepaymentAmount;
    tree.updateFunction(newTree);
  };

  const updateInvoiceItems = (e, usageItem) => {
    let newInvoiceUsageItems = { ...invoiceUsageItems };
    if (e.target.checked) {
      newInvoiceUsageItems[usageItem.ID] = usageItem;
    } else {
      delete newInvoiceUsageItems[usageItem.ID];
    }
    setInvoiceUsageItems(newInvoiceUsageItems);
  };

  const updateInvoiceAmount = () => {
    const newInvoiceAmount = reduce(
      invoiceUsageItems,
      (total, usageItem) => {
        total += usageItem.displayInvoiceAmount;
        return total;
      },
      0
    );
    setInvoiceAmount(newInvoiceAmount);
  };

  const updateInvoicePeriod = () => {
    const [startDate, endDate] = reduce(
      invoiceUsageItems,
      (startEndArray, invoiceUsageItem) => {
        let [currentStartDate, currentEndDate] = startEndArray;
        currentStartDate =
          !currentStartDate || invoiceUsageItem.StartDate < currentStartDate
            ? invoiceUsageItem.StartDate
            : currentStartDate;
        currentEndDate =
          !currentEndDate || invoiceUsageItem.StartDate > currentEndDate
            ? invoiceUsageItem.StartDate
            : currentEndDate;
        return [currentStartDate, currentEndDate];
      },
      [null, null]
    );
    let newPeriodArray = [];

    if (startDate && endDate) {
      const allDatesInRange = [startDate];
      let currentDate = new Date(startDate.getTime());

      while (currentDate.getTime() < endDate.getTime()) {
        currentDate = addMonthToDate(currentDate, 1);
        const copyOfDate = new Date(currentDate.getTime());
        allDatesInRange.push(copyOfDate);
      }
      newPeriodArray = createPeriodString(allDatesInRange);
    }

    // const newPeriodArray = reduce(
    //   invoiceUsageItems,
    //   (periodArray, usageItem) => {
    //     !periodArray.includes(usageItem.Period) &&
    //       periodArray.push(usageItem.Period);
    //     return periodArray;
    //   },
    //   []
    // );

    setInvoicePeriod(newPeriodArray);
  };

  const updateInvoiceServiceIds = () => {
    const newServiceIdsArray = reduce(
      invoiceUsageItems,
      (serviceIdArray, usageItem) => {
        !serviceIdArray.includes(usageItem.service_id) &&
          serviceIdArray.push(usageItem.service_id);
        return serviceIdArray;
      },
      []
    );
    setInvoiceServiceIds(newServiceIdsArray);
  };

  const updateInvoiceServiceNames = () => {
    const newServiceNamesArray = reduce(
      invoiceUsageItems,
      (serviceNamesArray, usageItem) => {
        !serviceNamesArray.includes(usageItem.service_name) &&
          serviceNamesArray.push(usageItem.service_name);
        return serviceNamesArray;
      },
      []
    );
    setInvoiceServiceNames(newServiceNamesArray);
  };

  const createInvoiceEmail = () => {
    setSubmitting(true);
    const newId = uuidv4();
    const newInvoice = {
      ID: newId,
      DepartmentID: department.ID,
      ServiceIDs: JSON.stringify(invoiceServiceIds),
      POID: invoicePo,
      ContactID: invoiceContact,
      InvoiceNumber: "",
      Amount: invoiceAmount,
      Periods: JSON.stringify(invoicePeriod),
      CreatedAt: new Date().toLocaleString().replace(",", ""),
    };

    const usageItemText = map(invoiceUsageItems, (usageItem) => {
      return usageItem.letter_breakdown
        ? `${usageItem.letter_breakdown} - ${usageItem.Period}`
        : `${usageItem.sms_fragments} SMS - ${usageItem.Period}`;
    }).join("\n");

    const emailObject = {
      product: tree.value[product.value].ProductName,
      department: department.DepartmentName,
      location: department.Location,
      customerNumber: department.CustomerNumber,
      period: invoicePeriod.join(", "),
      amount: formatMoney(invoiceAmount),
      contactEmails: contacts[invoiceContact].Email,
      address: contacts[invoiceContact].Address,
      poNumber: pos[invoicePo] ? pos[invoicePo].PONumber : invoicePo,
      services: invoiceServiceNames.join(", "),
      textDescription: usageItemText,
    };

    const usageItemUpdateObject = reduce(
      invoiceUsageItems,
      (returnObject, invoiceUsageItem) => {
        returnObject[invoiceUsageItem.ID] = {
          update: {
            InvoiceID: newId,
            InvoiceAmount: invoiceUsageItem.displayInvoiceAmount,
          },
          criteria: { ID: invoiceUsageItem.ID },
        };
        return returnObject;
      },
      {}
    );

    google.script.run
      .withSuccessHandler(() => {
        const newTree = { ...tree.value };
        newInvoice.CreatedAt = new Date();
        newTree[product.value].departments[department.ID].invoices[newId] =
          newInvoice;

        map(
          newTree[product.value].departments[department.ID].services,
          (service) => {
            map(service.usage, (usageItem) => {
              if (keys(invoiceUsageItems).includes(usageItem.ID.toString())) {
                newTree[product.value].departments[department.ID].services[
                  service.ID
                ].usage[usageItem.ID].InvoiceID = newId;
                newTree[product.value].departments[department.ID].services[
                  service.ID
                ].usage[usageItem.ID].InvoiceAmount =
                  newTree[product.value].departments[department.ID].services[
                    service.ID
                  ].usage[usageItem.ID].displayInvoiceAmount;
              }
            });
          }
        );
        tree.updateFunction(newTree);
        setInvoiceUsageItems({});
        setSubmitting(false);
      })
      .withFailureHandler((msg) => {
        alert(msg);
        setSubmitting(false);
      })
      .createInvoice(newInvoice, usageItemUpdateObject, emailObject);
  };

  const createInvoiceBulk = () => {
    setSubmitting(true);
    const newId = uuidv4();

    const newInvoice = {
      ID: newId,
      DepartmentID: department.ID,
      ServiceIDs: JSON.stringify(invoiceServiceIds),
      POID: invoicePo,
      ContactID: invoiceContact,
      InvoiceNumber: "",
      Amount: invoiceAmount,
      Periods: JSON.stringify(invoicePeriod),
      CreatedAt: new Date().toLocaleString().replace(",", ""),
    };

    const bulkObject = {
      product: tree.value[product.value].ProductName,
      department: department.DepartmentName,
      customerNumber: department.CustomerNumber,
      location: department.Location,
      period: invoicePeriod.join(", "),
      amount: formatMoney(invoiceAmount),
      contactEmails: contacts[invoiceContact].Email,
      //address: contacts[invoiceContact].Address,
      poNumber: pos[invoicePo] ? pos[invoicePo].PONumber : invoicePo,
      services: invoiceServiceNames.join(", "),
    };

    const usageItemUpdateObject = reduce(
      invoiceUsageItems,
      (returnObject, invoiceUsageItem) => {
        returnObject[invoiceUsageItem.ID] = {
          update: {
            InvoiceID: newId,
            InvoiceAmount: invoiceUsageItem.displayInvoiceAmount,
          },
          criteria: { ID: invoiceUsageItem.ID },
        };
        return returnObject;
      },
      {}
    );

    const usageItemsGroupedByService = groupBy(
      invoiceUsageItems,
      "service_name"
    );
    let index = -1;
    var newRows = map(usageItemsGroupedByService, (usageItems, serviceName) => {
      index++;
      return createBulkInvoiceRow(bulkObject, usageItems, serviceName, index);
    });

    google.script.run
      .withSuccessHandler(() => {
        const newTree = { ...tree.value };
        newInvoice.CreatedAt = new Date();
        newTree[product.value].departments[department.ID].invoices[newId] =
          newInvoice;

        map(
          newTree[product.value].departments[department.ID].services,
          (service) => {
            map(service.usage, (usageItem) => {
              if (keys(invoiceUsageItems).includes(usageItem.ID.toString())) {
                newTree[product.value].departments[department.ID].services[
                  service.ID
                ].usage[usageItem.ID].InvoiceID = newId;
                newTree[product.value].departments[department.ID].services[
                  service.ID
                ].usage[usageItem.ID].InvoiceAmount =
                  newTree[product.value].departments[department.ID].services[
                    service.ID
                  ].usage[usageItem.ID].displayInvoiceAmount;
              }
            });
          }
        );
        tree.updateFunction(newTree);
        setInvoiceUsageItems({});
        setSubmitting(false);
      })
      .withFailureHandler((msg) => {
        alert(msg);
        setSubmitting(false);
      })
      .addToBulk(newInvoice, usageItemUpdateObject, newRows);
  };

  const createBulkInvoiceRow = (bulkObject, usageItems, serviceName, index) => {
    const usageItemObject = reduce(
      usageItems,
      (object, usageItem) => {
        const usageItemStart = new Date(usageItem.StartDate);
        const usageItemEnd = new Date(usageItem.EndDate);
        object.usageItemText.push(
          usageItem.letter_breakdown
            ? `${usageItem.letter_breakdown} - ${usageItem.Period}`
            : `${usageItem.sms_fragments} SMS - ${usageItem.Period}`
        );
        object.startDate =
          !object.startDate || usageItemStart < object.startDate
            ? usageItemStart
            : object.startDate;
        object.endDate =
          !object.endDate || usageItemEnd > object.endDate
            ? usageItemEnd
            : object.endDate;
        object.amount += usageItem.totalcost;
        return object;
      },
      {
        amount: 0,
        usageItemText: [serviceName],
        startDate: null,
        endDate: null,
      }
    );

    const usageItemText = usageItemObject.usageItemText.join("\n");

    console.log(usageItemObject);

    return [
      bulkObject.customerNumber, //"Customer Number",
      bulkObject.department, //"Customer Name"
      "No", //"Public Body?"
      bulkObject.location, //"Customer bill to location"
      bulkObject.contactEmails, //"Customer Contact Name"
      "", //"Customer Telephone number"
      bulkObject.poNumber, //Customer PO Number
      "", //Internal Comments
      "GOV.UK Notify costs - visit your Notify account for a more detailed breakdown (www.gov.uk/notify)", //Invoice Narration
      "", //Cost Centre/Salesperson
      "CAB001", //Memo Line Number
      usageItemText, //Additional Line Description
      usageItemObject.amount, //Unit Price
      "1", //Quantity
      "UK STD", //VAT Type
      "0370..4481102800.0000000.00000000.0000.0000000", //Distributions"
    ];

    // return [
    //   "",
    //   bulkObject.customerNumber,
    //   bulkObject.department,
    //   bulkObject.location,
    //   bulkObject.department,
    //   "",
    //   bulkObject.contactEmails,
    //   "Accounts Payable",
    //   bulkObject.poNumber,
    //   `${bulkObject.product} costs - ${bulkObject.period} - Visit your Notify account for a more detailed breakdown (www.gov.uk/notify)`,
    //   usageItemText,
    //   usageItemText,
    //   index + 1,
    //   "CAB01501",
    //   "10370197",
    //   "4482500004 INC - SALES OF OTHER GOODS AND SERVICES - INCOME FROM OGD'S",
    //   "4482500004",
    //   usageItemObject.startDate.toLocaleString().replace(",", ""),
    //   usageItemObject.endDate.toLocaleString().replace(",", ""),
    //   "",
    //   "",
    //   "",
    //   usageItemObject.amount,
    //   "20%",
    //   usageItemObject.amount * 1.2,
    //   "COF Programme Income",
    //   "YES",
    // ];
  };

  const getSectionTitle = (pos) => {
    const poList = keys(groupBy(pos, "PONumber"));
    return poList.length > 0
      ? "POs: " + poList.join(", ")
      : "No POs assigned to these services";
  };

  return (
    <>
      {usage.length > 0 ? (
        <>
          <Row className={"for-action-group-top mb-3"}>
            <Col>
              <h5>{getSectionTitle(pos)}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <ForActionsItemsList
                usage={usage}
                updateInvoice={updateInvoiceItems}
                submitting={submitting}
                updatePrepayment={updatePrepayment}
              />
            </Col>
          </Row>
          <ForActionToolbar
            contacts={contacts}
            setInvoiceContact={setInvoiceContact}
            pos={pos}
            invoicePo={invoicePo}
            setInvoicePo={setInvoicePo}
            invoiceAmount={invoiceAmount}
            createInvoiceEmail={createInvoiceEmail}
            createInvoiceBulk={createInvoiceBulk}
            invoicePeriod={invoicePeriod}
            submitting={submitting}
            invoiceUsageItemKeys={keys(invoiceUsageItems)}
            invoiceContact={invoiceContact}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default PoForActionSection;
