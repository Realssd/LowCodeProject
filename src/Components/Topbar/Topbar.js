import React from "react";
import './Topbar.css'
import TopBarButton from "../../Universe-Component/Topbar-Button/TopbarButton";
export default function Topbar(props) {


    return (
        <div className='top-bar'>
            <TopBarButton content={'导出'} handleClick={()=>console.log(props.manager.instances[0].genHtml())}/>
            <TopBarButton content={'删除'} handleClick={()=>props.manager.removeInstance(props.selected)}/>
            <TopBarButton content={'上移'} handleClick={()=>props.manager.moveUp(props.selected)}/>
            <TopBarButton content={'下移'} handleClick={()=>props.manager.moveDown(props.selected)}/>
        </div>
    );
}

Topbar.defaultProps = {
    selected:null,
    manager:null
}
