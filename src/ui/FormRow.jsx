import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const Label = styled.label`
  color: var(--color-stone-400);
  font-size: var(--font-size-xs);
`;

const Error = styled.p`
  display: inline-block;
  margin-top: 3px;
  margin-left: auto;
  color: var(--color-red-500);
  font-size: var(--font-size-xs);
  font-weight: 600;
`;

function FormRow({ htmlFor, label, error, children }) {
  return (
    <StyledFormRow>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {Error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
