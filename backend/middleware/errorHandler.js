const errorHandler = (err, req, res, next) => {
    // console.log(err.stack); // Helps to debug the error

    if (err.message === "MISSING_CREDENTIALS") {
        return res.status(400).json({
            status: "failed",
            message: "Please provide name, email, password, and confirm password"
        });
    } else {
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
};

export default errorHandler;