import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useLocalStorageState } from '../hooks/useLocalStorageState';

const StyledTaskLink = styled(Link)`
  display: flex;
  gap: 20px;
  padding: 14px 16px;
  border-radius: 14px;

  ${props => `background-color: var(--color-${props.statusColor}-200);`}

  &:active {
    outline: 3px solid var(--color-blue-500);
    outline-offset: 3px;
  }
`;

const Emoji = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-lg);
  border-radius: 12px;
  background-color: var(--color-stone-50);
`;

const TitleWrap = styled.div``;

const Title = styled.h3`
  min-height: 45px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Description = styled.p`
  display: inline-block;
  padding-bottom: 16px;
  line-height: var(--line-h-m);
`;

const Status = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  ${props => props.statusColor !== 'new' && 'margin-left: auto;'}
  ${props => `background-color: var(--color-${props.statusColor}-500)`}
`;

function TaskLink({ task = [{}], type = 'task' }) {
  const { id, statusColor, icon, title, description } = task;
  const [userId, _] = useLocalStorageState('', 'user_id');

  if (type !== 'task')
    return (
      <StyledTaskLink to={`/${userId}/new`} statusColor="new">
        <Status statusColor="new">
          <img src="/Add_round_duotone.svg" />
        </Status>
        <TitleWrap>
          <Title>Add new task</Title>
        </TitleWrap>
      </StyledTaskLink>
    );

  return (
    <StyledTaskLink to={`/${userId}/edit/${id}`} statusColor={statusColor}>
      <Emoji>{icon}</Emoji>
      <TitleWrap>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </TitleWrap>
      <Status statusColor={statusColor}>
        {statusColor === 'yellow' && <img src="/Time_attack_duotone.svg" />}
        {statusColor === 'green' && <img src="/Done_round_duotone.svg" />}
        {statusColor === 'red' && <img src="/close_ring_duotone.svg" />}
      </Status>
    </StyledTaskLink>
  );
}

export default TaskLink;
