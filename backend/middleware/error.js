const ErroeHander = require("../utils/errorhander");






module.exports=(err,req,res,next)=>{
 

    err.statusCode = err.statusCode || 500;
    err.message =err.message || "Internal Server Error";


    //wrong mongodb Id error
    if(err.name==="CastError"){
        const message=`Resource not fount . Invalide: ${err.path}`;
        err=new ErroeHander(message,400);
    }


// Mongoose duplicate key error
if(err.code==11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err= new ErroeHander(message,400);
}

// Wrong JWT error

if(err.name==="JsonWebTokenErroe"){
    const message =`Json Web Token is invalide, Try again`;
    err=new ErroeHander(message,400);
}

// JWT EXPIRE error


if(err.name==="TokenExpiredError"){
    const message =`Json Web Token is Expired, Try again`;
    err=new ErroeHander(message,400);
}


    res.status(err.statusCode).json({
        success: false,
        message:err.message,
    });
};