
export function makeResize(element: HTMLElement,callback:(offsetX: number,offsetY: number)=>void){

    // 1.聚焦监听
    function listenMouseDown(){
        console.log('开始')
        element.addEventListener('mousemove',listenMouseMove);
    }

    // 2.移动监听
    function listenMouseMove(e: MouseEvent){
        console.log('移动')
       const offsetY =  e.pageY - element.getBoundingClientRect().top;
       callback(0,offsetY)
    }

    // 清空监听
    function cleanListen(){
        console.log('结束')
        element.removeEventListener('mousemove',listenMouseMove);
        document.removeEventListener('mouseup',cleanListen);
    }

    // 开始监听
    element.addEventListener('mousedown',listenMouseDown)
    // 结束监听
    element.addEventListener('mouseup',cleanListen)
    document.addEventListener('mouseup',cleanListen)

    return cleanListen
}