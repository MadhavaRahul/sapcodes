class Animal {
    constructor (name){
        this.name=name
    }
    speak(){
         console.log(`${this.name} makes noise.`)
    }
}
var a=new Animal('Dog')
a.speak()
class husky extends Animal {
    constructor (name){
    super(name); 
        this.name=name
    }
    bark(){
         console.log(`${this.name} cute.`)
    }
}
var a=new Animal('Dog')
a.speak()