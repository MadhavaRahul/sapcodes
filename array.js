let ar = new Array()
let ar1 = [] //creating empty arr with 2 types

let apes=["monkey","chimp","kong"]
//most of time use 2 nd one most
/* console.log(apes[0])
console.log(apes[1])
console.log(apes[2])//display elts
//operation of replace
console.log("before replace:"+apes[1])
apes[1]='gori'
console.log("after replace:"+apes[1])*/
apes[3]='langur'

for(let i=0;i<apes.length;i++){
    console.log(apes[i])
}
/*let apes1 =["monkey","chimp","kong"]
for(let ape of apes1){
    console.log(ape)
}*/
//console.log(apes.pop())//operation at last by usg pop,push()
//apes.push("langur")
//console.log(apes)
console.log(apes.shift())
console.log(apes)//op at 1 st
apes.unshift('monkey')
console.log(apes)
let mid = Math.floor(apes.length/2)//op at mid
apes.splice(mid,1)
console.log(apes)