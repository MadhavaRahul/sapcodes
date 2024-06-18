const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

//connection to db
const db = new sqlite3.Database('./myDatab.db', (err) => {
if (err) {
console.log(err);
} else {
console.log("Server is running on port 3000 and DB is connected.");
}
});

app.use(express.json());

// getting all the data from database
app.get("/rbs", (req, res) => {
db.all("SELECT * FROM todoList", [], (err, rows) => {
if (err) {
console.log(err.message);
} else {
res.json(rows);
}
});
});

//creating new task
app.post('/rbs',(req,res)=>{
const {taskName,progress} = req.body
db.run('INSERT INTO todoList (taskName,progress) VALUES(?,?)',[taskName,progress] ,function(err){
if(err)
{
console.log(err)
}
else{
res.json({msg:"ADDED"})
}
})
})

//updating exiting task
app.put('/rbs/:id',(req,res)=>{
const id = req.params.id
const {taskName,progress} = req.body
db.run('UPDATE todoList SET name = ? ,main= ? WHERE id = ?',[taskName,progress,id],function(err){
if(err)
{
console.log(err)
}
else
{
res.json({msg:"Updated"})
}
})
})

//deleting task
app.delete('/rbs/:id',(req,res)=>{
const id = req.params.id
db.run('DELETE FROM todoList WHERE id = ?',id,function(err){
if(err)
{
console.log(err)
}
else{
res.json({msg:id.name})
}
})
})

app.get('/rbs/:id', (req, res) => {
const id = req.params.id;
db.get('SELECT * FROM todoList WHERE id = ?', id, function (err, row) {
if (err) {
console.log(err);

1
2
3
4
  } else {
    res.json(row);
  }
});
});

app.listen(3000, () => {
console.log("Server is running on port 3000 and DB is connected.");
});