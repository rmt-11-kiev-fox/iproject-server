const errorHandler = (err, req, res, next) => {
    let customMessage;
    if (err.status) res.status(err.status).json({ message: err.message });
    else {
        switch (err.name) {
            case "SequelizeUniqueConstraintError":
                res.status(400).json({
                    message: "This email is already taken.",
                });
                break;
            case "SequelizeValidationError":
                customMessage = err.errors.map((el) => el.message);
                res.status(400).json({ message: customMessage });
                break;
            case "SequelizeDatabaseError":
                console.log(err.message);
                res.status(400).json({ message: err.message });
                break;
            default:
                res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = errorHandler;
