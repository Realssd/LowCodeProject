import React from "react";
import './AddAttr.css'

export default class AddAttr extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key:'AttributeName',
            value:'Value'
        }
    }

    render() {
        return(
            <div className={'add-attr-item'}>

                <input
                    className={'add-attr-key-input'} type={'text'}
                    value={this.state.key}
                    onChange={(event)=>this.setState({key:event.target.value})}
                />:
                <input
                    className={'add-attr-value-input'} type={'text'}
                    value={this.state.value}
                    onChange={(event)=>this.setState({value:event.target.value})}
                />
                <div className={'add-attr'} onClick={(event)=>{
                    if(this.state.value==='undefined'){
                        return;
                    }
                    this.props.manager.modifyInstanceAttr(
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
