import { createFindParams } from '@medusajs/medusa/api/utils/validators'
import { z } from 'zod'

export const AdminGetRegionsParams = createFindParams({
  limit: 50,
  offset: 0
})

export type AdminGetRegionsParamsType = z.infer<typeof AdminGetRegionsParams>
