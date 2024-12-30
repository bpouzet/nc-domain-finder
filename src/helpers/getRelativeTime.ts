import dayjs from 'dayjs' ;

const getRelativeTimeFromNow = (date: string, locale: string = 'en') => {
  return dayjs().locale(locale).to(date) ;
} ;

export default getRelativeTimeFromNow ;
