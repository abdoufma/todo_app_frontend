import type { Todo } from "./types";

export async function saveTodo(todo : Todo){
    const res = await fetch("/api/todos", {method : "POST", body : JSON.stringify(todo)});
    if (res.status >= 400 ){
        
    }
}