import * as Yup from 'yup';
import { Checkbox, Input, Select } from '../common/forms';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddressInfo from './AddressInfo';
import FeedbackAnimation from '../common/animations';
import { OuterListingFormWrapper as FormSectionWrapper } from '../common/forms/FormWrapper';
import { LISTING_TYPES } from '../listing';
import { MIN_ADDRESS_LENGTH } from './hooks';
import services from '../services';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const validationSchema = (t) => Yup.object({
  address: Yup.string()
    .min(5, t('listingForm.validation.minChars', { chars: MIN_ADDRESS_LENGTH }))
    .required(t('listingForm.validation.required')),
  addressId: Yup.string()
    .required(t('listingForm.validation.addressNotSelected')),
  acceptedAddress: Yup.boolean()
    .required(t('listingForm.validation.required'))
    .oneOf([true], t('listingForm.validation.acceptAddress')),
  type: Yup.string()
    .oneOf(
      Object.keys(LISTING_TYPES),
      t('listingForm.validation.invalidType')
    )
    .required(t('listingForm.validation.required')),
  title: Yup.string().required(t('listingForm.validation.required')),
  size: Yup.number().min(0).max(1000),
  rooms: Yup.number().min(0).max(20),
  tenant: Yup.object(),
});

const defaultFormValues = {
  address: '',
  addressId: '',
  acceptedAddress: false,
  type: '',
  title: '',
  size: 0,
  rooms: 0,
  tenant: {},
  addressDetails: '',
};

const ListingForm = () => {
  const [listingType, setListingType] = useState(defaultFormValues.type);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createNewListingMutation = useMutation({
    mutationFn: (listing) => {
      return services.createNewListing(listing);
    }
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: {
      errors,
      isSubmitSuccessful,
    },
  } = useForm({
    mode: 'onChange',
    delayError: 500,
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema(t))
  });

  const watchType = watch('type', '');

  useEffect(() => {
    setListingType(watchType);
  }, [watchType]);

  const onSubmit = (data) => {
    // Trigger a POST to save the new tenancy
    createNewListingMutation.mutate(data, {
      onSuccess: async (data) => {
        toast(t('listingForm.success'));
        if (isSubmitSuccessful) {
          reset(defaultFormValues);
        }

        // Invalidate query for a list of listings (return needed so it waits until the invalidation is done)
        await queryClient.invalidateQueries(['listings']);
        navigate(`/listing/${data.id}`);
      }
    });
  };

  const onError = () => {
    toast(t('listingForm.fail'));
  };

  return (
    <FormSectionWrapper className={listingType}>
      <FormWrapper onSubmit={handleSubmit(onSubmit, onError)}>
        {createNewListingMutation.isLoading
          ? (
            <FeedbackAnimation feedbackType="loading" />
          )
          :
          <>
            <Input
              name="title"
              label={t('listingForm.listingTitle')}
              placeholder={t('listingForm.placeholder.title')}
              errors={errors}
              schema={validationSchema(t)}
              register={register}
            />

            <Input
              name="address"
              label={t('address')}
              placeholder="Skelb??kgade 2, 2. sal, 1717 K??benhavn V"
              errors={errors}
              schema={validationSchema(t)}
              register={register}
            />

            <AddressInfo name="addressInfo" watch={watch} setValue={setValue} />
            <input type="hidden" name="addressId" />
            <input type="hidden" name="addressDetails" />

            <Select
              name="type"
              label={t('listingType')}
              errors={errors}
              schema={validationSchema(t)}
              register={register}
            >
              <option value="" key="">{t('listingType')}</option>
              {Object.keys(LISTING_TYPES).map((type) => (
                <option value={type} key={type}>{t(`type.${type}`)}</option>
              ))}
            </Select>

            <Input
              name="size"
              type="number"
              label={t('listingForm.placeholder.size')}
              errors={errors}
              schema={validationSchema(t)}
              register={register}
              min="0"
            />

            <Input
              name="rooms"
              type="number"
              label={t('listingForm.placeholder.rooms')}
              errors={errors}
              schema={validationSchema(t)}
              register={register}
              min="0"
            />

            <Checkbox
              name="acceptedAddress"
              id="accepted"
              label={t('listingForm.placeholder.rooms')}
              errors={errors}
              schema={validationSchema(t)}
              register={register}
            >
              {t('listingForm.confirmAddress')}
            </Checkbox>

            <button type="submit">{t('listingForm.create')}</button>
          </>
        }
      </FormWrapper>
    </FormSectionWrapper>
  );
};

export default ListingForm;
