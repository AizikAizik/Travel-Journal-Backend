import dotenv from "dotenv";

dotenv.config();

function GlobalError(err,req,res,next){
    const devENV = process.env.NODE_ENV;
    const status_code = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status_code);
    res.json({
        message : err.message,
        stack: devENV === 'production' ? null : err.stack,
    })
}

export default GlobalError;