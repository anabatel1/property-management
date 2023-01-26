import * as Yup from 'yup';
import { Input, StyledButton } from '../common/forms';
import FeedbackAnimation from '../common/animations';
import services from '../services';
import { setUser } from '../reducers/userReducer';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = (t) => Yup.object({
  username: Yup.string()
    .min(5, t('login.form.validation.minChars', { chars: 5 }))
    .required(t('login.form.validation.required')),
  password: Yup.string()
    .required(t('login.form.validation.passwordNotEntered')),
});

const defaultFormValues = {
  username: '',
  password: ''
};

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm({
    mode: 'onSubmit',
    delayError: 500,
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema(t))
  });

  const onSubmit = (values) => {
    loginUserMutation.mutate(values, {
      onSuccess: (data) => {
        toast(t('login.loginSuccess'));
        window.localStorage.setItem('loggedInUser', JSON.stringify(data));
        dispatch(setUser(data));
        navigate('/');
      },
      onError: (error) => {
        toast(error?.response?.data?.error || t('login.loginFail'));
      }
    });
  };

  const onError = (error) => {
    toast(error?.response?.data?.error || t('login.loginFail'));
  };

  const loginUserMutation = useMutation({
    mutationFn: ({ username, password }) => {
      return services.login({ username, password });
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {loginUserMutation.isLoading
        ?
        <FeedbackAnimation
          feedbackType="loading"
          feedbackText={t('login.loggingIn')}
          animationWidth="20rem" />
        :
        <>
          <Input
            name="username"
            label={t('login.form.username')}
            errors={errors}
            schema={validationSchema(t)}
            register={register}
          />
          <Input
            name="password"
            type="password"
            label={t('login.form.password')}
            errors={errors}
            schema={validationSchema(t)}
            register={register}
          />
          <StyledButton type="submit">{t('login.form.loginButton')}</StyledButton>
        </>
      }
    </form>
  );
};

export default LoginForm;