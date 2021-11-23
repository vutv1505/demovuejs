const productsData = [
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000001',
    product_name: 'ｵﾙﾋﾞｽﾕｰドット3ｽﾃｯﾌﾟｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '2',
    product_code: '1000002',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000003',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000004',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000005',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000006',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000007',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000008',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000009',
    product_name: 'ｵﾙﾋﾞｽﾕｰドット3ｽﾃｯﾌﾟｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '2',
    product_code: '1000010',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000011',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000012',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000013',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000014',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000015',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000016',
    product_name: 'ｵﾙﾋﾞｽﾕｰドット3ｽﾃｯﾌﾟｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '2',
    product_code: '1000017',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000018',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000019',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000020',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000021',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000022',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000023',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000024',
    product_name: 'ｵﾙﾋﾞｽﾕｰドット3ｽﾃｯﾌﾟｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '2',
    product_code: '1000025',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000026',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000027',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000028',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000029',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000030',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000031',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000032',
    product_name: '202103 ﾕｰﾄﾞｯﾄ・ｵﾌｸﾘｰﾑｽﾍﾟｼｬﾙｾｯﾄ ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000033',
    product_name: '202103 ｵﾙﾋﾞｽﾕｰはじめてｾｯﾄ(ｵｰﾌﾟﾝ)',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000034',
    product_name: '【定期】ｵﾙﾋﾞｽﾕｰ4ｽﾃｯﾌﾟｾｯﾄ　4回目',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  },
  {
    product_type: '商品',
    item_number: '123456',
    product_code: '1000035',
    product_name: '渋谷ﾛﾌﾄ限定:ｵﾙﾋﾞｽﾕｰｽﾍﾟｼｬﾙ体験ｾｯﾄ',
    product_alias: '',
    release_date: '21/04',
    product_status: '売切り商品'
  }
]

export default productsData
