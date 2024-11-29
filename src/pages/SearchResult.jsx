import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearchProductQuery } from "../services/api/productApi";
import { useSearchCourseQuery } from "../services/api/courseApi";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import {
  SearchBar,
  SortByFilter,
  CategoryFilter,
  ContentLoading,
  ItemsLoading,
} from "../components/index";
import CustomCard from "../components/CustomCard";
import { useTranslation } from "react-i18next";

function SearchResultPage() {
  const currentLocation = useLocation().search;
  const queryParams = new URLSearchParams(currentLocation);
  const query = queryParams.get("name");
  const [coursePage, setCoursePage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const limit = 12;
  const [isNewQuery, setIsNewQuery] = useState(false);

  const [t] = useTranslation("global");

  const {
    data: courseData,
    isLoading: isCourseLoading,
    isFetching: isCourseFetching,
    isError: isCourseError,
  } = useSearchCourseQuery({ query, page: coursePage, limit });

  const {
    data: productData,
    isLoading: isProductLoading,
    isFetching: isProductFetching,
    isError: isProductError,
  } = useSearchProductQuery({ query, page: productPage, limit });

  const [category, setCategory] = useState("course");
  const [sortBy, setSortBy] = useState("newest");

  const totalCoursePages = isCourseLoading
    ? 1
    : Math.ceil(courseData?.results / limit);

  const totalProductPages = isProductLoading
    ? 1
    : Math.ceil(productData?.results / limit);

  const [filteredData, setFilteredData] = useState([]);

  const handleCategoryChange = (state) => {
    if (state !== category) setCategory(state);
  };

  const handleSortByChange = (state) => {
    if (state !== sortBy) setSortBy(state);
  };

  // Handle next page logic
  const handleNext = () => {
    if (category === "course" && coursePage < totalCoursePages) {
      setCoursePage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    } else if (category === "product" && productPage < totalProductPages) {
      setProductPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle previous page logic
  const handlePrevious = () => {
    if (category === "course" && coursePage > 1) {
      setCoursePage((prevPage) => prevPage - 1);
      window.scrollTo(0, 0);
    } else if (category === "product" && productPage > 1) {
      setProductPage((prevPage) => prevPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // For loading the first time
  useEffect(() => {
    // Reset page, data, and load more flags
    setCoursePage(1);
    setProductPage(1);
    setIsNewQuery(true);
  }, [query]);

  useEffect(() => {
    let combinedData = {
      course: [],
      product: [],
    };

    // If `isNewQuery` is true, reset the data
    if (isNewQuery) {
      if (courseData?.data) {
        combinedData.course = [...courseData.data];
      }
      if (productData?.data) {
        combinedData.product = [...productData.data];
      }
    } else {
      // If `isNewQuery` is false, retain old data
      combinedData.course = filteredData.course || [];
      combinedData.product = filteredData.product || [];
    }

    // Sorting logic based on the selected category
    const sortCallbacks = {
      newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      alphabet: (a, b) => a.name.localeCompare(b.name),
      plth: (a, b) => parseFloat(a.price) - parseFloat(b.price),
      phtl: (a, b) => parseFloat(b.price) - parseFloat(a.price),
    };

    // Sort the data
    if (category === "course") {
      combinedData.course.sort(sortCallbacks[sortBy]);
    } else {
      combinedData.product.sort(sortCallbacks[sortBy]);
    }

    // Set the filtered data based on the selected category
    setFilteredData(combinedData[category]);
  }, [
    courseData,
    productData,
    category,
    sortBy,
    isNewQuery,
    filteredData.course,
    filteredData.product,
  ]);

  if (isCourseLoading || isProductLoading || category) <ContentLoading />;

  if (isProductError || isCourseError) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        Something went wrong. please try again later!
      </Stack>
    );
  }

  const queryLength = (query.length >= 70 && "...") || "";
  const page = category === "course" ? coursePage : productPage;
  const totalPages =
    category === "course" ? totalCoursePages : totalProductPages;

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1420px",
        marginY: {
          xs: "30px",
          md: "60px",
        },
      }}
    >
      <SearchBar
        backDrop={"primary"}
        searchLabel={t("searchResult.searchLabel")}
        defaultSearchString={query}
      />

      <Stack py={3} gap={1}>
        <Typography maxWidth={500} variant="h3">
          {t("searchResult.searchResultHeader", { query, queryLength })}
        </Typography>
        {isCourseLoading && isProductLoading && (
          <ItemsLoading title={t("contentLoading.courseOrProduct")} />
        )}
        {!isCourseLoading && !isProductLoading && (
          <Typography variant="bsmr" color="dark.300">
            {t("searchResult.course")}({courseData?.results || 0}) &{" "}
            {t("searchResult.product")}({productData?.results || 0})
          </Typography>
        )}
      </Stack>

      <Grid container>
        <Grid
          sx={{
            borderRight: { xs: 0, sm: `1px solid lightgrey` },
          }}
          item
          xs={12}
          sm={3}
        >
          <Stack direction="column" gap={3} pr={3} pb={3}>
            <CategoryFilter
              category={category}
              handleChange={handleCategoryChange}
            />
            <Divider />
            <SortByFilter sortBy={sortBy} handleChange={handleSortByChange} />

            <Divider />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Stack pl={{ xs: 0, md: 3 }} gap={2} minHeight="100vh">
            <>
              <Box width="100%">
                <Grid2 container size={{ xs: 12 }} width={"100%"}>
                  {!isCourseLoading &&
                    !isProductLoading &&
                    filteredData?.length === 0 && (
                      <Typography>
                        {t("searchResult.noSearchResult")}
                      </Typography>
                    )}
                  {(isCourseFetching || isProductFetching) && <ItemsLoading />}
                  {!isCourseFetching &&
                    !isProductFetching &&
                    filteredData?.map((product, idx) => (
                      <Grid2 size={{ xs: 6, md: 4 }} key={idx}>
                        <CustomCard
                          key={idx}
                          dataObj={product}
                          variant={category}
                        />
                      </Grid2>
                    ))}
                </Grid2>
                {filteredData?.length !== 0 && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={3}
                    py={3}
                  >
                    <Button
                      variant="outlined"
                      onClick={handlePrevious} // Prevent going below page 1
                      disabled={
                        (category === "course" && coursePage === 1) ||
                        (category === "product" && productPage === 1)
                      }
                    >
                      <NavigateBeforeIcon />
                    </Button>
                    <Typography>
                      {t("searchResult.pagination", { page, totalPages })}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleNext}
                      disabled={
                        (category === "course" &&
                          coursePage === totalCoursePages) ||
                        (category === "product" &&
                          productPage === totalProductPages)
                      }
                    >
                      <NavigateNextIcon />
                    </Button>
                  </Stack>
                )}
                {/* )} */}
              </Box>
            </>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchResultPage;
