import React from "react";
import './TopbarButton.css'

export default function TopBarButton(props) {
    return (
        <div className='top-bar-item' onClick={props.handleClick}>
            {props.content}
        </div>
    )
}

TopBarButton.defaultProps = {
    content:"按钮",
    handleClick: ()=>{window.alert("Click")}
};
