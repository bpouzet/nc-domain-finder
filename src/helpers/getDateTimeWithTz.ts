import dayjs from "dayjs"

const getDateTimeWithTz = (date: string) => {
  return dayjs.utc(date).utcOffset(11, true)
}

const getDateTimeWithTzEndDay = (date: string) => {
  return dayjs(getDateTimeWithTz(date)).add(23, 'hour').add(59, 'minute')
}

export { getDateTimeWithTz, getDateTimeWithTzEndDay }
