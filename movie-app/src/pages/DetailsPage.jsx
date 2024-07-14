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
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  ratingToPercentage,
  resolveRatingColor,
  minToHours,
} from "../utils/helpers";
import imageSrc from "../assets/person.jpg";
import VideoComponent from "../components/VideoComponent";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState({});
  const [crew, setCrew] = useState({});
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  //Dealing with multiple API requests/promises
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]); //array of promises

        //set details
        setDetails(detailsData);
        //set cast
        setCast(creditsData?.cast?.slice(0, 10));
        //set crew
        setCrew(creditsData?.crew?.slice(0, 3));
        //set video and videos
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 5);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);
  console.log(details, "details");
  console.log(video, videos, "videos");
  console.log(crew, "crew");
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
                  {type === "movie" && (
                    <>
                      <Flex alignItems={"center"}>
                        <TimeIcon mr={"2"} ml={"5"} color={"gray.400"} />
                        <Text fontSize={"sm"}>
                          {" "}
                          {minToHours(details?.runtime)}
                        </Text>
                      </Flex>
                    </>
                  )}

                  {type === "tv" && (
                    <>
                      <Flex alignItems={"center"}>
                        <TimeIcon mr={"2"} ml={"2"} color={"gray.400"} />
                        <Text
                          fontSize={"sm"}
                          /*src={
                            details?.number_of_seasons === "1"
                              ? `season`
                              : `seasons`
                          }*/
                        >
                          Season(s): {details?.number_of_seasons} • Episodes:{" "}
                          {details?.number_of_episodes}
                        </Text>
                      </Flex>
                    </>
                  )}
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

              <Flex mt={"5"} mb={"10"} gap={"5"}>
                {crew?.length === 0 && <Text> No crew found</Text>}

                {crew &&
                  crew?.map((item) => (
                    <Box key={item?.credit_id} minW={"100px"}>
                      <Text>{item?.name}</Text>
                      <Text fontSize={"smaller"} color={"gray.400"}>
                        {item?.job}
                      </Text>
                    </Box>
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
              <Box key={item?.id} minW={"150px"} height={"290px"}>
                <Image
                  width={"100%"}
                  maxW={"150px"}
                  borderRadius={"3"}
                  src={
                    item?.profile_path
                      ? `${imagePath}/${item?.profile_path}`
                      : imageSrc
                  }
                  alt={item?.name || "No profile"}
                />
                <Text>{item?.name}</Text>
                <Text width={"150px"} fontSize={"smaller"} color={"gray.400"}>
                  {item?.character}
                </Text>
              </Box>
            ))}
        </Flex>

        <Heading
          as={"h2"}
          fontSize={"md"}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
        >
          Videos
        </Heading>
        <VideoComponent id={video?.key} />
        <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
          {videos &&
            videos?.map((item) => (
              <Box key={item?.id} minW={"290px"}>
                <VideoComponent id={item?.key} small />
                <Text fontSize={"sm"} fontWeight={"bold"} mt="2" noOfLines={2}>
                  {item?.name}{" "}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
