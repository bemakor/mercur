export const storeReviewFields = [
  'id',
  'reference',
  'rating',
  'customer_note',
  'customer.first_name',
  'customer.last_name',
  'seller_note',
  'created_at',
  'updated_at'
]

export const storeReviewQueryConfig = {
  list: {
    defaults: storeReviewFields,
    allowed: storeReviewFields,
    isList: true
  },
  retrieve: {
    defaults: storeReviewFields,
    allowed: storeReviewFields,
    isList: false
  }
}
