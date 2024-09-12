export const getColor = (val) => {
  if(val > 80) {
    return "green";
  } else if(val > 60) {
    return "yellow";
  }
  return "red";
};

export const getActualColor = (val) => {
  if(val > 80) {
    return "#7AC44A";
  } else if(val > 60) {
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