import Header from "../components/Header";
import Notes from "../components/Notes";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      <Navbar />
      <Header />
      {/* {isLoggedIn ? (
        <div className="w-full max-w-4xl mx-auto px-4 -mt-4 mb-4 text-center">
         <p className="text-gray-600 text-sm sm:text-base">
  Welcome back,{" "}
  <span className="font-medium text-primary whitespace-nowrap">
    {user?.username}
  </span>
  ! Choose a feature below to get started.
</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto px-4 -mt-4 mb-4 text-center">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Browse the home page freely.{" "}
            <span className="font-medium text-primary">Login</span> is required
            to open any feature.
          </p>
        </div>
      )} */}
      <Notes />
      <Footer />
    </div>
  );
};

export default Home;
