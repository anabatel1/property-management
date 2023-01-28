import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FeedbackAnimation from '../common/animations';
import ListingDetailsCard from './ListingDetailsCard';
import services from '../services';
import { toast } from 'react-toastify';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Listing = () => {
  const { t } = useTranslation();

  const match = useMatch('/listing/:id');

  const id = match?.params?.id || '';

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteListingMutation = useMutation({
    mutationFn: (listingId) => {
      return services.deleteUserListing(listingId);
    }
  });

  const confirmDelete = () => deleteListingMutation.mutate(id, {
    onSuccess: async () => {
      toast(t('listingDetails.deleteSuccess'));
      // Invalidate query for a list of listings
      await queryClient.invalidateQueries(['listings']);
      navigate('/');
    },
    onError: () => {
      toast(t('listingDetails.deleteFail'));
    }
  });

  const handleDeleteButton = () => {
    confirmDialog({
      message: t('listingDetails.confirmText', { title: listing.title }),
      header: t('listingDetails.confirmation'),
      accept: () => confirmDelete(),
      acceptLabel: t('yes'),
      rejectLabel: t('no')
    });
  };

  const {
    isLoading,
    isError,
    data: listing,
  } = useQuery(
    ['listing', id],
    () => services.getOneUserListingWithTenant(id),
  );

  if (isLoading) {
    return <FeedbackAnimation feedbackType="loading" />;
  }

  if (isError) {
    return <FeedbackAnimation feedbackType="error" feedbackText={t('propertyNotFound')} />;
  }

  return (
    <>
      <ListingDetailsCard listing={listing} handleDeleteButton={handleDeleteButton} />
      <ConfirmDialog />
    </>
  );
};

export default Listing;