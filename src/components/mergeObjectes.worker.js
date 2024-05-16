export default ()=>{
    onmessage = (event)=>{
        if(!event) return;
        const {data} = event
        const mergedObj = {};
        data.forEach((item) => {
          const {
            id,
            userId,
            weekDay,
            label,
            mealType,
            uriID,
            images,
            image,
            url,
          } = item;
          const key = userId + "_" + weekDay;
    
          if (!mergedObj[key]) {
            mergedObj[key] = { userId, weekDay, meals: [] };
          }
    
          mergedObj[key].meals.push({
            id,
            label,
            mealType,
            uriID,
            images,
            image,
            url,
          });
        });
    
        const mergedArr = Object.values(mergedObj).map((obj) => {
          const { userId, weekDay, meals } = obj;
          return { userId, weekDay, meals };
        });
        const daysOfWeekOrder = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
    
        // Sort the mergedArr based on the order of daysOfWeek
        mergedArr.sort((a, b) => {
          return (
            daysOfWeekOrder.indexOf(a.weekDay) - daysOfWeekOrder.indexOf(b.weekDay)
          );
        });
        postMessage(mergedArr);
    }
}