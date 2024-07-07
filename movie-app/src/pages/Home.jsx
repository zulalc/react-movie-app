import { Container, Grid, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrending("day")
      .then((res) => {
        //promise
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Trending
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
        {data &&
          data?.map((item) => <CardComponent key={item?.id} item={item} />)}
      </Grid>
    </Container>
  );
};
export default Home;
