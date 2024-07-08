import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import { createContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const LoadingProvider = createContext<{
  isLoadingCnx: boolean;
  setLoadingCnx: (i: boolean) => void;
}>({
  isLoadingCnx: false,
  setLoadingCnx(i) {
    i;
  },
});

const App = () => {
  const [isLoadingCnx, setLoadingCnx] = useState<boolean>(false);

  return (
    <LoadingProvider.Provider value={{ isLoadingCnx, setLoadingCnx }}>
      <RouterProvider router={route} />
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        style={{ zIndex: 1000000 }}
        spinning={isLoadingCnx}
        fullscreen
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </LoadingProvider.Provider>
  );
};
export default App;
