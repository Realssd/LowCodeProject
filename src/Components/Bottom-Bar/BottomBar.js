import './BottomBar.css'
import BottomBarItem from "../../Universe-Component/Bottombar-Item/BottomBarItem";
import SelectStack from "../../Universe-Component/Select-Stack/SelectStack";
export default function BottomBar(props){
    return (
      <div className={'bottom-bar'}>
          <SelectStack selected={props.selected} manager={props.manager}/>
      </div>
    );
}

BottomBar.defaultProps = {
    selected : [],
    manager:null,
    total: 0
}
