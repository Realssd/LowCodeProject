import React from "react";
import './Topbar.css'
import TopBarButton from "../../Universe-Component/Topbar-Button/TopbarButton";
export default function Topbar() {


    return (
        <div className='top-bar'>
            <TopBarButton content={'按钮1'}/>
            <TopBarButton content={'按钮2'}/>
            <TopBarButton content={'按钮3'}/>
            <TopBarButton content={'按钮4'}/>
        </div>
    );
}
