// Use the client directive for using usePathname hook.
'use client';

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/configStore';

// Component
import Header from '../Header';

const queryClient = new QueryClient();

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {pathname !== '/login' && <Header />}
            {children}
            <ReactQueryDevtools />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
};
