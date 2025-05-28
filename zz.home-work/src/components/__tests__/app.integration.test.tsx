import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('Todo 통합 테스트', () => {
  it('할 일 추가, 완료, 삭제까지 전체 흐름이 동작한다.', () => {
    render(<App />);

    // 1. 입력창에 할 일 입력 
    fireEvent.change(screen.getByLabelText('New Todo'), {
      target: { value: '통합 테스트 할 일' },
    });

    // 2. 날짜 입력
    fireEvent.change(screen.getByLabelText('Deadline'), {
      target: { value: '2024-06-01' },
    });

    // 3. 추가 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));

    // 4. 목록에 추가 확인
    expect(screen.getByText('통합 테스트 할 일')).toBeInTheDocument();

    // 5. 체크박스 클릭(완료)
    fireEvent.click(screen.getByRole('checkbox'));

    // 6. 취소선 확인
    expect(screen.getByText('통합 테스트 할 일').parentElement).toHaveStyle(
      'text-decoration: line-through'
    );

    // 7. 삭제 버튼 클릭
    fireEvent.click(screen.getByLabelText('delete'));

    // 8. 목록에서 사라짐 확인
    expect(screen.queryByText('통합 테스트 할 일')).not.toBeInTheDocument();
  });
});
