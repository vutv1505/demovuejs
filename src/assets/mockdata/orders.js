const MOCK_ORDERS_DATA = [
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙ',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙ',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙ',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙ',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙ',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙ',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp2',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙp2',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙp2',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙp2',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙp2',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 2,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙp2',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙp3',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp3',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾓｲｽﾄ ｻﾝﾌﾟﾙp3',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 1,
    item_number: '123456',
    product_name: 'ｻﾝｽｸﾘｰﾝｵﾝﾌｪｲｽﾗｲﾄ ｻﾝﾌﾟﾙp3',
    product_classification: '半製品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  },
  {
    order_target_status: 0,
    item_number: '123456',
    product_name: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙp3',
    product_classification: 'ピロー品',
    schedule_order_date: '21/03',
    schedule_order_period: '5月次',
    start_delivery_date: '21/07/02'
  }
]
export default MOCK_ORDERS_DATA
