type RemoveTail<S extends string,tail extends string> = 
S extends `${infer P}${tail}`?P:S

export let data: RemoveTail<'gogo/data/:data2','/:data2'>
let data2: RemoveTail<'gogo/data/:data2',`/${string}`>

type dd<S>=S extends `${string}:${infer Rest}`?RemoveTail<Rest,`/${string}`>:{}
let data3: dd<'/gogo/:data8/:data2'>