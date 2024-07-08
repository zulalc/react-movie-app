import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        //promise
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]); //dependency array at the end

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>

        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid #9B2C2C"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px={"3"}
            py={"1"}
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "#9B2C2C" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px={"3"}
            py={"1"}
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "#9B2C2C" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

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
