class File {
    parent: Folder = null
    constructor(public name: string) { }
    scan() {
        console.log('开始扫描文件: ' + this.name);
    }
    add(){
        throw new  Error('file reject add')
    }
    remove(){
        if(!this.parent){
            return
        }
        this.parent.files = this.parent.files.filter(item=>item!==this)
    }
}
class Folder {
    public files: (File|Folder)[] = []
    public parent: Folder=null
    constructor(public name: string) { }
    add(file: File|Folder) {
        file.parent = this
        this.files.push(file)
    }
    scan() {
        console.log('开始扫描文件夹: ' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    }
    remove(){
        if(!this.parent){
            return
        }
        this.parent.files = this.parent.files.filter(item=>item!==this)
    }
}

var folder = new Folder('学习资料');
var folder1 = new Folder('js');
var folder2 = new Folder('vue');
var file1 = new File('JavaScript 设计模式与开发实践');
var file2 = new File('深入浅出 vuejs');
var file3 = new File('重构与模式')
folder1.add(file1);
folder2.add(file2);
folder.add(folder1);
folder.add(folder2);
folder.add(file3);
file3.remove()
folder.scan();

// function getFile(name){
//     // {name:'JavaScript 设计模式与开发实践',scan(){console.log('开始扫描文件: ' + this.name)}}
//     return {name,scan(){console.log('开始扫描文件: ' + this.name)}}
// }
// var folder = new Folder('学习资料');
// var folder1 = new Folder( 'JavaScript' );
// var folder2 = new Folder ( 'jQuery' );
// var file1 = getFile('JavaScript 设计模式与开发实践')
// var file2 =getFile('精通 jQuery')
// var file3 =getFile('重构与模式')
// folder1.add( file1 );
// folder2.add( file2 );
// folder.add( folder1 );
// folder.add( folder2 );
// folder.add( file3 );
// folder.scan();

export { }