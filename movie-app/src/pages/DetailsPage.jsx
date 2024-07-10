import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetails,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon } from "@chakra-ui/icons";
import { ratingToPercentage, resolveRatingColor } from "../utils/helpers";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState({});
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    fetchDetails(type, id)
      .then((res) => {
        console.log(res, "res");
        setDetails(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [type, id]);*/

  //Dealing with multiple API requests/promises
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
        ]); //array of promises

        setDetails(detailsData);
        setCast(creditsData?.cast?.slice(0, 10));
        console.log(detailsData, "details");
        console.log(creditsData, "credit");
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
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
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {title}{" "}
                <Text as={"span"} fontWeight={"normal"} color={"gray.400"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"gray.400"} />
                  <Text fontSize={"sm"}>
                    {new Date(releaseDate).toLocaleDateString("tr-TR")} (TR)
                  </Text>
                </Flex>
              </Flex>

              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={ratingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"70px"}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"6px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {ratingToPercentage(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                <Button
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="green"
                  variant={"outline"}
                  onClick={() => console.log("click")}
                >
                  {" "}
                  In watchlist
                </Button>

                <Button
                  leftIcon={<SmallAddIcon />}
                  variant={"outline"}
                  onClick={() => console.log("click")}
                >
                  {" "}
                  Add to watchlist
                </Button>
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my={"5"}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres?.map((genre) => (
                  <Badge key={genre?.id} p="1" borderRadius={"4"}>
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb={"10"}>
        <Heading as={"h2"} fontSize={"m"} textTransform={"uppercase"} mt={"10"}>
          Cast
        </Heading>
        <Flex mt={"5"} mb={"10"} overflow={"scroll"} gap={"5"}>
          {cast?.length === 0 && <Text> No cast found</Text>}
          {cast &&
            cast?.map((item) => (
              <Box key={item?.id} minW={"150px"}>
                {console.log(cast?.profile_path === null) && (
                  <Image src={"./assets/person.jpeg"} />
                )}
                {!cast?.profile_path && (
                  <Image src={`${imagePath}/${item?.profile_path}`} />
                )}
                <Text>{item?.name}</Text>
                <Text fontSize={"smaller"} color={"gray.400"}>
                  {item?.character}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
