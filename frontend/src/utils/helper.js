import moment from "moment";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return ""
  const [integerPart, fractionPart] = num.toString().split('.')
  const formatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return fractionPart
  ? `${formatedInteger}.${fractionPart}`
  : formatedInteger
}

export const prepareExpenseBarData = (data = [])=> {
  const chartData = data.map((item) => ({
    category:item?.category,
    amount: item?.amount
  }))
  return chartData
}

export const prepareExpenseLineChartData = (data = []) => { 
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
  const chartData = sortedData.map((item)=>(
    {
      month: moment(item?.date).format("Do MMMM"),
      amount: item?.amount,
      category: item?.category
    }
  ))
  return chartData
}