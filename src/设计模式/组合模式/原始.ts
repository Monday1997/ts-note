
type TCommondChild={
  exec:()=>void
}
class Commond{
  private children:TCommondChild[]=[]
  constructor(){}
  add(child:TCommondChild){
    this.children.push(child)
  }
  exec(){
    this.children.forEach(item=>item.exec())
  }
}

const go = {
  exec(){
    console.log('go')
  }
}
const swim = {
  exec(){
    console.log('swim')
  }
}
const go2 = {
  exec(){
    console.log('go2')
  }
}
const swim2 = {
  exec(){
    console.log('swim2')
  }
}


const c1 = new Commond()
c1.add(go)
c1.add(swim)

const c2 = new Commond()
c2.add(go2)
c2.add(swim2)

const cAll = new Commond()
cAll.add(c1)
cAll.add(c2)

cAll.exec()