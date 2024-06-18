const readline=require('readline')

readline.createInterface({
    input: process.stdin,
    output: process.stdout

}).question("enter data",(n,a=n.split(""))=>{
    console.log(a.length+" letters & " )
   console.log( +" words ")
})
// She sells sea shells on the sea shore
const readline = require('readline');

readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).question("Enter data: ", (n, a = n.split(" ")) => {
    console.log(a.length + " words & " + n.length + " letters");
});
