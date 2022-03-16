function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      "£" +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  return day + "/" + month + "/" + date.getFullYear() + " " + strTime;
}

function getYear(date) {
  if (!date) return;
  date = new Date(date);
  return date.getFullYear();
}

function getQuarter(date) {
  if (!date) return;
  date = new Date(date);
  const quarterNames = [
    "Q4",
    "Q4",
    "Q4",
    "Q1",
    "Q1",
    "Q1",
    "Q2",
    "Q2",
    "Q2",
    "Q3",
    "Q3",
    "Q3",
  ];
  return quarterNames[date.getMonth()];
}

function getMonth(date) {
  if (!date) return;
  date = new Date(date);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
}

function getApproximateMonthDifference(firstDate, secondDate) {
  if (!firstDate || !secondDate) return null;
  return (secondDate.getTime() - firstDate.getTime()) / 30;
}

function getFy(date) {
  var financial_year = "";
  var today = new Date(date);
  if (today.getMonth() + 1 <= 3) {
    financial_year =
      today.getFullYear() - 2001 + "/" + (today.getFullYear() - 2000);
  } else {
    financial_year =
      today.getFullYear() - 2000 + "/" + (today.getFullYear() - 1999);
  }
  return financial_year;
}

function addMonthToDate(date, numberOfMonths) {
  return new Date(date.setMonth(date.getMonth() + numberOfMonths));
}

function getQuarterFY(date) {
  return `${getQuarter(date)} ${getFy(date)}`;
}

function getMonthYear(date) {
  return `${getMonth(date)} ${getYear(date)}`;
}

function createPeriodString(datesArray) {
  const periodCountObject = datesArray.reduce(
    (object, date) => {
      const fy = getFy(date);
      const quarter = getQuarterFY(date);

      if (!object.quarters[quarter]) object.quarters[quarter] = 0;
      object.quarters[quarter]++;

      if (!object.fys[fy]) object.fys[fy] = 0;
      object.fys[fy]++;

      return object;
    },
    { quarters: {}, fys: {} }
  );

  const periodArray = datesArray.reduce((array, date) => {
    const quarter = getQuarterFY(date);
    const fy = getFy(date);

    if (periodCountObject.fys[fy] === 12) {
      array.push(`${fy} FY`);
    } else if (periodCountObject.quarters[quarter] === 3) {
      array.push(quarter);
    } else {
      array.push(getMonthYear(date));
    }
    return array;
  }, []);

  return [...new Set(periodArray)];
}

export {
  formatMoney,
  formatDate,
  getYear,
  getQuarter,
  getMonth,
  getFy,
  addMonthToDate,
  getQuarterFY,
  createPeriodString,
};
