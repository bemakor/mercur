import { MiddlewareRoute, validateAndTransformQuery } from '@medusajs/framework'

import { adminRegionsQueryConfig } from './query-config'
import { AdminGetRegionsParams } from './validators'

export const adminRegionsMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/admin/regions',
    middlewares: [
      validateAndTransformQuery(
        AdminGetRegionsParams,
        adminRegionsQueryConfig.list
      )
    ]
  },
  {
    method: ['GET'],
    matcher: '/admin/regions/:id',
    middlewares: [
      validateAndTransformQuery(
        AdminGetRegionsParams,
        adminRegionsQueryConfig.retrieve
      )
    ]
  }
]
