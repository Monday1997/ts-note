
class P{
  children=[]
  constructor(){}
  add(child){
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


const p1 = new P()
p1.add(go)
p1.add(swim)

const p2 = new P()
p2.add(go2)
p2.add(swim2)

const p = new P()
p.add(p1)
p.add(p2)
p.exec()