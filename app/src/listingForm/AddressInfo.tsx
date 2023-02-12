import { useEffect, useState } from 'react';
import AddressInfoCard from './AddressInfoCard';
import FeedbackAnimation from '../common/animations';
import { MIN_ADDRESS_LENGTH } from './hooks';
import { PropTypes } from 'prop-types';
import { useFetchAddress } from './hooks';
import { useTranslation } from 'react-i18next';

// Only include the findings for categories "A" and "B"
// "Category "C" means the user has inputted a very broad or non-existent address
const checkIsAddressValid = (address) => ['A', 'B'].includes(address?.kategori);

const AddressInfoHookForm = ({ watch, setValue }) => {
  const { t } = useTranslation();
  const watchAddressField = watch('address');

  const [inputAddress, setInputAddress] = useState('');

  const { isError, isLoading, validatedAddress } = useFetchAddress(inputAddress);

  // Set hidden field and a preview address values inside the form, once an address is fetched
  useEffect(() => {
    const isValidAddress = checkIsAddressValid(validatedAddress);
    const foundAddress = validatedAddress?.resultater[0]?.aktueladresse || {};

    setValue('addressId', isValidAddress ? foundAddress?.adgangsadresseid : '');
    setValue('addressDetails', {
      streetName: isValidAddress ? foundAddress?.vejnavn : '',
      houseNumber: isValidAddress ? foundAddress?.husnr : '',
      floor: isValidAddress ? foundAddress?.etage : '',
      door: isValidAddress ? foundAddress?.dør : '',
      postalCode: isValidAddress ? foundAddress?.postnr: '',
      postalCodeName: isValidAddress ? foundAddress?.postnrnavn: ''
    });
  }, [validatedAddress, setValue]);

  // If the address input was altered, change the local state that in turn triggers the useFetchAddress hook
  useEffect(() => {
    if (watchAddressField !== inputAddress) {
      setInputAddress(watchAddressField);
    }
  }, [watchAddressField, inputAddress]);

  if (watchAddressField?.length < MIN_ADDRESS_LENGTH) {
    return;
  }

  if (isLoading) {
    return <FeedbackAnimation
      feedbackType="loading"
      feedbackText={t('listingForm.addressSearch')}
      animationWidth="20rem" />;
  }

  if (isError) {
    return <FeedbackAnimation
      feedbackType="error"
      feedbackText={t('listingForm.addressWentWrong')}
      animationWidth="20rem" />;
  }

  if (!checkIsAddressValid(validatedAddress)) {
    return <FeedbackAnimation
      feedbackType="error"
      feedbackText={t('listingForm.addressNotFound')}
      animationWidth="20rem" />;
  }

  // If a valid result was found, show it to the user for the validation
  return <AddressInfoCard {...validatedAddress.resultater[0].adresse} />;
};

AddressInfoHookForm.propTypes = {
  watch: PropTypes.func,
  setValue: PropTypes.func,
};

export default AddressInfoHookForm;