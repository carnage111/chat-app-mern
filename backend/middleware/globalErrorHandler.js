const globalErrorHandler = (err, req, res, next) => {
    console.log(res.statusCode);
    const errorResponse = {
        status:"failed",
        message:err.message || "An unknown error occurred",
        stack:err.stack
    }

    return res.json(errorResponse);
};

export default globalErrorHandler;