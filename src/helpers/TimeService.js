class TimeService {

  getTimeInHebrew(timeInText) {

    try {
      timeInText      = timeInText.replace('ago', 'לפני')
      timeInText      = timeInText.replace('seconds', 'שניות')
      timeInText      = timeInText.replace('second', 'שניה')
      timeInText      = timeInText.replace('minutes', 'דקות')
      timeInText      = timeInText.replace('minute', 'דקה')
      timeInText      = timeInText.replace('hours', 'שעות')
      timeInText      = timeInText.replace('hour', 'שעה')
      timeInText      = timeInText.replace('days', 'ימים')
      timeInText      = timeInText.replace('day', 'יום')
      timeInText      = timeInText.replace('weeks', 'שבועות')
      timeInText      = timeInText.replace('week', 'שבוע');
      timeInText      = timeInText.replace('months', 'חודשים')
      timeInText      = timeInText.replace('month', 'חודש');
      timeInText      = timeInText.replace('years', 'שנים')
      timeInText      = timeInText.replace('year', 'שנה');

      const timeInArray     = timeInText.split(' ');
      const amountInNumber  = Number(timeInArray[0]);
      if(amountInNumber > 1) {
        return `${timeInArray[2]} ${timeInArray[0]} ${timeInArray[1]}`;
      }

      return `${timeInArray[2]} ${timeInArray[1]} ${timeInArray[0]}`;
    } catch(err) {
      error(timeInText, err);
      return timeInText;
    }
    
  }

}

export default new TimeService();
