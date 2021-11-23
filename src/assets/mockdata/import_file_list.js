export const IMPORT_FILES_LIST = [
  {
    importNumber: '1',
    importFileInfo: {
      importStartDatetime: '2021-04-01 10:10:10:111',
      executionAccount: 'aaaa',
      nameKanjiLastName: '姓ああ',
      nameKanjiFirstName: '名いい',
      importReportCode: '10',
      importFileName: '【WebEDI】仕入先入荷予定取込用ファイル取込.csv',
      reportName: '【WebEDI】仕入先入荷予定取込用ファイル取込'
    },
    importFileResult: {
      importEndDatetime: '2021-04-01 10:33:33:333',
      importResultCode: '3',
      importResultName: 'エラー',
      totalCount: '1000',
      warningCount: '1',
      errorCount: '1'
    },
    importFileResultDetails: [
      {
        rowQuantity: '1',
        errorcategory: '1',
        errorCode: '1000001',
        errorMessage: '商品数には1以上の数字を指定してください。'
      },
      {
        rowQuantity: '2',
        errorcategory: '2',
        errorCode: '2000001',
        errorMessage: '入力日に過去日が指定されています。'
      }
    ]
  },
  {
    importNumber: '2',
    importFileInfo: {
      importStartDatetime: '2021-04-01 10:10:10:111',
      executionAccount: 'aaaa',
      nameKanjiLastName: 'VA',
      nameKanjiFirstName: 'AAA',
      importReportCode: '10',
      importFileName: '【WebEDI】仕入先入荷予定取込用ファイル取込.csv',
      reportName: '【WebEDI】仕入先入荷予定取込用ファイル取込'
    },
    importFileResult: {
      importEndDatetime: '2021-04-01 10:33:33:333',
      importResultCode: '3',
      importResultName: 'エラー',
      totalCount: '1000',
      warningCount: '1',
      errorCount: '1'
    },
    importFileResultDetails: [
      {
        rowQuantity: '1',
        errorcategory: '1',
        errorCode: '1000001',
        errorMessage: '商品数には1以上の数字を指定してください。'
      },
      {
        rowQuantity: '2',
        errorcategory: '2',
        errorCode: '2000001',
        errorMessage: '入力日に過去日が指定されています。'
      }
    ]
  }
]
