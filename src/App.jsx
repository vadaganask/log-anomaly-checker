import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import HeroSection from './components/hero-section';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Section */}
      <HeroSection />
      <Toaster richColors />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
