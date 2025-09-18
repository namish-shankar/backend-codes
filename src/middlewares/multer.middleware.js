import multer from "multer"
//upload krne ke liye middleware chhaiye
//save krane ke liye 'destination', memory ya disk me store kr skte uploaded files
// //disk is better if large files
const storage=multer.diskStorage(
    {
        destination:function(req,file,cb)
        {
            //cb is callback ()=>{}
            cb(null,'./public/temp')//second arg is destination
        },
        filename: function(req,file,cb){
            cb(null,file.originalname)//first arg=null means no erorr,second arg is file ka name
        }
    }
)

export const upload=multer({storage})
//multer is a funciton that creates an 'upload' middleware instsnce
//multer function takes options object as argument ->here it is {storage}