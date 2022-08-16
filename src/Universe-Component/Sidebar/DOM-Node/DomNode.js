import './DomNode.css'
import React from "react";
const img = new Image(1,1);
img.src="https://s1.ax1x.com/2022/08/15/vdNkMn.png";

export default class DomNode extends React.Component {
    static defaultProps = {
        proto: null,
        layer: 0,
        index: 0,
    }

    constructor(props) {
        super(props);
        this.state ={
            showState:'-',
            drop:false
        }
    }


    render() {
        if (this.props.proto === null) {
            return null;
        } else {
            return (
                <div
                    className={'dom-container'} >
                    <li
                        draggable={true}
                        className={'dom-title'+(this.state.drop?' drop':'')}
                        onClick={(event) => {
                            event.stopPropagation();
                            this.props.manager.selectSingleInstance(this.props.proto);
                        }}
                        onDragStart={(event)=>{
                            event.dataTransfer.setDragImage(img,0,0);
                            console.log('Dom Node Dragging');
                            this.props.drag.setHoldInstance(this.props.proto);
                        }}
                        onDrag={(event => {
                            console.log(this.props.drag.getHoldInstance());
                        })}
                        onDragEnd={(event)=>{
                            this.props.drag.setHoldInstance(null);
                        }}
                        onDragOver={event => {
                            event.preventDefault();

                        }}
                        onDragEnter={event => {
                            event.stopPropagation();
                            this.setState({drop:true})
                        }}

                        onDragLeave={event => {
                            event.stopPropagation();
                            this.setState({drop:false})
                        }}
                        onDrop={(event)=>{

                            console.log("Drop on",this.props.proto.getLabel())
                            if(this.props.proto.canHasChildren){
                                this.props.manager.addInstance(
                                    this.props.drag.getHoldInstance(),
                                    this.props.proto
                                )
                            }
                            this.setState({drop:false})
                            this.props.drag.setHoldInstance(null);
                        }}
                    >
                        {this.props.proto.canHasChildren?(<span onClick={(event) => {
                            event.stopPropagation();
                            this.flip();
                            console.log(this.props.proto.canHasChildren)
                        }} className={'change-icon'}>
                            {this.state.showState}
                        </span>):(<span>
                            {' '}
                        </span>)}
                        {/*className={'node-label'}*/}
                        {this.props.proto.attributes.id===undefined?
                            (this.props.proto.attributes.className===undefined?
                                this.props.proto.getLabel(): this.props.proto.attributes.className):this.props.proto.attributes.id}
                    </li>
                    <div className={'dom-children'} id={'dom-children' + this.props.layer + '-' + this.props.index}>
                        {this.props.proto.getChildren()==null?null:this.props.proto.getChildren().map(child => {
                            return (
                                <DomNode
                                    key={child.getId()}
                                    proto={child}
                                    drag={this.props.drag}
                                    manager={this.props.manager}
                                    layer={this.props.layer + 1}
                                    index={this.props.proto.getChildren().lastIndexOf(child)}
                                />
                            )
                        })}
                    </div>
                </div>
            );
        }
    }
    flip() {
        let flipTarget = document.getElementById('dom-children' + this.props.layer + '-' + this.props.index);
        if (this.state.showState === '+') {
            flipTarget.style.display = 'block';
            this.setState({showState:'-'});
        } else {
            flipTarget.style.display = 'none';
            this.setState({showState:'+'});
        }
    }

}




