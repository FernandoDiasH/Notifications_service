import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';


describe('Count recipients  notification', () => {
  it('should be able to get recipients notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(makeNotification({ recipientId:'example-recipient-1' }))
    await notificationsRepository.create(makeNotification({ recipientId:'example-recipient-1' }))
    await notificationsRepository.create(makeNotification({ recipientId:'example-recipient-2' }))
    
    const {notifications } = await countRecipientNotification.execute({
       recipientId:'example-recipient-1'
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
        expect.objectContaining({recipientId:'example-recipient-1'}),
        expect.objectContaining({recipientId:'example-recipient-1'}),
    ]));
  });  
});
