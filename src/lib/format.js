import numbro from 'numbro'
import * as moment from 'moment/moment'

export const numberFormat = (
  value,
  pattern = {
    thousandSeparated: true
  }
) => {
  if (
    value != null &&
    String(value).length > 0 &&
    /^-?(\d*|\d{0,2}[,\d{3}]*)(\.\d*)?$/.test(value)
  ) {
    const num = numbro(String(value).replace(/,/g, ''))
    if (num && num._value != null) {
      return num.format(pattern)
    }
  }

  return ''
}

moment.locale('ja')

export const hotCalendarFormatJP = () => {
  return {
    firstDay: 0,
    yearSuffix: '年',
    showMonthAfterYear: true,
    showDaysInNextAndPreviousMonths: true,
    i18n: {
      previousMonth: '前月',
      nextMonth: '次月',
      months: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      weekdays: moment.localeData()._weekdays,
      weekdaysShort: moment.localeData()._weekdaysShort
    }
  }
}

export const dayOfWeekBefore = value => {
  const days = ['日', '月', '火', '水', '木', '金', '土']
  if (value != null && String(value).length > 0) {
    const date = moment(value).format('YYYY/MM/DD')
    const d = new Date(date)
    return `${days[d.getDay()]} ${date}`
  }
  return ''
}
