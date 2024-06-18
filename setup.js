const sqlite3=require('sqlite3').verbose()
const db=new sqlite3.Database('./mydatabase.db')
db.serialize(()=>{
    //create users table
    db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,name TEXT,email TEXT)')
    //insert some egs users
    const stmt =db.prepare('INSERT INTO users(name,email)VALUES(?,?)')
    for(let i=0;i<10;i++){
        stmt.run(`User${i}`,`user${i}@example.com`)
    }
    stmt.finalize()//execute the insert query
})
db.close()