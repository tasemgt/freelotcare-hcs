
const convertToTimeStamp = (cTime) =>{
  if (cTime === '') return null;
  let d = new Date();
  let time = cTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
  d.setHours( Number(time[1]) + ( ( Number(time[1]) < 12 && time[4] ) ? 12 : 0) );
  d.setMinutes( Number(time[3]) || 0 );
  d.setSeconds(0, 0);
  return d;
}


module.exports = {

  getTimeDifference : (startTime, endTime) =>{
    if(startTime !== "" && endTime !== "") {
      const tStart = convertToTimeStamp(startTime);
      const tStop = convertToTimeStamp(endTime);
      return (tStop - tStart)/(1000*60);
    }
    return 0;
  },

  generateYears: (numOfYears) =>{
    let currentYear = new Date().getFullYear(); 
    const years = [currentYear];
  
    for(let i=0; i <= numOfYears; i++){
      currentYear =  ++currentYear;
      years.push(currentYear);
    }
    return years;
  },

  generateMonths: () =>{
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  },

  getNextEntry: (currentEntry, type) =>{
    const months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const quarters = ['1st Qtr (JAN-MAR)', '2nd Qtr (APR-JUNE)', '3rd Qtr (JUL-SEPT)', '4th Qtr (OCT-DEC)'];

    if((currentEntry === 'December') || (currentEntry === '4th Qtr (OCT-DEC)')){
      return '';
    }

    const entries = type === 'month' ? months : quarters; 

    const currentEntryIndex = entries.findIndex(e => currentEntry === e);
    return entries[currentEntryIndex + 1];
  }
}