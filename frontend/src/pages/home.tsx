import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="h-screen w-screen grid place-content-center background-image">
        <div className="max-md:p-5 max-md:text-center grid place-content-center space-y-4 w-[90%] mx-auto min-h-[60vh] md:min-w-[75vw] bg-white/10 shadow-lg backdrop-blur-md rounded-xl">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Welcome To MelodyVerse!
          </h1>
          <p className="max-md:px-4 ">
            Stream music of your choice to your favourite platforms.
          </p>
          <div className="flex items-center justify-start">
            <Link 
            to="/sign-in"
            >
              <Button className="inline-flex items-center justify-center gap-4 ">
                <span>Get Started</span>
                <ArrowRight strokeWidth={0.75} className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Home
