import './SelectStack.css'

export default function SelectStack(props) {
    return (

        <div className={'stack-wrapper'}>
            已选择组件：
            {reverse(props.selected).map((item) => {
                return (
                    <div key={'selected'+item.getId()} >
                        <span onClick={() => {
                            props.manager.selectInstance(item);
                        }}>
                            {item.attributes.id === undefined ?
                                (item.attributes.className === undefined ?
                                    item.getLabel() : '.'+item.attributes.className) : '#'+item.attributes.id}
                        </span>
                    </div>
                );
            })}
        </div>
    );

}

SelectStack.defaultProps = {
    selected: [],
    manager: null
}

function reverse(array){
    if(array===null){
        return [];
    }
    let ans = [];
    for (let i = array.length-1;i>=0;i--){
        ans.push(array[i]);
    }
    return ans;
}
