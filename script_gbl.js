// Get the current time
console.log('hi');
function displayTime() {
    var currentTime = new Date();
    var timeString = currentTime.toLocaleTimeString();
    document.getElementById("time").innerHTML = timeString;
}

setInterval(displayTime, 1000);

// Get the current date
var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Months are zero indexed, so we add 1
        var year = currentDate.getFullYear();

        // Format the day and month to have leading zeros if needed
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        var formattedDate = day + '/' + month + '/' + year;
        document.getElementById("date").innerHTML = formattedDate;
    

//Assigning functions to btns
        //home btn
        function home_btn() {
            window.location.href = "home.html";
        };

        //tanks btn
        function tanks_btn() {
            window.location.href = "tanks.html";
        };

        //sap btn
        function sap_btn() {
            window.location.href = "sap.html";
        };
        //sap reports btn
        function sap_reports_btn() {
            window.location.href = "sap-reports.html";
        }
        //reports btn
        function reports_btn() {
            window.location.href = "reports.html";
        }

//arrays

let tank1_params = ["primary_level", "secondary_level", "liqt_level", "vapt_level", "pressure_level"];
let tank2_params = ["primary_level", "secondary_level", "liqt_level", "vapt_level", "pressure_level"];
let tank3_params = ["primary_level", "secondary_level", "liqt_level", "vapt_level", "pressure_level"];
let tank4_params = ["primary_level", "secondary_level", "liqt_level", "vapt_level", "pressure_level"];