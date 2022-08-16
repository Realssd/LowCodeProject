import React from "react";
import './AddStyle.css'

export default class AddStyle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key:'AttributeName',
            value:'Value'
        }
    }

    render() {
        return(
            <div className={'add-style-item'}>

                <input
                    className={'add-style-key-input'} type={'text'}
                    value={this.state.key}
                    onChange={(event)=>this.setState({key:event.target.value})}
                />:
                <input
                    className={'add-style-value-input'} type={'text'}
                    value={this.state.value}
                    onChange={(event)=>this.setState({value:event.target.value})}
                />
                <div className={'add-style'} onClick={(event)=>{
                    if(this.state.value==='undefined'){
                        return;
                    }
                    this.props.manager.modifyInstanceStyle(
                        this.props.instance,
                        this.state.key,
                        this.state.value
                    )
                    this.setState({
                        key:'AttributeName',
                        value:'Value'
                    })
                }}>+</div>
            </div>
        );
    }

}
