import './AttrItem.css'
import React from "react";
import {Lib} from "../../../Material/PrototypeLib";
export default class AttrItem extends React.Component{

    static defaultProps = {
        instance:null,
        attrName:'key',
        value:'value',
        manager: null
    };


    constructor(props) {
        super(props);
        this.state={
            value:props.value
        }
    }


    render() {
        return(
            <div className={'attr-item'}>
                <div className={'attr-info'}>
                    <span className={'attr-title'}>{this.props.attrName+':'}</span>
                    <input
                        className={'attr-input'} type={'text'}
                        value={this.state.value}
                        onChange={(event)=>this.setState({value:event.target.value})}
                        onBlur={()=>{
                            if(this.state.value==='undefined'){
                                this.props.manager.removeInstanceAttr(this.props.instance,this.props.attrName)
                            }else{
                                this.props.manager.modifyInstanceAttr(
                                    this.props.instance,
                                    this.props.attrName,
                                    this.state.value

                                );
                                console.log(Lib.div.defaultChildren)
                            }
                        }}
                    />
                </div>
                <div className={'remove-attr'} onClick={()=>{
                    this.props.manager.removeInstanceAttr(this.props.instance,this.props.attrName)
                }}>-</div>
            </div>
        );
    }


}
