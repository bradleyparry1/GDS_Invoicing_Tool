import map from "lodash/map";
import { v4 as uuidv4 } from "uuid";

function addAllIds(parse, existing) {
  let { notifyUsage } = parse;
  let { existingServices, existingDepartments } = existing;

  const newDepartments = [];
  const newServices = [];
  const notifyUsageIds = [];

  let updateNotifyUsageIds = false;

  //check if services and departments are already in existing data and add them to an empty array if not

  console.log(notifyUsage);

  map(notifyUsage, (notifyUsageItem, i) => {
    if (
      notifyUsageItem.organisation_id &&
      !existingDepartments[notifyUsageItem.organisation_id]
    ) {
      newDepartments.push(addNewDepartment(notifyUsageItem));
      existingDepartments[notifyUsageItem.organisation_id] = {
        ID: notifyUsageItem.organisation_id,
        ProductID: 1,
        OrganisationName: notifyUsageItem.organisation_name,
      };
    }
    if (!existingServices[notifyUsageItem.service_id]) {
      newServices.push(addNewService(notifyUsageItem));
      existingServices[notifyUsageItem.service_id] = {
        ID: notifyUsageItem.service_id,
        DepartmentID: notifyUsageItem.organisation_id,
        ServiceName: notifyUsageItem.service_name,
      };
    }
    if (notifyUsageItem.ID) {
      notifyUsageIds.push([notifyUsageItem.ID]);
    } else {
      const newId = uuidv4();
      notifyUsageItem.ID = newId;
      notifyUsageIds.push([newId]);
      updateNotifyUsageIds = true;
    }
  });

  submitNewIds(
    newDepartments,
    newServices,
    notifyUsageIds,
    updateNotifyUsageIds
  );

  return {
    departments: existingDepartments,
    services: existingServices,
    notifyUsage,
  };
}

function submitNewIds(
  newDepartments,
  newServices,
  notifyUsageIds,
  updateNotifyUsageIds
) {
  const options = {};

  if (newDepartments.length > 0) {
    options.newDepartments = newDepartments;
  }

  if (newServices.length > 0) {
    options.newServices = newServices;
  }

  if (updateNotifyUsageIds) {
    options.notifyUsageIds = notifyUsageIds;
  }

  console.log(options);
  google.script.run
    .withFailureHandler((msg) => {
      console.log(msg);
    })
    .withSuccessHandler((test) => {})
    .addNewIds(options);
}

const addNewDepartment = (notifyUsageItem) => {
  return [
    notifyUsageItem.organisation_id,
    1,
    notifyUsageItem.organisation_name,
  ];
};

const addNewService = (notifyUsageItem) => {
  return [
    notifyUsageItem.service_id,
    notifyUsageItem.organisation_id ? notifyUsageItem.organisation_id : "",
    notifyUsageItem.service_name,
  ];
};

export default addAllIds;
