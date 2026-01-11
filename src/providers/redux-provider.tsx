// src/app/providers.tsx (Example)
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {  store } from "../redux/store";



export function ReduxProvider({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>

  );
}
