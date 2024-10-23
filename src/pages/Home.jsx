import { useGetProductCarouselQuery } from '../services/api/productApi';
import { useGetCourseCarouselQuery } from '../services/api/courseApi';

import { Container } from '@mui/material';

import {
  MemberComponent,
  SearchBar,
  CarouselComponent,
  CoreValueComponent,
  CustomFaq,
} from '../components/index';

import search from '../assets/Home/search.png';

function HomePage() {
  const { data: productsData } = useGetProductCarouselQuery();
  const { data: coursesData } = useGetCourseCarouselQuery();

  // Assuming the data structure includes images for courses and products
  const courses = coursesData?.data || []; // Adjust based on actual structure
  const products = productsData?.data || []; // Adjust based on actual structure

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1420px',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '50px', md: '120px' },
        padding: 0,
        margin: {
          xs: 'auto auto 50px auto',
          md: '100px auto 100px auto',
        },
      }}
    >
      <SearchBar backDrop={search} />

      {courses.length > 0 && (
        <CarouselComponent data={courses} cardVariant="course">
          Most people interested in this course
        </CarouselComponent>
      )}

      <CoreValueComponent />

      {products.length > 0 && (
        <CarouselComponent data={products} cardVariant="product">
          Most people interested in this product
        </CarouselComponent>
      )}

      <MemberComponent />

      <CustomFaq />
    </Container>
  );
}

export default HomePage;
