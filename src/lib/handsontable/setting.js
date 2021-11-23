import _ from 'lodash'
export default function(config) {
  return _.merge(
    {
      contextMenu: ['copy', 'cut'],
      readOnly: false,
      language: 'ja-JP',
      licenseKey: 'non-commercial-and-evaluation',
      hiddenColumns: {
        columns: [],
        indicators: false
      },
      showCheckboxAll: false,
      selectedMode: 'none',
      colHeaders: [],
      rowHeaders: true,
      columns: [],
      height: '100%',
      allowInvalid: true,
      allowSetting: [],
      autoSaving: false,
      modalSettingsTitle: '',
      enableDirtyStyle: false,
      onSaveSetting: () => {},
      onLoadSetting: () => {},
      manualColumnResize: true,
      manualColumnMove: true,
      columnSorting: true,
      sortIndicator: true,
      copyPaste: {
        rowsLimit: 2000
      },
      enterBeginsEditing: true,
      dropdownMenu: [
        'filter_by_condition',
        'filter_by_value',
        'filter_action_bar'
      ],
      filters: false,
      filtersKeyValue: true,
      width: 'auto',
      exportFile: true,
      fragmentSelection: 'cell',
      comments: true,
      persistentState: true,
      columnHeaderHeight: 35,
      wordWrap: false,
      beforeKeyDown: function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
          e.stopImmediatePropagation()
        }
      }
    },
    config
  )
}
