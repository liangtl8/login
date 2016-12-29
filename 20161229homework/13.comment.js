/**
 * Created by SuperLi on 16/12/29.
 */

let Board = React.createClass({
    getInitialState(){
        return{text:[]}
    },
    handleClick(){
        var val=this.refs.myTxt.value;
        var newVal=this.state.text.concat(val);
        this.setState({text:newVal})
        this.refs.myTxt.value='';
    },
    // remove(event){
    //     this.state.text.filter(function (item,index) {
    //         return item.id !=event.target.parentNode.id
    //     })
    //     return this.state.text;
    // },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.text.map(function(item,index){
                                return <li className="list-group-item" id={index} key={index}>
                                    <span>{item}</span>
                                    <button className="btn btn-danger btn-xs pull-right"
                                            onClick={this.remove}>删除</button>
                                </li>
                            },this)
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input ref="myTxt" type="text" className="form-control"/>
                    <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));