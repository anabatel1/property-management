import LoginForm from './LoginForm';
import backgroundImage from '../assets/intro-bg.jpg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LoginPageWrapper = styled.section`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // Make the image full height
  margin: -1rem 0;
`;

const LoginWrapper = styled.section`
  background: ${props => props.theme.colors.success}ea;
  margin: 0 1rem;
  padding: 2rem;
  border-radius: 10px;

  input, button {
    width: 100%;
  }

  @media ${props => props.theme.device.md} {
    width: 40%;
  }
`;

const Description = styled.div`
  color: ${props => props.theme.colors.darkPastelGreen};
  margin-top: 0.25rem;
  line-height: 1.2rem;
`;

const Login = () => {
  const { t } = useTranslation();

  return (
    <LoginPageWrapper>
      <LoginWrapper>
        <h1>{t('login.form.welcomeBack')}</h1>
        <Description>
          {t('login.form.introText')}
        </Description>
        <LoginForm />
      </LoginWrapper>
    </LoginPageWrapper>
  );
};

export default Login;