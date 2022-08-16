import './Sidebar.css'
export default function Sidebar(props) {

        return (
            <div className={'sidebar'}>
                <div className={'sidebar-title'}>
                    <div>{props.title}</div>
                </div>
                <div className={'sidebar-container'}>
                {props.content}
                </div>
            </div>
        );
}

Sidebar.defaultProps = {
    title: "边栏标题",
    content: []
};
