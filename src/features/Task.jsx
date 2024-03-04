import styled from 'styled-components';

import { defaultTasks } from '../data/default-tasks';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

import TaskItem from './TaskItem';
import TaskLink from '../ui/TaskLink';

const StyledTask = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Task() {
  let taskList;
  const [tasks, _] = useLocalStorageState([], 'tasks');

  if (!tasks?.length) taskList = defaultTasks;
  else taskList = JSON.parse(tasks);

  return (
    <StyledTask>
      {taskList.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
      <li>
        <TaskLink type="link" />
      </li>
    </StyledTask>
  );
}

export default Task;
