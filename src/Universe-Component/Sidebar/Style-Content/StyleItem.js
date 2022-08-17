import './StyleItem.css'
import React from "react";
export default class StyleItem extends React.Component{
    static defaultProps = {
        instance:null,
        styleName:'key',
        value:'value',
        manager: null
    };

    constructor(props) {
        super(props);
        this.state = {
            value:props.value
        }
    }


    render() {
        return (
            <div className={'style-item'}>
                <div className={'style-info'}>
                    <span className={'style-title'}>{this.props.styleName + ':'}</span>
                    <input
                        className={'style-input'} type={'text'}
                        value={this.state.value}
                        onChange={(event) => this.setState({value:event.target.value})}
                        onBlur={() => {
                            if (this.state.value === 'undefined') {
                                this.props.manager.removeInstanceStyle(this.props.instance, this.props.styleName);
                                return;
                            }
                            this.props.manager.modifyInstanceStyle(
                                this.props.instance,
                                this.props.styleName,
                                this.state.value
                            );
                        }}
                    />
                </div>
                <div className={'remove-style'} onClick={() => {
                    this.props.manager.removeInstanceStyle(this.props.instance, this.props.styleName)
                }}>-
                </div>
            </div>
        );
    }
}


