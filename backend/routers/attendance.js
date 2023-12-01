const express=require("express")
const { postAttendanceByDate, fetchAttendanceByDate, fetchAllData } = require("../controllers/attendance")


const router=express.Router()


router.post("/post-data",postAttendanceByDate)
router.post("/fetch-data", fetchAttendanceByDate);
router.get("/fetch-all-data", fetchAllData);




module.exports=router