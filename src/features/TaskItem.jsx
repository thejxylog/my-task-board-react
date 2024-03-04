import TaskLink from '../ui/TaskLink';

function TaskItem({ task }) {
  let statusColor;
  const { status } = task;

  if (!status) statusColor = 'stone';
  if (status?.toLowerCase() === 'in progress') statusColor = 'yellow';
  if (status?.toLowerCase() === 'completed') statusColor = 'green';
  if (status?.toLowerCase() === "won't do") statusColor = 'red';

  const taskEl = { ...task, statusColor };

  return (
    <li>
      <TaskLink task={taskEl} />
    </li>
  );
}

export default TaskItem;
