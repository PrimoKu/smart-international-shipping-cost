const userSockets = {};

const registerUserSocket = (userId, socket) => {
    userSockets[userId] = socket;
};

const unregisterUserSocket = (socket) => {
    for(let userId in userSockets) {
        if(userSockets[userId] === socket) {
            delete userSockets[userId];
            break;
        }
    }
};

const sendNotificationToUser = (userId, message) => {
    if(userSockets[userId]) {
        userSockets[userId].emit('notification', message);
    }
};

module.exports = {
    registerUserSocket,
    unregisterUserSocket,
    sendNotificationToUser
};