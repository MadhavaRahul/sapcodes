const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myDatab.db');
db.all('SELECT * FROM todoList',[],(err,rows)=>{
if(err)
{
console.log(err)
}
else
{
console.log(rows)
}
})
db.close()