export type TResolve = (data:any)=>void
export type TReject = (data:any)=>void
export type Texec = (resolve:TResolve,reject:TReject)=>void


export enum Status  {
    success,
    fail,
    pending
}