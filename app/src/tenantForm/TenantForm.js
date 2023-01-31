import * as Yup from 'yup';
import { Calendar, Input, PriceInput } from '../common/forms';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FeedbackAnimation from '../common/animations';
import { PropTypes } from 'prop-types';
import services from '../services';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

const InputRow = styled.div`
  display: flex;
  flex: 1;
  gap: 0.5rem;

  flex-direction: column;
  align-items: stretch;

  @media ${props => props.theme.device.md} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const InputElementWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  input {
    width: 100%;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const validationSchema = (t) => Yup.object({
  name: Yup.string()
    .required(t('TenantForm.validation.tenantNameRequired')),
  price: Yup.number().nullable(),
  startDate: Yup.date().nullable(),
  endDate: Yup.date().nullable(),
});

const defaultFormValues = {
  name: '',
  startDate: '',
  endDate: '',
  price: 0,
};

const TenantForm = ({ listingId }) => {
  const { t } = useTranslation();

  const [tenant, setTenant] = useState(defaultFormValues);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data,
  } = useQuery(
    ['listing', listingId],
    () => services.getOneUserListingWithTenant(listingId),
  );

  useEffect(() => {
    if (!data || !data.tenant) {
      return;
    }

    setTenant(data.tenant);
  }, [data]);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: {
      errors,
      isValid,
      isDirty,
    },
  } = useForm({
    mode: 'onChange',
    delayError: 500,
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema(t))
  });

  // Set the values to the fetched ones (in case the tenant already exists)
  useEffect(() => {
    setValue('name', tenant.name);
    setValue('listingId', listingId);
  }, [tenant, listingId, setValue]);

  const createNewTenantMutation = useMutation({
    mutationFn: (listing) => {
      return services.createNewTenant(listing);
    }
  });

  const handleOnError = (error) => {
    toast(error?.response?.data?.error || 'Unhandled error');
  };

  const onSubmit = (values) => {
    // Trigger a POST to save the new tenancy
    createNewTenantMutation.mutate(values, {
      onSuccess: async (data) => {
        setTenant(data);
        await queryClient.invalidateQueries(['listings']);
        await queryClient.invalidateQueries(['listing', data.id]);
      },
      onError: (error) => handleOnError(error)
    });
  };

  const onError = (error) => handleOnError(error);

  if (isLoading || isError) {
    return;
  }

  return (
    <>
      <h3>{t('TenantForm.updateTenantInfo')}</h3>
      <div>
        {createNewTenantMutation.isLoading
          ?
          <FeedbackAnimation feedbackType="loading" />
          :
          <FormWrapper onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <InputRow>
                <InputElementWrapper>
                  <Input
                    name="name"
                    type="text"
                    label={t('TenantForm.tenantName')}
                    placeholder={t('TenantForm.name')}
                    errors={errors}
                    schema={validationSchema(t)}
                    register={register}
                  />
                </InputElementWrapper>
                <InputElementWrapper>
                  <PriceInput
                    name="price"
                    label={t('TenantForm.price')}
                    control={control}
                    initialValue={tenant.price}
                    setValue={setValue}
                    schema={validationSchema(t)}
                    errors={errors}
                  />
                </InputElementWrapper>
              </InputRow>
              <InputRow>
                <InputElementWrapper>
                  <Calendar
                    name="startDate"
                    label={t('TenantForm.contractStart')}
                    control={control}
                    initialValue={tenant.startDate}
                    setValue={setValue}
                    schema={validationSchema(t)}
                    errors={errors}
                  />
                </InputElementWrapper>
                <InputElementWrapper>
                  <Calendar
                    name="endDate"
                    label={t('TenantForm.contractEnd')}
                    control={control}
                    initialValue={tenant.endDate}
                    setValue={setValue}
                    schema={validationSchema(t)}
                    errors={errors}
                  />
                </InputElementWrapper>
              </InputRow>
            </div>
            <input type="hidden" name="listingId" />
            <button type="submit" disabled={!isValid || !isDirty || createNewTenantMutation.isLoading}>
              {tenant.name ? t('TenantForm.update') : t('TenantForm.add')}
            </button>
          </FormWrapper>
        }
      </div>
    </>
  );
};

const Tenant = {
  name: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  price: PropTypes.number,
};

TenantForm.propTypes = {
  tenant: PropTypes.shape(Tenant),
  listingId: PropTypes.string,
};

export default TenantForm;
