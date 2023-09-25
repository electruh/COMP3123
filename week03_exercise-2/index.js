 const http = require('http');
const employees = require('./Employee');

console.log('Lab 03 - NodeJs');

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.write(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Welcome to Lab Exercise 03</h1>');
        }

        if (req.url === '/employee') {
            // Convert employees to a formatted JSON string with line breaks
            const formattedJSON = JSON.stringify(employees, null, 4);
            res.write(formattedJSON);
        }

        if (req.url === '/employee/names') {
            const sortedNames = employees
                .map((employee) => `${employee.firstName} ${employee.lastName}`)
                .sort();
            const formattedJSON = JSON.stringify(sortedNames, null, 4);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(formattedJSON);
        }
        if (req.url === '/employee/totalsalary') {
            const totalSalary = employees.reduce((acc, employee) => acc + employee.Salary, 0);
            res.write(JSON.stringify({total_salary: totalSalary}));
        }
    }
    // End the response after writing data
    res.end();
});


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Server running on http://localhost:${port}/employee`);
    console.log(`Server running on http://localhost:${port}/employee/names`);
    console.log(`Server running on http://localhost:${port}/employee/totalsalary`);
});
