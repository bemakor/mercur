import { Modules } from '@medusajs/framework/utils'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'

import { HumanizeTypes } from '../modules/requests/enum/humanize_types'
import { RequestDTO, SellerRequest } from '../modules/requests/types'
import { ResendNotificationTemplates } from '../modules/resend/types/templates'
import {
  fetchAdminEmails,
  fetchSellerByAuthActorId
} from '../shared/infra/http/utils'

export default async function requestCreatedAdminNotifyHandler({
  event,
  container
}: SubscriberArgs<RequestDTO>) {
  const notificationService = container.resolve(Modules.NOTIFICATION)
  const {
    data: { type }
  } = event

  await notificationService.createNotifications({
    to: '',
    channel: 'feed',
    template: 'admin-ui',
    content: {
      subject: `New Request Created`
    },
    data: {
      title: `New ${HumanizeTypes[type]}`,
      description: 'You have received a new request from a seller 🔔',
      redirect: '/admin/requests'
    }
  })

  if (type === 'seller') {
    const admins = await fetchAdminEmails(container)
    const seller = await fetchSellerByAuthActorId(
      event.data.submitter_id,
      container,
      ['name']
    )

    const notifications = admins.map((email) => ({
      to: email,
      channel: 'email',
      template: ResendNotificationTemplates.ADMIN_SELLER_REQUEST_CREATED,
      content: {
        subject: 'Seller requested to join the platform'
      },
      data: {
        data: {
          seller_name: seller.name
        }
      }
    }))

    await notificationService.createNotifications(notifications)
  }
}

export const config: SubscriberConfig = {
  event: SellerRequest.CREATED,
  context: {
    subscriberId: 'request-created-admin-notify-handler'
  }
}
