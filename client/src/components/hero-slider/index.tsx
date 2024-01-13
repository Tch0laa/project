import Slider from 'react-slick';
import { HeroWrapper } from './HeroStyles';
import { settings } from '../../utils/constants';

const HeroSlider = () => {
  return (
    <HeroWrapper>
         <Slider {...settings}>
         <div>
            <img src="/img/slider1.jpeg" alt="slider1" />
          </div>
          <div>
          <img src="/img/slider2.jpg" alt="slider1" />
          </div>
          <div>
          <img src="/img/slider3.webp" alt="slider1" />
          </div>
          <div>
          <img src="/img/slider4.jpg" alt="slider1" />
          </div>
    </Slider>
    </HeroWrapper>
   
  )
}

export default HeroSlider;