import { createContext } from 'react';

const AppContext = createContext({
    product: {
        value: 'Notify',
        updateFunction: () => {}
    }
  });

export default AppContext;