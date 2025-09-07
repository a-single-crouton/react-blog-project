import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplay } from './CarouselAutoplay';
import { useAutoplayProgress } from './CarouselAutoplayProgress';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './CarouselArrowButtons';

type CarouselPost = {
  slug: string;
  title: string;
  image?: string;
};

type PropType = {
  posts: CarouselPost[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ posts, options }) => {
  const progressNode = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 4000 }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  return (
    <div className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {posts.map((p) => (
            <div className='embla__slide' key={p.slug}>
              <Link to={`/blog/${p.slug}`} className='block'>
                <div className='embla__slide__number'>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className='embla__slide__img'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      className='embla__slide__placeholder'
                      style={{ width: '100%', height: '100%' }}
                    >
                      No image
                    </div>
                  )}
                </div>
                <h3
                  className='embla__slide__title'
                  style={{ marginTop: '0.5rem', textAlign: 'center' }}
                >
                  {' '}
                  {p.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? '' : ' embla__progress--hidden'
          )}
        >
          <div className='embla__progress__bar' ref={progressNode} />
        </div>

        <button className='embla__play' onClick={toggleAutoplay} type='button'>
          {autoplayIsPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
