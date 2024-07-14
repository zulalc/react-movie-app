import { Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { act, useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchMovies(activePage)
      .then((res) => {
        console.log(res, "res");
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((error) => console.log(error, "error"))
      .finally(() => setLoading(false));
  }, [activePage]);

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mb={"4"}>
        Browse Movies
      </Heading>
      <Grid
        templateColumns={{
          //FOR RESPONSIVENESS
          base: "1fr", //size for mobile
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap="4"
      >
        {movies &&
          movies?.map((item, i) =>
            loading ? ( //when loading there is a possibility we don't have data so we dont use data key here
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent key={item?.id} item={item} type={"movie"} />
            )
          )}
      </Grid>
      {/*Pagination: pages of movies*/}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
