import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-fount';

describe('Cancel notification', () => {
  it('should be able to calcel a notification', async () => {
    
    const notificationsRepository = new InMemoryNotificationsRepository();
    const calncelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await calncelNotification.execute({
        notificationId:notification.id
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it("shold not be able to cancel a non existing notification", async ()=>{

    const notificationsRepository = new InMemoryNotificationsRepository();
    const calncelNotification = new CancelNotification(notificationsRepository);

    expect(()=>{
        return calncelNotification.execute({
            notificationId:'fake-notification-id'
        });
    }).rejects.toThrow(NotificationNotFound)

  })
});
