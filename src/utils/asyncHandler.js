const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
//next(err) jumps to error handling middleware
//brief approach



export {asyncHandler}

// //wrapper fun so that we can directly implement loading data form database
// const asyncHandler=(fn)=>{async (req, res, next)=>{
// try{
//     await fn(req,res,next)
// }
// catch (error){
//   res.status(err.code || 500).json({
//     success:false,
//     message:err.message
//   })
// }

// }}
