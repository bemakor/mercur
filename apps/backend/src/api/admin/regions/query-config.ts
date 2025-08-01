export const defaultAdminRegionFields = [
  'id',
  'name',
  'currency_code',
  'created_at',
  'updated_at',
  'deleted_at',
  'automatic_taxes',
  'metadata',
  '*countries'
]

export const adminRegionsQueryConfig = {
  list: {
    defaults: defaultAdminRegionFields,
    isList: true
  },
  retrieve: {
    defaults: defaultAdminRegionFields,
    isList: false
  }
}
