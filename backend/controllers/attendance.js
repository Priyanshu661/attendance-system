const AttendanceReport = require("../models/attendance");

const fetchAttendanceByDate = async (req, res) => {
  try {
    const date = new Date(req.body.searchDate);

    const attendance = await AttendanceReport.findAll({
      where: {
        date: date,
      },
    });

    return res.status(200).json({ data: attendance });
  } catch (e) {
    console.log(e);
  }
};

const postAttendanceByDate = async (req, res) => {
  try {
    const data = req.body;

    await AttendanceReport.bulkCreate(data);

    return res.status(200).json({ message: "data inserted Successfully" });
  } catch (e) {
    console.log(e);
  }
};

const fetchAllData = async (req, res) => {
  try {
    const data = await AttendanceReport.findAll();

    const studentData = new Map();

    let TotalCount=data.length;

   for (let i = 0; i < data?.length; i++) {
     if (studentData.has(data[i].studentName)) {
       let attendance = studentData.get(data[i].studentName);

       if (data[i].attendance === true) {
         attendance++;
       }

       studentData.set(data[i].studentName, attendance);
     } else {
       let attendance = 0;
       if (data[i].attendance === true) {
         attendance++;
       }
       studentData.set(data[i].studentName, attendance);
     }
   }

   const newData=[]

   studentData.forEach((count,name)=>{

    newData.push({name,count:count+"/"+TotalCount,percent:((count/TotalCount)*100).toFixed(2)})
   })

   return res.status(200).json({data:newData})
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postAttendanceByDate,
  fetchAttendanceByDate,
  fetchAllData,
};
