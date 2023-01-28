import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.css';
import 'react-toastify/dist/ReactToastify.css';
import 'primeicons/primeicons.css';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleExpiredToken, isExpiredToken } from './login/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { ContentWrapper } from './common/ContentWrapper';
import Footer from './footer';
import Header from './header';
import Listing from './listing';
import ListingForm from './listingForm';
import Listings from './listings';
import Login from './login';
import Theme from './theme';
import { setUser } from './reducers/userReducer';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err) => {
        if (isExpiredToken(err)) {
          handleExpiredToken({ dispatch, setUser, redirect, t, toast });
        }
      }
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        if (isExpiredToken(err)) {
          handleExpiredToken({ dispatch, setUser, redirect, t, toast });
        }
      }
    })
  });

  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Header username={user?.username} />
        {!(user?.username) ?
          <Login />
          :
          <ContentWrapper>
            <Routes>
              <Route path="/listing/:id" element={<Listing />} />
              <Route path="/" element={<Listings />} />
              {!(user?.username) && <Route path="/login" element={<Login />} />}
              <Route path="/add" element={<ListingForm />} />
            </Routes>
          </ContentWrapper>
        }
        <Footer />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
