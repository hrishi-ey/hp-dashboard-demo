export const getColor = (val) => {
  if(val === 4) {
    return "#7AC44A";
  } else if(val === 3) {
    return "#FE912C";
  } else if(val === 2) {
    return "#FEB92C";
  }
  return "#ED1C24";
};

export const getActualColor = (val) => {
  if(val === 4) {
    return "#7AC44A";
  } else if(val === 3) {
    return "#FE912C";
  } else if(val === 2) {
    return "#FEB92C";
  }
  return "#ED1C24";
}

export const getRemark = (val) => {
  if(val > 80) {
    return "Good";
  } else if(val > 60) {
    return "Caution";
  }
  return "Alert"; 
}


export const getCurrentDateTime = () => {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var currentDate = new Date();
  return "" + currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
};


export const getChartValues = (dataSet, userType, name) => {
  let values = { score: 0, indicator: 0 }
  if(userType === "admin") {
    values.score = dataSet["Admin." + name + ".Score"].value;
    values.indicator = dataSet["Admin." + name + ".Indicator"].value;
  } else if(userType === "owner") {
    values.score = dataSet["Owner." + name + ".Score"].value;
    values.indicator = dataSet["Owner." + name + ".Indicator"].value;
  } else if(userType === "store") {
    values.score = dataSet["Store." + name + ".Score"].value;
    values.indicator = dataSet["Store." + name + ".Indicator"].value;
  }
  return values;
}