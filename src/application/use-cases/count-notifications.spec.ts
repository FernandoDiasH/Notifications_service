import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';


describe('Count recipients  notification', () => {
  it('should be able to count recipients notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(makeNotification({ recipientId:'example-recipient-1' }))
    await notificationsRepository.create(makeNotification({ recipientId:'example-recipient-1' }))
    await notificationsRepository.create(makeNotification({ recipientId:'example-recipient-2' }))
    
    const { count } = await countRecipientNotification.execute({
       recipientId:'example-recipient-1'
    });

    expect(count).toEqual(2);
  });


  
});
