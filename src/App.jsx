import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EmailApp from "./screens/home/EmailAPp";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" index element={<EmailApp />} />
      </Routes>
    </>
  );
}

export default App;
