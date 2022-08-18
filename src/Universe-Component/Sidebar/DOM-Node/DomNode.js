import './DomNode.css'
import React from "react";

const img = new Image(1, 1);
img.src = "https://s1.ax1x.com/2022/08/15/vdNkMn.png";

export default class DomNode extends React.Component {
    static defaultProps = {
        proto: null,
        layer: 0,
        index: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            showState: '-',
            drop: false
        }
    }


    render() {
        if (this.props.proto === null) {
            return null;
        } else {
            return (
                <div
                    className={'dom-container'}>
                    <li
                        draggable={true}
                        className={'dom-title' + (this.state.drop ? ' drop' : '')}
                        onClick={(event) => {
                            event.stopPropagation();
                            this.props.manager.selectSingleInstance(this.props.proto);
                        }}
                        onDragStart={(event) => {
                            event.stopPropagation();
                            event.dataTransfer.setDragImage(img, 0, 0);
                            console.log("Dom Dragging");
                            this.props.drag.setHoldInstance(this.props.proto);
                        }}
                        onDrag={(event => {
                            event.stopPropagation();
                            //console.log(event.clientX, event.clientY);
                            this.props.drag.cursorShow();
                            this.props.drag.updateCursor(event.clientX,event.clientY);
                        })}
                        onDragEnd={(event) => {
                            event.stopPropagation();
                            console.log('Instance DragEnd');
                            this.props.drag.cursorHide();
                            this.props.drag.setHoldInstance(null);
                        }}
                        onDragOver={event => {
                            event.stopPropagation();
                            event.preventDefault();

                        }}
                        onDragEnter={event => {
                            event.stopPropagation();
                            this.setState({drop: true})
                        }}

                        onDragLeave={event => {
                            event.stopPropagation();
                            this.setState({drop: false})
                        }}
                        onDrop={(event) => {
                            event.stopPropagation();
                            console.log("Drop on", this.props.proto.getLabel())
                            let instance = this.props.drag.getHoldInstance();
                            if (this.props.proto.canHasChildren) {
                                if (this.props.manager.existInstance(instance)) {
                                    delete instance.styles.position;
                                    delete instance.styles.left;
                                    delete instance.styles.top;
                                    this.props.manager.moveInstance(instance,this.props.proto);
                                } else {
                                    console.log('Add')
                                    this.props.manager.addInstance(
                                        instance,
                                        this.props.proto
                                    )
                                }
                            }
                            this.setState({drop: false})
                            this.props.drag.cursorHide();
                            this.props.drag.setHoldInstance(null);

                        }}
                    >
                        {this.props.proto.canHasChildren ? (<span onClick={(event) => {
                            event.stopPropagation();
                            this.flip();
                            console.log(this.props.proto.canHasChildren)
                        }} className={'change-icon'}>
                            {this.state.showState}
                        </span>) : (<span>
                            {' '}
                        </span>)}
                        {this.props.proto.attributes.id === undefined ?
                            (this.props.proto.attributes.className === undefined ?
                                this.props.proto.getLabel() : '.'+this.props.proto.attributes.className) : '#'+this.props.proto.attributes.id}
                    </li>
                    <div className={'dom-children'} id={'dom-children' + this.props.layer + '-' + this.props.index}>
                        {this.props.proto.getChildren() == null ? null : this.props.proto.getChildren().map(child => {
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
            this.setState({showState: '-'});
        } else {
            flipTarget.style.display = 'none';
            this.setState({showState: '+'});
        }
    }

}




