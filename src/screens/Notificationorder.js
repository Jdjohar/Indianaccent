import PushNotification from 'react-native-push-notification';
// const abc = require('../../index');





const shownotification = (title, message) => {
    PushNotification.getChannels(function (channel_ids) {
        // console.log(channel_ids, "channel id 12"); // ['channel_id_1']
        PushNotification.localNotification({
            channelId: channel_ids,
            title: title,
            message: message,
        });
        // console.log(channel_ids,"Local Notifiaction");
      });
};
const handleScheduleNotification = (title, message) => {

    PushNotification.localNotification({
        title: title,
        message: message,
        date: new Date(Date.now() + 5000),
    });
    console.log("5 sec - Local Notifiaction");
};

const handlecancel = (title, message) => {

    PushNotification.cancelAllLocalNotifications();
};

export {shownotification, handleScheduleNotification, handlecancel};