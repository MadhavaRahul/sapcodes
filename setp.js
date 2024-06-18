const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myDatab.db');

db.serialize(() => {
db.run('CREATE TABLE IF NOT EXISTS todoList (id INTEGER PRIMARY KEY, taskName TEXT, progress TEXT)');

const stmt = db.prepare('INSERT INTO todoList (taskName,  progress) VALUES (?, ?)'); 
const tasks = ["to type gmail"];
const pro = ["Done"]

for(i=0;i<tasks.length;i++)
{
    stmt.run(`Task Name : ${tasks[i]}`, `---->${pro[i]}`)
}

stmt.finalize();
});

db.close();