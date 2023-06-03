import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/Layouts/DefaultLayout';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import useLocaStorage from '~/hook/useLocaStorage';
function App() {
  const dispatch = useDispatch();
  const { getDataLocaStorage } = useLocaStorage();

  useEffect(() => {
    const accessToken = getDataLocaStorage('accessToken');
    const users = getDataLocaStorage('user');
    if (accessToken && users) {
      dispatch(loginSuccess(users));
    }
  }, []);
  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
