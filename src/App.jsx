import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useLocalStorageState } from './hooks/useLocalStorageState';
import { randomID } from './utils/helper';
import { defaultTasks } from './data/default-tasks';

import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import Edit from './pages/Edit';

function App() {
  const [userId, setUserId] = useLocalStorageState('', 'user_id');
  const [taskList, setTaskList] = useLocalStorageState([], 'tasks');

  useEffect(
    function () {
      if (!userId) setUserId(randomID());
      if (!taskList.length) setTaskList(JSON.stringify(defaultTasks));
    },
    [userId, setUserId, taskList, setTaskList]
  );

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to={`/${userId}`} />} />
          <Route path={`/${userId}`} element={<AppLayout />} />
          <Route path={`/${userId}/edit/:id`} element={<Edit />} />
          <Route path={`/${userId}/new`} element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
