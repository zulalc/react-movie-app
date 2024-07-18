import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPerson,
  fetchPersonMovies,
  fetchPersonShows,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import { CalendarIcon } from "@chakra-ui/icons";
import CardComponent from "../components/CardComponent";
import imageSrc from "../assets/person.jpg";

const CastDetails = () => {
  const router = useParams();
  const { type, id } = router;

  const [person, setPerson] = useState({});
  const [personShows, setPersonShows] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    setLoading(true);
    fetchPerson(type, id)
      .then((res) => {
        //promise
        setPerson(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type, id]); //dependency array at the end*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personData, personShowsData, personMoviesData] =
          await Promise.all([
            fetchPerson(type, id),
            fetchPersonShows(type, id),
            fetchPersonMovies(type, id),
          ]); //array of promises

        //set person
        setPerson(personData);
        //set shows
        setPersonShows(personShowsData);
        setPersonMovies(personMoviesData);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  console.log(person, "person");
  console.log(personShows, "personshows");
  console.log(personMovies, "personmovies");
  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }

  const title = person?.name;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${person?.profile_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "600px" }}
        py={"2"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container h={{ base: "auto", md: "500px" }} maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={"10"}
            flexDirection={{ base: "column", md: "row" }} //mobile: column tablet:row
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={
                person?.profile_path
                  ? `${imagePath}/${person?.profile_path}`
                  : imageSrc
              }
              alt={person?.name}
            />
            <Box>
              <Heading fontSize={"3xl"} mb={"2"}>
                {title}{" "}
              </Heading>

              <Flex alignItems={"center"}>
                <CalendarIcon mr={2} color={"gray.400"} />
                <Text fontSize={"m"}>
                  {new Date(person.birthday).toLocaleDateString("tr-TR")} •{" "}
                  {person?.known_for_department}
                </Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.400"}>
                  {person?.place_of_birth}
                </Text>
              </Flex>
              <Text
                fontSize={"md"}
                mb={"3"}
                mt={"4"}
                height={"300px"}
                overflowY={"scroll"}
              >
                {person?.biography}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb={"10"}>
        <Heading as={"h2"} fontSize={"m"} textTransform={"uppercase"} mt={"10"}>
          Movies
        </Heading>
        <Flex
          display={"flex"}
          flexWrap={"wrap"}
          mt={"5"}
          mb={"10"}
          height={"550px"}
          overflowX={"auto"}
          gap={"4"}
          position={"relative"}
        >
          {personMovies.cast?.length === 0 && <Text> No movies found</Text>}
          <Grid
            templateColumns={{
              //FOR RESPONSIVENESS
              base: "1fr", //size for mobile
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
              lg: "repeat(6, 1sfr)",
            }}
            gap="4"
            position={"absolute"}
          >
            {personMovies.cast &&
              personMovies.cast?.map((item, i) =>
                loading ? ( //when loading there is a possibility we don't have data so we dont use data key here
                  <Skeleton height={300} key={i} />
                ) : (
                  <CardComponent key={item?.id} item={item} type={"movie"} />
                )
              )}
          </Grid>
        </Flex>

        <Heading as={"h2"} fontSize={"m"} textTransform={"uppercase"} mt={"10"}>
          TV Shows
        </Heading>
        <Flex
          display={"flex"}
          flexWrap={"wrap"}
          mt={"5"}
          mb={"10"}
          height={"550px"}
          overflowX={"auto"}
          gap={"4"}
          position={"relative"}
        >
          {personShows.cast?.length === 0 && <Text> No TV Shows found</Text>}

          <Grid
            templateColumns={{
              //FOR RESPONSIVENESS
              base: "1fr", //size for mobile
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
              lg: "repeat(6, 1sfr)",
            }}
            gap="4"
          >
            {personShows.cast &&
              personShows.cast?.map((item, i) =>
                loading ? ( //when loading there is a possibility we don't have data so we dont use data key here
                  <Skeleton height={300} key={i} />
                ) : (
                  <CardComponent key={item?.id} item={item} type={"tv"} />
                )
              )}
          </Grid>
        </Flex>
      </Container>
    </Box>
  );
};

export default CastDetails;
