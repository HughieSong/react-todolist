import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreator';//使用actionCreator统一创建action
// import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionTypes';//拆分actionTypes便于排错
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    // 订阅redux更新
    store.subscribe(this.handleStoreChange);
  }
  render() {
    return (
      <div style={{ marginTop: '10px', marginLeft: '10px' }}>
        <Input
          value={this.state.inputValue}
          placeholder="todo info"
          style={{ width: '300px', marginRight: '10px' }}
          onChange={this.handleInputChange}
        />
        <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
        <List
          style={{ marginTop: '10px', width: '300px' }}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => <List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>}
        />
      </div>
    )
  }
  handleInputChange(e) {
    // const action = {
    //   // type: 'change_input_value',
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // }
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  }
  handleStoreChange() {
    console.log('store change')
    this.setState(store.getState())
  }
  handleBtnClick() {
    // const action = {
    //   // type: 'add_todo_item'
    //   type: ADD_TODO_ITEM
    // };
    const action = getAddItemAction();
    store.dispatch(action)
  }
  handleItemDelete(index) {
    console.log(index)
    // const action = {
    //   // type: 'delete_todo_item',
    //   type: DELETE_TODO_ITEM,
    //   index
    // }
    const action = getDeleteItemAction(index);
    store.dispatch(action)
  }
}

export default TodoList;