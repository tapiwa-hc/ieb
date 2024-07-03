const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ltS^Cf39Ppvr',
  database: 'EmployeeDB',
  port: '3306',
  multipleStatements: true
})

conn.connect((err) => {
  if (!err)
    console.log('DB connection succeeded');
  else
    console.log('DB connection failed \nError : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express Server is running on port 3000'))

app.get('/employees', (req,res) => {
  conn.query('SELECT * from Employee', (err, rows, fields) =>{
    if (!err) 
    res.send(rows);
    else
    console.log(err);
  });
});

app.get('/employees/:id', (req,res) => {
  conn.query('SELECT * from Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
    if (!err) 
    res.send(rows);
    else
    console.log(err);
  });
});

app.delete('/employees/:id', (req,res) => {
  conn.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
    if (!err) 
    res.send('Deleted Successfully');
    else
    console.log(err);
  });
});

app.post('/employees', (req,res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);"
  conn.query(sql , [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) =>{
    if (!err) 
    rows.forEach(element => {
      if (element.constructor === Array)
      res.send('Inserted Employee id : ' + element);
    });
    else
    console.log(err);
  });
});

app.put('/employees', (req,res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);"
  conn.query(sql , [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) =>{
    if (!err) 
      res.send('Updated Employee');
    else
    console.log(err);
  });
});