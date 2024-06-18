
const readline=require('readline')
readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }).question('Enter no.: ', (a) => {
    if(a%2==0){
        console.log(a+" is an even")
    }
    else{
        console.log(a+" is an odd")
    } 
  });
