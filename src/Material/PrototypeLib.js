import Prototype from "./Protoype";

const PureText_Origin = new Prototype(
    {type: "PureText"},
    {Text: "PureText"},
    {},
    null,
    false
);

const DivText = new Prototype(
    {type: "PureText"},
    {Text: "这是一个用于布局的块,使用时可以删掉里面的文字和用于显示边界的样式"},
    {},
    null,
    false
)

const Div = new Prototype(
    <div></div>,
    {className: 'div'},
    {
        backgroundColor: '#efefef',
        color: 'red',
        border: '1px #8f8f8f solid',
        boxShadow: '0px 0px 5px 1px #5f5f5f',
        borderRadius: '5px'
    },
    [DivText]
)

const SpanText = new Prototype(
    {type: "PureText"},
    {Text: "这是一个用于布局的行内元素,使用时可以删掉里面的文字和用于显示边界的样式"},
    {},
    null,
    false
)

const Span = new Prototype(
    <span></span>,
    {},
    {
        backgroundColor: '#efefef',
        color: 'red',
        border: '1px #8f8f8f solid',
        boxShadow: '0px 0px 5px 1px #5f5f5f',
        borderRadius: '5px'
    },
    [SpanText]
)

const ButtonText = new Prototype(
    {type: "PureText"},
    {Text: "按钮"},
    {},
    null,
    false
)

const Button = new Prototype(
    <button></button>,
    {
        className: 'button',
        onMouseEnter: "event.target.style.backgroundColor='#8f8f8f'",
        onMouseLeave: "event.target.style.backgroundColor='#efefef'",
        onMouseDown: "event.target.style.backgroundColor='#5d5d5d'",
        onMouseUp: "event.target.style.backgroundColor='#8f8f8f'"
    },
    {
        backgroundColor: '#efefef',
        border: '1px #8f8f8f solid',
        borderRadius: '5px'
    },
    [ButtonText]
)

const Input_Text = new Prototype(
    <input/>,
    {
        type: 'text',
        name: "表单key",
        defaultValue: "这是一个文本框"
    },
    {
        border: '1px #8f8f8f solid',
        backgroundColor: '#efefef',
        borderRadius: '5px',
        boxShadow: '0 0 2px 2px #efefef',
        height: '20px',
        fontSize: '16px'
    },
    null,
    false
)

const RadioText = new Prototype(
    {type: "PureText"},
    {Text: "单选按钮"},
    {},
    null,
    false
)

const RadioButton = new Prototype(
    <input/>,
    {
        type: 'radio',
        name: "表单key",
        defaultChecked: '不默认标记请删除',
        onChange: ''
    },
    {},
    null,
    false
)

const RadioLabel = new Prototype(
    <label></label>,
    {},
    {},
    [RadioText]
)

const Input_Radio = new Prototype(
    <div></div>,
    {className: 'Radio'},
    {padding: '5px', border: '1px solid #8f8f8f', borderRadius: '5px'},
    [RadioButton, RadioLabel]
)

const RadioGroupTitle = new Prototype(
    <span></span>,
    {},
    {},
    [new Prototype(
        {type: "PureText"},
        {Text: "单选组"},
        {},
        null,
        false)]
)

const RadioGroup = new Prototype(
    <form></form>,
    {className: 'RadioGroup'},
    {},
    [RadioGroupTitle, Input_Radio, Input_Radio, Input_Radio]
)

const CheckBoxButton = new Prototype(
    <input/>,
    {
        type: 'checkbox',
        name: "表单key",
        defaultChecked: '不默认标记请删除',
        onChange: ''
    },
    {},
    null,
    false
)

const CheckBoxGroupTitle = new Prototype(
    <span></span>,
    {},
    {},
    [new Prototype(
        {type: "PureText"},
        {Text: "多选组"},
        {},
        null,
        false)]
)

const CheckBoxText = new Prototype(
    {type: "PureText"},
    {Text: "多选按钮"},
    {},
    null,
    false
)

const CheckBoxLabel = new Prototype(
    <label></label>,
    {},
    {},
    [CheckBoxText]
)

const Input_Checkbox = new Prototype(
    <div></div>,
    {className: 'CheckBox'},
    {padding: '5px', border: '1px solid #8f8f8f', borderRadius: '5px'},
    [CheckBoxButton, CheckBoxLabel]
)

const CheckBoxGroup = new Prototype(
    <form></form>,
    {className: 'CheckBoxGroup'},
    {},
    [CheckBoxGroupTitle, Input_Checkbox, Input_Checkbox, Input_Checkbox]
)

const ListItemText = new Prototype(
    {type: "PureText"},
    {Text: "列表项"},
    {},
    null,
    false
)

const ListItem = new Prototype(
    <li></li>,
    {},
    {},
    [ListItemText]
)

const OrderedListTitle = new Prototype(
    <span></span>,
    {},
    {margin:'0 5px 0 -35px'},
    [new Prototype(
        {type: "PureText"},
        {Text: "有序列表标题"},
        {},
        null,
        false)]
)

const UnorderedListTitle = new Prototype(
    <span></span>,
    {},
    {margin:'0 5px 0 -35px'},
    [new Prototype(
        {type: "PureText"},
        {Text: "无序列表标题"},
        {},
        null,
        false)]
)

const OrderedList = new Prototype(
    <ol></ol>,
    {},
    {border: '1px solid #8f8f8f', borderRadius: '5px'},
    [OrderedListTitle,ListItem,ListItem,ListItem]
)

const UnorderedList = new Prototype(
    <ul></ul>,
    {},
    {border: '1px solid #8f8f8f', borderRadius: '5px'},
    [UnorderedListTitle,ListItem,ListItem,ListItem]
)

const Link = new Prototype(
    <a></a>,
    {href:'#',alt:''},
    {},
    [new Prototype(
        {type: "PureText"},
        {Text: "这是一个超链接"},
        {},
        null,
        false)]
)

const Image = new Prototype(
    <img/>,
    {src:"https://s1.328888.xyz/2022/08/18/31IHi.png",alt:"图片",height:'100px',width:'200px'},
    {},
    null,
    false
)

export const Lib = {
    PureText: PureText_Origin,
    Div: Div,
    Span:Span,
    Button: Button,
    TextInput: Input_Text,
    RadioInput: Input_Radio,
    RadioGroup: RadioGroup,
    CheckBoxInput: Input_Checkbox,
    CheckBoxGroup: CheckBoxGroup,
    ListItem:ListItem,
    UnorderedList:UnorderedList,
    OrderedList:OrderedList,
    Link:Link,
    Image:Image
}

export const Root = new Prototype(
    <div></div>,
    {
        className: "root",
        id: 'root'
    },
    {
        width: '500px',
        height: '500px'
    },
    [],
    true);
