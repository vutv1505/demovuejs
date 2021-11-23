import _ from 'lodash'

const pathPattern = /[.[\]]+/
export const getState = state => {
  return path => {
    const paths = path.split(pathPattern)
    return paths.reduce((prev, key) => (prev ? prev[key] : null), state)
  }
}

export const setState = (state, payload) => {
  const path = payload[0],
    value = payload[1]
  path.split(pathPattern).reduce((prev, key, index, array) => {
    if (array.length === index + 1) {
      if (!_.isEqual(prev[key], value)) {
        prev[key] = value
      }
    }
    return prev[key]
  }, state)
}

export const mapState = (fields, namespaceField, readOnly = false) => {
  const fieldsConfig = normalizeFieldConfig(fields)
  return Object.keys(fieldsConfig).reduce((prev, key) => {
    const path = fieldsConfig[key]
    prev[key] = {}

    prev[key].get = function get() {
      const namespaceFactory = createNamespaceFactory(namespaceField, this)
      const namespace = namespaceFactory()
      return namespace
        ? _.cloneDeep(this.$store.getters[`${namespace}/getState`](path))
        : undefined
    }
    !readOnly &&
      (prev[key].set = function set(value) {
        const namespaceFactory = createNamespaceFactory(namespaceField, this)
        const namespace = namespaceFactory()
        this.$store.commit(`${namespace}/setState`, [path, value])
      })
    return prev
  }, {})
}

export const mapMultiRowState = (fields, namespaceField) => {
  const fieldsConfig = normalizeFieldConfig(fields)
  return Object.keys(fieldsConfig).reduce((entries, key) => {
    const path = fieldsConfig[key]

    entries[key] = {
      get: function get() {
        const namespaceFactory = createNamespaceFactory(namespaceField, this)
        const store = this.$store
        const namespace = namespaceFactory()
        if (!namespace) {
          return undefined
        }
        const rows = store.getters[`${namespace}/getState`](path)
        return rows.map((fieldsObject, index) => {
          return Object.keys(fieldsObject).reduce((prev, fieldKey) => {
            const fieldPath = ''
              .concat(path, '[')
              .concat(index, '].')
              .concat(fieldKey)
            return Object.defineProperty(prev, fieldKey, {
              get: function get() {
                return _.cloneDeep(
                  store.getters[`${namespace}/getState`](fieldPath)
                )
              },
              set: function set(value) {
                store.commit(`${namespace}/setState`, [fieldPath, value])
              }
            })
          }, {})
        })
      }
    }
    return entries
  }, {})
}

export const mapGetters = (fields, namespaceField) => {
  if (!fields) {
    return []
  }
  return fields.reduce((mapper, field) => {
    mapper[field] = function() {
      const namespaceFactory = createNamespaceFactory(namespaceField, this)
      return _.cloneDeep(this.$store.getters[`${namespaceFactory()}/${field}`])
    }
    return mapper
  }, {})
}

export const mapActions = (fields, namespaceField) => {
  if (!fields) {
    return []
  }
  return fields.reduce((mapper, field) => {
    mapper[field] = function(payload) {
      const namespaceFactory = createNamespaceFactory(namespaceField, this)
      return this.$store.dispatch(`${namespaceFactory()}/${field}`, payload)
    }
    return mapper
  }, {})
}

const normalizeFieldConfig = fields => {
  if (!Array.isArray(fields)) {
    return fields
  }
  return fields.reduce(function(prev, path) {
    const key = path.split('.').slice(-1)[0]

    if (prev[key]) {
      throw new Error('The key `'.concat(key, '` is already in use.'))
    }

    prev[key] = path
    return prev
  }, {})
}

const createNamespaceFactory = function(namespaceConfig, _targetComponent) {
  namespaceConfig = namespaceConfig || 'namespace'
  return typeof namespaceConfig === 'function'
    ? namespaceConfig
    : function() {
        return _targetComponent[namespaceConfig]
      }
}
