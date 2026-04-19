"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // 목록 불러오기
  const fetchTodos = async () => {
    const res = await fetch("/api/todo");
    const result = await res.json();
    setTodos(result.data);
  };

  // 페이지 로드 시 목록 불러오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // 저장
  const onSubmit = async () => {
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text }),
    });
    const result = await res.json();
    setTodos([...todos, ...result.data]);
    setText("");
  };

  // 수정 버튼 클릭
  const onEditStart = (todo: Todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

  // 수정 완료
  const onEditSubmit = async (id: number) => {
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: editText }),
    });
    const result = await res.json();
    console.log(result, "0");
    setTodos(todos.map((todo) => (todo.id === id ? result.data[0] : todo)));
    setEditId(null);
  };

  // 삭제
  const onDelete = async (id: number) => {
    await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-[1.5rem] font-bold">
        내용을 입력하고 저장하면 모두가 볼 수 있어요!
      </h1>
      {/* 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          className="border px-2 py-1"
          placeholder="내용을 입력하세요."
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={onSubmit} className="border px-4 py-1">
          저장
        </button>
      </div>

      {/* 목록 */}
      <ul className="flex flex-col gap-2 w-full max-w-md">
        {todos.map((todo) => {
          console.log(todo);
          return (
            <li key={todo.id} className="flex gap-2 items-center">
              {editId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    className="border px-2 py-1 flex-1"
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => onEditSubmit(todo.id)}
                    className="border px-4 py-1"
                  >
                    완료
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{todo.title}</span>
                  <button
                    type="button"
                    onClick={() => onEditStart(todo)}
                    className="border px-4 py-1"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(todo.id)}
                    className="border px-4 py-1 text-red-500"
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
