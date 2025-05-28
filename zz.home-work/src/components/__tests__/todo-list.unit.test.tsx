
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../todo-list';
import { vi } from 'vitest';

describe('TodoList 단위 테스트', () => {
  const sampleTodos = [
    {
      id: 1,
      text: '할 일 테스트',
      deadline: '2024-06-01',
      completed: false,
    },
  ];

  it('체크박스를 클릭하면 setTodos가 호출된다.', () => {
    const setTodos = vi.fn();
    render(<TodoList todos={sampleTodos} setTodos={setTodos} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(setTodos).toHaveBeenCalledTimes(1); 
  });

  it('삭제 버튼 클릭 시 setTodos가 호출된다.', () => {
    const setTodos = vi.fn();
    render(<TodoList todos={sampleTodos} setTodos={setTodos} />);
    const deleteBtn = screen.getByLabelText('delete');
    fireEvent.click(deleteBtn);
    expect(setTodos).toHaveBeenCalledTimes(1); 
  });

  it('체크된 항목은 체크박스가 true로 설정된다.', () => {
    const setTodos = vi.fn();
    const todos = [{ ...sampleTodos[0], completed: true }];
    render(<TodoList todos={todos} setTodos={setTodos} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked(); 
  });
});
