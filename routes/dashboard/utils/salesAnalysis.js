const { MONTHS } = require("../../../common/constants/months");
const salesAnalysis = (orders) => {
  const months = orders.map((order) => order.createdAt.getMonth());
  const monthsCount = {};
  months.forEach((month) => {
    monthsCount[month] = (monthsCount[month] || 0) + 1;
  });
  const monthsSales = {};
  months.forEach((month, index) => {
    monthsSales[month] = (monthsSales[month] || 0) + amounts[index];
  });
  const monthsData = [];
  for (let i = 0; i < 12; i++) {
    monthsData.push({
      month: MONTHS[i],
      count: monthsCount[i] || 0,
      sales: monthsSales[i] || 0,
    });
  }
  return monthsData;
};

module.exports = {
  salesAnalysis,
};
