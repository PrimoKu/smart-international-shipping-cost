const asyncHandler = require("express-async-handler");
const notificationRepo = require("../repositories/NotificationRepository");


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
        const { user_id, message } = req.body;
        let notification;
        try {
            notification = await notificationRepo.create(user_id, message);
            if(notification) {
                return res.status(201).json({Order: order, GroupOrder: groupOrder});
            } else {
                return res.status(442).json({ message: "Create notification failed!" });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });
}

module.exports = NotificationController;