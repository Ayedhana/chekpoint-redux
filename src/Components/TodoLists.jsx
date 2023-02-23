import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {editTodo, markTodoCompleted,} from "../Redux/Actions/actions";

export const TodoLists = () => {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    } 
  };


  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      if (selectedTodo.indexOf(todoId) === -1) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (e?.target?.name !== "select_all_todo" && e?.target?.checked === false) {
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);

        for (let chk of allChkbox) {
          chk.checked = true;
          let todoId = todo?.id;

          setSelectedTodo((todo) => [
            ...todo,
            todoId
          ]);
        }
      });
    }

    else if (e?.target?.name === "select_all_todo" && e?.target?.checked === false) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);
        for (let chk of allChkbox) {
          chk.checked = false;
          setSelectedTodo([]);
        }
      });
    }
  };

  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo));
  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col-xl-12 text-right">
          {selectedTodo.length > 0 && (
            <>
              <button className="btn btn-success ml-2" onClick={markCompleted}>
                Mark As Completed
              </button>
            </>
          )}
        </div>
      </div>
      <table style={{ color: "black", width:1000, paddingBatem:"20", height:100, marginTop:10}}>
        <tr>
        <td style={{width:400}}></td>
          <td style={{width:300}}>
            <button className="btn btn-primary btn-sm">filter by Done</button>
          </td>
          <td style={{width:300}}>
            <button className="btn btn-primary btn-sm">filter Not Done</button>
          </td>
          <td style={{width:300}}>
            <button className="btn btn-primary btn-sm">Reset</button>
          </td>
          <td></td>
        </tr>
      </table>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="3%">
              <input
                type={"checkbox"}
                onChange={(e) => changeEvent(e)}
                name={"select_all_todo"}
              />
            </th>
            <th width="30%">Name</th>
            <th width="42%">Description</th>
            <th width="8%">Status</th>
            <th width="20%">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos &&
            todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  <input
                    type={"checkbox"}
                    value={todo?.id}
                    onChange={(e) => changeEvent(e, todo?.id)}
                    name={`todo_${index}`}
                  />
                </td>
                <td>{todo?.title}</td>
                <td>{todo?.description}</td>
                <td>
                  <button className="btn btn-primary btn-sm">NotDone</button>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => actionClick({ todo: todo, type: "edit" })}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};