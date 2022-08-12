import './BottomBarItem.css'

export default function BottomBarItem(props) {
    return (
        <div className={'bottom-bar-item'}>
            {props.stateKey + ':' + props.value}
        </div>
    )
}

BottomBarItem.defaultProps = {
    stateKey: 'key',
    value: 'value'
}
