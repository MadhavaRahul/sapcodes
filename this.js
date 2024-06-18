/*'use strict'
function printThis(){
    console.log(this)
}
printThis()*/
const anime={
    name:'One piece',
    proto:'luffy',
    details: {
        sidechar:'Zoro',
        initial:'roguer',


    de(){
        //`${this.name} is base on hero ${this.proto}.
        console.log(` ${this.sidechar} is goat & ${this.initial} is main theme of onepiece`)

      },
    },
}
anime.details.de()