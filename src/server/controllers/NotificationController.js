const asyncHandler = require("express-async-handler");
const notificationRepo = require("../repositories/NotificationRepository");
const { sendNotificationToUser } = require("../socketManager");
const userRepo = require("../repositories/UserRepository");

class NotificationController {

    //@des Get all notifications
    //@route GET /api/notifications
    //@access private
    getNotifications = asyncHandler( async (req, res) => {
        const user_id = req.user.id;
        const notifications = await notificationRepo.getAll(user_id);
        res.status(200).json(notifications);
    });

    //@des Create new notification
    //@route POST /api/notifications
    //@access private
    createNotification = asyncHandler( async (req, res) => {
        const user = req.user;
        const { userEmail, message, link } = req.body;
        let notification;
        try {
            const user = await userRepo.getByEmail(userEmail);
            if(!user) { return res.status(404).json({ message: "User not found!" }); }
            sendNotificationToUser(user.id, message);
            notification = await notificationRepo.create(user.id, message, link);
            if(notification) {
                return res.status(201).json({notification});
            } else {
                return res.status(442).json({ message: "Create notification failed!" });
            }
            return res.status(201).json({message: "Successed"});
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });
}

module.exports = NotificationController;