import styled from 'styled-components';
import Header from './Header';
import Task from '../features/Task';

const StyledAppLayout = styled.div`
  width: 553px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Task />
    </StyledAppLayout>
  );
}

export default AppLayout;
