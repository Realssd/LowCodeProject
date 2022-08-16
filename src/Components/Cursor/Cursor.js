import React from "react";
import './Cursor.css'
export default class Cursor extends React.Component{
    render() {
        return(
            <div id={'cursor'} >
                {this.props.instance===null?null: this.props.instance.render(this.props.manager,0,0)}
            </div>
        );
    }
}
