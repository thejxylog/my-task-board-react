import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useLocalStorageState } from '../hooks/useLocalStorageState';

import Form from '../features/Form';
import AppLayout from '../ui/AppLayout';

function Edit() {
  const updateTask = useRef();
  const param = useParams();
  const isUpdateSession = Boolean(param.id);

  const [tasks, _] = useLocalStorageState([], 'tasks');

  useEffect(
    function () {
      if (isUpdateSession)
        updateTask.current = JSON.parse(tasks)?.filter(
          task => task.id === +param.id
        );
    },
    [isUpdateSession, tasks, param]
  );

  return (
    <div>
      <AppLayout />
      <Form
        taskToUpdate={
          isUpdateSession
            ? JSON.parse(tasks)?.filter(task => task.id === +param.id)
            : [{}]
        }
      />
    </div>
  );
}

export default Edit;
