const form = document.getElementById("form");
const container = document.getElementById("data");

const dataButton = document.getElementById("fetchAttendance");

dataButton.addEventListener("click",async function(e){
    e.preventDefault();
   try {
     const response = await axios.get(
       `http://localhost:3000/fetch-all-data`
     );

     
     if (response && response.data && response.data.data.length > 0) {
       displayAllData(response.data.data);
     } else {
     console.log("error while fetching data")
     }

    
   } catch (error) {
     

     console.log(error);
   }
})

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const searchDate = document.getElementById("searchDate").value;

  try {
    const response = await axios.post(
      `http://localhost:3000/fetch-data`,
      {
        searchDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    if (response && response.data && response.data.data.length > 0) {
      displayAttendanceData(response.data.data);
    } else {
      displayAttendanceForm(searchDate);
    }
  } catch (error) {
    displayAttendanceForm(searchDate);

    console.log(error);
  }
});


function displayAllData(data){
  container.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    container.innerHTML += `
      <div style="display: flex; gap: 40px;">
        <p>${data[i].name}</p>
        <p>${data[i].count}</p>
        <p>${data[i].percent}</p>

      </div>
    `;
  }
}

function displayAttendanceData(data) {
  container.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    container.innerHTML += `
      <div style="display: flex; gap: 40px;">
        <p>${data[i].studentName}</p>
        <p>${data[i].attendance === true ? "Present" : "Absent"}</p>
      </div>
    `;
  }
}
function displayAttendanceForm(searchDate) {
  const attendanceFormData = `
          <form id="attendanceForm" >


          <div style="display:'flex'" class ="names">
            <label>Priyanshu</label>
           
              <input type="radio" name="Priyanshu" value=true> Present
            <input type="radio" name="Priyanshu" value=false> Absent
         
          
          </div>
           
          
             <div style="display:'flex'" class ="names">
            
            <label>Rathore</label>
            <input type="radio" name="Rathore" value=true> Present
            <input type="radio" name="Rathore" value=false> Absent
           </div>

            <button type="submit">Mark Attendance</button>
          </form>
        `;

  container.innerHTML = attendanceFormData;

  const attendanceForm = document.getElementById("attendanceForm");

  attendanceForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const attendanceEntries = [];
    const studentData = attendanceForm.querySelectorAll('input[type="radio"]');

    for (let i = 0; i < studentData.length; i = i + 2) {
      const studentName = studentData[i].name;
      const attendanceStatus = studentData[i].checked ? "true" : "false";

      attendanceEntries.push({
        studentName,
        date: searchDate,
        attendance: attendanceStatus,
      });
    }

    console.log(attendanceEntries);

    try {
      const res = await axios.post(
        "http://localhost:3000/post-data",
        attendanceEntries
      );

      container.innerHTML = ``;
      const response = await axios.post(
        `http://localhost:3000/fetch-data`,
        {
          searchDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      displayAttendanceData(response.data.data);

      console.log(res.data.message);
    } catch (error) {
      console.error("Error posting attendance:", error);
    }
  });
}
