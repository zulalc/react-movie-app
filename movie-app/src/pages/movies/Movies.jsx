import { Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchMovies()
      .then((res) => {
        console.log(res, "res");
        setMovies(res?.results);
      })
      .catch((error) => console.log(error, "error"))
      .finally(() => setLoading(false));
  }, []);

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
    </Container>
  );
};

export default Movies;
