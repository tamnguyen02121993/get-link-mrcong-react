import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScrollTop, Loading } from "./components"
import { isLoadingSelector } from "./store/slices/mrcongSlice"

function App() {
  const isLoading = useSelector(isLoadingSelector);


  return (
    <div className="container mx-auto bg-white pt-16 pb-4 min-h-screen flex flex-col">
      <h1 className="text-center capitalize text-4xl py-4 px-8 mx-auto font-medium border border-primary border-dashed rounded-2xl inline-block text-primary">Tool get link from site MrCong</h1>
      <Outlet />
      <h3 className="text-center capitalize text-2xl py-4 px-4 mx-auto mt-auto mb-16 lg:mb-20 xl:mb-10 font-medium inline-block text-primary">&copy; Created By
        <a href={import.meta.env.VITE_APP_GITHUB} target="_blank" className="shadow-md ml-2 bg-primary text-white px-2 py-1 rounded-lg border border-solid md:hover:bg-white md:hover:text-primary transition duration-300 md:hover:ease-out md:hover:border-primary">Tam Nguyen</a>
      </h3>
      {
        isLoading && <Loading />
      }
      <ScrollTop />
    </div>
  )
}

export default App
