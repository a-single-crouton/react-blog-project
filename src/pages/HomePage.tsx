import Carousel from '../components/Carousel/Carousel';
import type { EmblaOptionsType } from 'embla-carousel';
import Header from '../components/Carousel/CarouselHeader';
import Footer from '../components/Carousel/CarouselFooter';
import '../components/Carousel/embla-styles.css';

const HomePage = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <>
      <Header />
      <Carousel slides={SLIDES} options={OPTIONS} />
      <Footer />
      <p>Homepage works!</p>
      {/* <div className='home-page-grid'>
        <div className='home-column-one'>column-one</div>
        <div className='home-column-two'></div>
        <div className='home-column-three'>column-three</div>
      </div> */}
    </>
  );
};

export default HomePage;
