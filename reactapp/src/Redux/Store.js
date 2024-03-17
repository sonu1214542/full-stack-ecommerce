import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./Api/UserApi.js";
import { userReducer } from "./reducer/userReducer.js";
import { productApi } from "./Api/ProductApi.js";
import { cartReducer } from "./reducer/cartReducer.js";
import { orderApi } from "./Api/OrderApi.js";
import { WishlistApi } from "./Api/WishlistApi.js";
import { PaymentApi } from "./Api/PAymentApi.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-store",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer.reducer);

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartReducer.name]: persistedReducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [WishlistApi.reducerPath]: WishlistApi.reducer,
    [PaymentApi.reducerPath]: PaymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      WishlistApi.middleware,
      PaymentApi.middleware
    ),
});

const persistor = persistStore(store);

export { store, persistor };
