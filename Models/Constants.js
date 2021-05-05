const Messages = {
    TOKEN_ASSIGNED : "assigned token successfully",

    USER_FOUND : "User found",
    USER_DOESNT_EXIST : "User doesn't exist",
    USER_ALREADY_EXIST :"User already exists",
    USER_ADDED : "User added successfully",
    LOGGED_IN : "Log in successful",

    REMINDER_ADDED : "Reminder added",
    REMINDER_DELETED : "Reminder deleted",
    REMINDER_UPDATED : "Reminder updated",
    REMINDER_DOESNT_EXIST : "Reminder doesn't exist",
    MARKED_EXPIRED : "Marked expired",
    SCHEDULE_REMOVED : "Schedule removed",

    SENDING_MAIL : "sending mail to"

}

const RepeatTime = {
    daily : "daily",
    weekly : "weekly",
    monthly : "monthly",
    none : "none"
}

const CornString = {
    daily : "0 1 * * *",
    weekly : "0 0 * * 0",
    monthly : "0 0 1 * *"
}

module.exports = {
    Messages : Messages,
    RepeatTime : RepeatTime,
    CornString : CornString
}