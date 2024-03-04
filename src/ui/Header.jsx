import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useLocalStorageState } from '../hooks/useLocalStorageState';

const StyledHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const IconMain = styled.img``;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 16px;

  font-size: var(--font-size-xl);
  font-weight: 400;
`;

const TitleSub = styled.p``;

function Header() {
  const [userId, _] = useLocalStorageState('', 'user_id');

  return (
    <StyledHeader>
      <Link to={`/${userId}`}>
        <IconMain src="/Logo.svg" />
      </Link>
      <TitleWrap>
        <Title>
          <Link to={`/${userId}`}>
            <span>My Task Board</span>
          </Link>
          <Link to={`/${userId}/new`}>
            <img src="/Edit_duotone.svg" />
          </Link>
        </Title>
        <TitleSub>Tasks to keep organised</TitleSub>
      </TitleWrap>
    </StyledHeader>
  );
}

export default Header;
