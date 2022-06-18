const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.StatusCode || 500;

    if(process.env.NODE_ENV.trim() === 'DEVELOPMENT'){        
            res.status(err.statusCode).json({
                success: false,
                error: err,
                errMessage: err.message,
                stack: err.stack
        });
    }
    else if(process.env.NODE_ENV.trim() === 'PRODUCTION'){

        let error = {...err};

        error.message = err.message;

        //Wrong mongoose Object ID Error
        if(err.name == 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        //Handling mongoose validation errors
        if(err.name === 'ValidationError') {            
            const message = Object.values(err.errors).map(error => error.message);
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error.'
        });
    }
    else{
        let error = {...err};

        error.message = err.message;

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error.'
        });        
    }
}