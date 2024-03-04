import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { randomID } from '../utils/helper';

import FormRow from '../ui/FormRow';

const MainForm = styled.form`
  width: 625px;
  height: calc(100dvh - 18px * 2);
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 22px;
  position: fixed;
  top: 50%;
  right: 18px;
  border-radius: 12px;
  background-color: var(--color-stone-0);
  transform: translateY(-50%);
  overflow-y: scroll;
  z-index: 99;
`;

const Background = styled.div`
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(Link)``;

const H1 = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 14px;
  border: 2px solid var(--color-stone-200);
  border-radius: 16px;

  &:focus {
    border-color: var(--color-blue-500);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 170px;
  display: block;
  padding: 14px;
  line-height: var(--line-h-m);
  border: 2px solid var(--color-stone-200);
  border-radius: 16px;

  &::placeholder {
    color: var(--color-stone-400);
  }

  &:focus {
    border-color: var(--color-blue-500);
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Icon = styled.span`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-lg);
  border-radius: 12px;

  ${props => props.active && 'background-color: var(--color-yellow-200);'}
  ${props => !props.active && 'background-color: var(--color-stone-200);'}

  cursor: pointer;
`;

const StatusWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  row-gap: 8px;
  padding: 3px;
  border: 2px solid var(--color-stone-200);
  border-radius: 16px;
  cursor: pointer;

  ${props => props.active && `border-color: var(--color-blue-500);`}

  & > span:nth-child(1) {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
  }

  & > span:nth-child(2) {
    font-weight: 500;
  }

  ${props =>
    props.status.toLowerCase() === 'in progress' &&
    `& > span:nth-child(1) {
    background-color: var(--color-yellow-500);
  }`}

  ${props =>
    props.status.toLowerCase() === 'completed' &&
    `& > span:nth-child(1) {
    background-color: var(--color-green-500);
  }`}

  ${props =>
    props.status.toLowerCase() === "won't do" &&
    `& > span:nth-child(1) {
    background-color: var(--color-red-500);
  }`}
`;

const StatusCheck = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 12px;
  border-radius: 50%;
  background-color: var(--color-blue-500);

  & > img {
    width: 16px;
    height: 16px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: auto;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    color: var(--color-stone-0);
    border-radius: 1000px;
  }
`;

const Delete = styled.button`
  background-color: var(--color-stone-400);
`;

const Save = styled.button`
  background-color: var(--color-blue-500);
`;

function Form({ taskToUpdate = [{}] }) {
  const [{ id: editId, ...editValues }] = taskToUpdate;

  const navigate = useNavigate();
  const params = useParams();
  const isUpdateSession = Boolean(params.id);

  const [_, setTasks] = useLocalStorageState([], 'tasks');
  const [userId, __] = useLocalStorageState([], 'user_id');

  const [activeIcon, setActiveIcon] = useState(() =>
    isUpdateSession ? editValues.icon : ''
  );
  const [activeStatus, setActiveStatus] = useState(() =>
    isUpdateSession ? editValues.status : ''
  );

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });

  const { errors } = formState;

  const icons = ['👨🏻‍💻', '💬', '☕️', '🏋️', '📚', '⏰'];
  const status = [
    { icon: '/Time_attack_duotone.svg', label: 'In Progress' },
    { icon: '/Done_round_duotone.svg', label: 'Completed' },
    { icon: '/close_ring_duotone.svg', label: "Won't do" },
  ];

  function onSubmit({ title, description }) {
    const newTask = {
      id: editId ? editId : randomID(),
      title,
      description,
      icon: activeIcon,
      status: activeStatus,
    };

    setTasks(cur =>
      JSON.stringify([
        ...JSON.parse(cur).filter(task => task.id !== editId),
        newTask,
      ])
    );

    setActiveIcon('');
    setActiveStatus('');
    reset();

    navigate(-1, { replace: true });
  }

  function onDelete() {
    if (editId)
      setTasks(cur =>
        JSON.stringify([...JSON.parse(cur).filter(task => task.id !== editId)])
      );

    setActiveIcon('');
    setActiveStatus('');
    reset();

    navigate(-1, { replace: true });
  }

  return (
    <>
      <MainForm onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <H1>Task details</H1>
          <CloseButton type="button" to={`/${userId}`}>
            <img src="/close_ring_duotone-1.svg" />
          </CloseButton>
        </Header>

        <FormRow
          htmlFor="title"
          label="Task name"
          error={errors?.title?.message}
        >
          <Input
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            {...register('title', { required: 'Please fill up the form' })}
          />
        </FormRow>

        <FormRow htmlFor="description" label="Description">
          <Textarea
            id="description"
            name="description"
            placeholder="Enter a short description"
            {...register('description')}
          />
        </FormRow>

        <FormRow htmlFor="icon" label="Icon">
          <IconWrap>
            {icons.map(icon => (
              <Icon
                key={icon}
                active={activeIcon === icon}
                onClick={() => setActiveIcon(cur => (cur === icon ? '' : icon))}
              >
                {icon}
              </Icon>
            ))}
          </IconWrap>
        </FormRow>

        <FormRow htmlFor="status" label="Status">
          <StatusWrap>
            {status.map(stat => (
              <Status
                key={stat.label}
                status={stat.label}
                active={activeStatus.toLowerCase() === stat.label.toLowerCase()}
                onClick={() =>
                  setActiveStatus(cur => (cur === stat.label ? '' : stat.label))
                }
              >
                <span>
                  <img src={stat.icon} />
                </span>
                <span>{stat.label}</span>
                {activeStatus === stat.label && (
                  <StatusCheck>
                    <img src="/Done_round.svg" />
                  </StatusCheck>
                )}
              </Status>
            ))}
          </StatusWrap>
        </FormRow>

        <Footer>
          <Delete type="button" onClick={onDelete}>
            <span>Delete</span>
            <span>
              <img src="/Trash.svg" />
            </span>
          </Delete>

          <Save type="submit">
            <span>Save</span>
            <span>
              <img src="/Done_round.svg" />
            </span>
          </Save>
        </Footer>
      </MainForm>
      <Background onClick={() => navigate(`/${userId}`)} />
    </>
  );
}

export default Form;
