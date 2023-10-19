window.addEventListener("DOMContentLoaded", function () {
    fetch("/todos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
      .then((res) => res.json())
      .then((todos) => {
        document.getElementById("todoList").innerHTML = todos.map((todo) => {
            return `
              <li id="${todo.id}>
                 ID: ${todo.id} <br> Name: ${todo.name}
              </li>   
            `
        }).join("")
      })
}, false);

const addNewTodo = () => {
    const name = prompt("Todo Name")
    if(name) {
        fetch("/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        })
         .then((res) => res.json())
         .then((res) => {
            if(res.success) {
                document.getElementById("todoList").innerHTML += `
                  <li id="${res.id}">
                   ID: ${res.id} Name: ${name}
                  </li>
                `
            }
         })
    }
}

const deleteTodo = () => {
    const todoId = prompt("Todo Id")
    if(!todoId) return alert("invalid todo id")
    if(parseInt(todoId)) {
        fetch(`/todos/${todoId}`, {
            method: "DELETE",
        })
         .then((res) => res.json())
         .then((res) => {
            if(res.success) {
                document.getElementById(todoId).remove()
            }
         })
    }
}

const updateTodo = () => {
    const todoId = prompt("Todo id")
    if(!todoId) return alert("invalid todo id")
    if(parseInt(todoId)) {
        const name = prompt("todo name")
        if(name) {
            fetch(`todos/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            })
             .then((res) => res.json())
             .then((res) => {
                if(res.success) {
                    document.getElementById(todoId).innerHTML = `
                    ID: ${todoId} Name: ${name}
                    `
                }
             })
        }
    }
}
