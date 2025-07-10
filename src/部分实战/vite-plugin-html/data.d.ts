export interface ILoaderItem {
    type?:'css'|'js',
    key:string,
    value:string|((data:any)=>string),
    tag?:HtmlTagDescriptor|((data:any)=>HtmlTagDescriptor)
}
export interface IvitePluginHtmlOptions{
    loaderList:ILoaderItem[]
    env:any
}