 class Event{
    clientList:Record<string,(null|any[])>={}
    listen(key:string,fn:Function){
        if(!this.clientList[key]){
            this.clientList[key]=[]
        }
        this.clientList[key].push(fn)
    }
    trigger(key:string,...args:any[]){
        const fns = this.clientList[key]
        if(!fns){
            return
        }
        fns.forEach(fn=>fn.apply(fn,args))
    }
    remove(key:string,fn?:Function){
        let fns = this.clientList[key]
        if(!fns){
            return
        }
        if(!fn){
            fns = null
        }else{
            fns = fns.filter(fnItem=>fnItem!==fn)
        }
    }
}
export default Event