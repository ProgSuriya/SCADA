// Get the current time
function displayTime() {
    var currentTime = new Date();
    var timeString = currentTime.toLocaleTimeString();
    //document.getElementById("time").innerHTML = timeString;
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
        //document.getElementById("date").innerHTML = formattedDate;
    

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
//
// reading float registers
const fs = require('fs').promises;
const fs1 = require('fs');
//const fs = require('fs')
const http = require('http');
const url = require('url');
const pathimg = require('path');
const ModbusRTU = require('modbus-serial');

const client = new ModbusRTU();

const server = http.createServer(async function (request, response) {
    const path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
            try {
                const data = await fs.readFile(__dirname + '/tanks.html');
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            } catch (error) {
                console.error('Error reading file:', error);
                response.writeHead(404);
                response.write('404 Not Found');
                response.end();
            }
            break;

            case '/home.html':
                try {
                    const data = await fs.readFile(__dirname + '/home.html');
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                } catch (error) {
                    console.error('Error reading file:', error);
                    response.writeHead(404);
                    response.write('404 Not Found');
                    response.end();
                }
                break;

                case '/reports.html':
                    try {
                        const data = await fs.readFile(__dirname + '/home.html');
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write(data);
                        response.end();
                    } catch (error) {
                        console.error('Error reading file:', error);
                        response.writeHead(404);
                        response.write('404 Not Found');
                        response.end();
                    }
                    break;

                case '/sap-reports.html':
                    try {
                        const data = await fs.readFile(__dirname + '/home.html');
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write(data);
                        response.end();
                    } catch (error) {
                        console.error('Error reading file:', error);
                        response.writeHead(404);
                        response.write('404 Not Found');
                        response.end();
                    }
                    break;

        case '/data':
            try {
                const connectionInfo = { host: '127.0.0.1', port: 502 };
                await client.connectTCP(connectionInfo.host, connectionInfo);
                console.log('Connected to Modbus server');

                client.setID(1);
                 //console.log("oo")
                
                 client.readHoldingRegisters(0, 2)
                 .then(data => {
                     const floatValue = data.buffer.readFloatBE(0);
                     console.log("Read float value from PLC:", floatValue);
                     response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify({ floatValue }));
                response.end();
                 })
                 .catch(error => {
                     console.error("Failed to read from Modbus server:", error);
                 });
                
                /* const data = await client.readHoldingRegisters(0, 2);
                console.log(data);
                const floatValue = data.buffer.readFloatBE(0);
                console.log('Read float value from PLC:', floatValue);

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify({ floatValue }));
                response.end();*/
            } catch (error) {
                console.error('Failed to handle request:', error);
                response.writeHead(500);
                response.write('Internal Server Error');
                response.end();
            }
            break;
            case '/tas.jpg':  
                    const imagePath = pathimg.join(__dirname, 'tas.jpg');
                    const imageStream = fs1.createReadStream(imagePath);
                    response.writeHead(200, {'Content-Type': 'image/jpeg' });
                    imageStream.pipe(response);
                    break;

            case '/tank.png':  
            const imagePath1 = pathimg.join(__dirname, 'tank.png');
            const imageStream1 = fs1.createReadStream(imagePath1);
            response.writeHead(200, {'Content-Type': 'image/png' });
            imageStream1.pipe(response);
            break;

            case '/iocl-icon.jpg':  
            const imagePath4 = pathimg.join(__dirname, 'iocl-icon.jpg');
            const imageStream4 = fs1.createReadStream(imagePath4);
            response.writeHead(200, {'Content-Type': 'image/jpg' });
            imageStream4.pipe(response);
            break;

            case '/style.css':  
            const imagePath2 = pathimg.join(__dirname, 'style.css');
            const imageStream2 = fs1.createReadStream(imagePath2);
            response.writeHead(200, {'Content-Type': 'style/css' });
            imageStream2.pipe(response);
            break;

            case '/script_gbl.js':  
            const imagePath3 = pathimg.join(__dirname, 'script_gbl.js');
            const imageStream3 = fs1.createReadStream(imagePath3);
            response.writeHead(200, {'Content-Type': 'script/js' });
            imageStream3.pipe(response);
            break;
        default:
            response.writeHead(404);
            response.write('404 Not Found');
            response.end();
            break;
    }
});

server.listen(8082, () => {
    console.log('Server is running on Port::8082');
});

// Handle server shutdown properly
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    if (client.isOpen) {
        await client.close();
    }
    process.exit();
});


