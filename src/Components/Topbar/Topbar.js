import React from "react";
import './Topbar.css'
import TopBarButton from "../../Universe-Component/Topbar-Button/TopbarButton";
export default function Topbar(props) {

    return (
        <div className='top-bar'>
            <div className={'top-bar-left'}>
            <TopBarButton content={'撤销'} handleClick={()=>props.ops.undo()}/>
            <TopBarButton content={'重做'} handleClick={()=>props.ops.redo()}/>
            <TopBarButton content={'删除'} handleClick={()=>props.manager.removeInstance(props.selected)}/>
            <TopBarButton content={'上移'} handleClick={()=>props.manager.moveUp(props.selected)}/>
            <TopBarButton content={'下移'} handleClick={()=>props.manager.moveDown(props.selected)}/>
            </div>
            <div className={'top-bar-right'}>
                <TopBarButton content={'预览'} handleClick={()=>{
                    const out = "<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "<meta charset=\"UTF-8\">\n" +
                        "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        `<title>${props.title}</title>\n` +
                        `<style>html{width: ${props.canvasWidth};height: ${props.canvasHeight}</style>\n`+
                        "</head>\n" +
                        "<body>" +
                        props.manager.instances[0].genHtml() +
                        "\n</body>\n" +
                        "</html>"
                    preview(out);
                }}/>
                <TopBarButton content={'导出'} handleClick={()=> {

                    const out = "<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "<meta charset=\"UTF-8\">\n" +
                        "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        `<title>${props.title}</title>\n` +
                        "</head>\n" +
                        "<body>" +
                        props.manager.instances[0].genHtml() +
                        "\n</body>\n" +
                        "</html>"
                    console.log(out)
                    exportFile(out,'ExportFile.html','text/plain')
                }
                }/>
            </div>
        </div>
    );
}

Topbar.defaultProps = {
    selected:null,
    manager:null,
    title:'title',
    ops:null
}

function exportFile(text, name, type){
    let a = document.getElementById("undefined");
    let file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.dispatchEvent(new MouseEvent('click', {'bubbles': false, 'cancelable': true}));
}

function preview(text){
    let data = new FormData();
    data.append("page",text);
    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://139.9.143.161:8080/preview");
    xhr.send(data);
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState===4){
            if(xhr.status === 200){
                let a = document.createElement("a");
                let obj = JSON.parse(xhr.responseText)
                document.body.appendChild(a);
                a.style = "display: none";
                a.target = "_blank";
                a.href = "http://139.9.143.161:8080/preview?id="+obj.id;
                a.click();
                document.body.removeChild(a);
            }else{
                window.alert("预览失败");
            }
        }
    }
}

