
function Go(){
    console.log('sdlkf'); 
}

function createSingle(fn){
    let ins
    return function(){
        if(ins){
            return ins
        }
        ins =  new fn()
        return ins
    }
}
Go = createSingle(Go)
const go1 = new Go()
const go2 = new Go()
console.log(go1 === go2);

