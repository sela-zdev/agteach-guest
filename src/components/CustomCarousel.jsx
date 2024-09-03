import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Box,
  Button,
  Container,
  Stack,
} from '@mui/material';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { CustomCard } from './CustomCard';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const CustomCarousel = ({ data, cardVariant }) => {
  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Container>
      <Slider ref={sliderRef} {...settings}>
        {data.map((product, idx) => (
          <Box key={idx} sx={{ padding: '10px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <CustomCard dataObj={product} variant={cardVariant} />
            </motion.div>
          </Box>
        ))}
      </Slider>
      <Stack justifyContent="end" direction="row" gap>
        <Button
          size="medium"
          onClick={handlePrev}
          variant="contained"
          startIcon={<ChevronLeft />}
        />
        <Button
          size="medium"
          onClick={handleNext}
          variant="contained"
          endIcon={<ChevronRight />}
        />
      </Stack>
    </Container>
  );
};

//sample data

// const products = [
//   {
//     name: 'Grow Lights - LED or fluorescent grow lights',
//     price: '$10',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Grow Lights - LED or fluorescent grow lights',
//     price: '$15',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Grow Lights - LED or fluorescent grow lights',
//     price: '$20',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Grow Lights - LED or fluorescent grow lights',
//     price: '$25',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Grow Lights - LED or fluorescent grow lights',
//     price: '$30',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 6',
//     price: '$35',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 7',
//     price: '$40',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 8',
//     price: '$45',
//     image: 'https://via.placeholder.com/150',
//   },
// ];
// const courses = [
//   {
//     name: 'Indoor Plant Propagation Techniques',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Vertical Gardening for Urban Spaces',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Organic Indoor Plant Care and Maintenance',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Advanced Indoor Plant Lighting Strategies',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 5',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 6',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 7',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Product 8',
//     instructor: 'Emily Greene',
//     image: 'https://via.placeholder.com/150',
//   },
// ];
