import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Music from "./components/Music";
import Community from "./components/Community";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import FloatingNav from "./components/FloatingNav";
import IntroSplash from "./components/IntroSplash";
import OpenGraphHead from "./components/OpenGraphHead";
import { siteData } from "./data";

export default function App() {
  return (
    <div className="min-h-screen text-gray-800 font-sans selection:bg-pink-200 selection:text-pink-900">
      <OpenGraphHead />
      <IntroSplash />
      <FloatingNav />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <Community />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
