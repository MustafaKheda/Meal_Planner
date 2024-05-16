

export default () => {
  
  onmessage = (event) => {
  const {mealsData} = event.data;
 
    const daysOfWeekOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    mealsData.sort((a, b) => {
      return (
        daysOfWeekOrder.indexOf(a.weekDay) - daysOfWeekOrder.indexOf(b.weekDay)
      );
    });

    postMessage(mealsData)
  };
};
