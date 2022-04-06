import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addTodo,
  completeTodos,
  removeTodos,
  updateTodos,
} from '../redux/reducer';
import TodoItem from 'TodoItem';

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodo(obj)),
    removeTodos: (id) => dispatch(removeTodos(id)),
    updateTodos: (obj) => dispatch(updateTodos(obj)),
    completeTodos: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState('active');
  return (
    <div className="displaytodos">
      <div className="buttons">
        <button onClick={() => setSort('active')}>Active</button>
        <button onClick={() => setSort('completed')}>Completed</button>
        <button onClick={() => setSort('all')}>All</button>
      </div>
      <ul>
        {props.todos.length > 0 && sort === 'active'
          ? props.todos.map((item) => {
              return (
                item.completed === false && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodos={props.removeTodos}
                    updateTodos={props.updateTodos}
                    completeTodos={props.completeTodos}
                  />
                )
              );
            })
          : null}

        {/**for completed items */}
        {props.todos.length > 0 && sort === 'completed'
          ? props.todos.map((item) => {
              return (
                item.completed === true && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodos={props.removeTodos}
                    updateTodos={props.updateTodos}
                    completeTodos={props.completeTodos}
                  />
                )
              );
            })
          : null}

        {/* for all items */}
        {props.todos.length > 0 && sort === 'all'
          ? props.todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodos={props.removeTodos}
                  updateTodos={props.updateTodos}
                  completeTodos={props.completeTodos}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
