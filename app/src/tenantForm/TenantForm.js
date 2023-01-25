import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar } from 'primereact/calendar';
import FeedbackAnimation from '../common/animations';
import { Input } from '../common/forms';
import { InputNumber } from 'primereact/inputnumber';
import { PropTypes } from 'prop-types';
import services from '../services';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = (t) => Yup.object({
  name: Yup.string()
    .required(t('TenantForm.validation.tenantNameRequired')),
  price: Yup.number().min(1000, 'Must be minimum 1000'),
  startDate: Yup.date().required('date required'),
  endDate: Yup.date().required('date required'),
});

const defaultFormValues = {
  name: '',
  startDate: '',
  endDate: '',
  price: 0,
};

const TenantForm = ({ tenant, listingId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: {
      errors,
    },
  } = useForm({
    mode: 'onSubmit',
    delayError: 500,
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema(t))
  });

  useEffect(() => {
    setValue('startDate', tenant.startDate);
    setValue('endDate', tenant.endDate);
    setValue('price', tenant.price);
    setValue('listingId', listingId);
  }, [tenant, listingId, setValue]);

  const queryClient = useQueryClient();

  const createNewTenantMutation = useMutation({
    mutationFn: (listing) => {
      return services.createNewTenant(listing);
    }
  });

  const handleOnError = (error) => {
    toast(`error: ${JSON.stringify(error)}`);
  };

  const onSubmit = (values) => {
    // Trigger a POST to save the new tenancy
    createNewTenantMutation.mutate(values, {
      onSuccess: (data) => {
        // Invalidate query for a list of listings (return needed so it waits until the invalidation is done)
        queryClient.invalidateQueries(['listings']);
        navigate(`/listing/${data.id}`);
      },
      onError: (error) => handleOnError(error)
    });
  };

  const onError = (error) => handleOnError(error);

  return (
    <>
      <h1>{t('TenantForm.createNew')}</h1>
      <div>
        {createNewTenantMutation.isLoading
          ?
          <FeedbackAnimation feedbackType="loading" />
          :
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Input
              name="name"
              type="text"
              label={t('TenantForm.tenantName')}
              placeholder={t('TenantForm.placeholder.name')}
              errors={errors}
              schema={validationSchema(t)}
              register={register}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputNumber
                  id={field.name}
                  value={field.value}
                  label={t('TenantForm.placeholder.price')}
                  mode="currency"
                  currency="DKK"
                  locale="dk-DK"
                />
              )}
            />

            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  dateFormat="dd.mm.yy."
                  mask="01.01.2023."
                  touchUI
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  id={field.name}
                  value={field.value}
                  dateFormat="dd.mm.yy."
                  mask="01.01.2023."
                  touchUI
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />

            <input type="hidden" name="listingId" />

            <button type="submit">{t('TenantForm.add')}</button>
          </form>
        }
      </div>
    </>
  );
};

const Tenant = {
  name: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  price: PropTypes.number,
};

TenantForm.propTypes = {
  tenant: PropTypes.shape(Tenant),
  listingId: PropTypes.string,
};

export default TenantForm;
