import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Text,
  useToast,
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
import VideoComponent from "../components/VideoComponent";
import CastComponent from "../components/CastComponent";
import imageSrc from "../assets/poster.jpg";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;

  //const { user } = useAuth();
  //const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
  //  useFirestore(); //custom hook
  const toast = useToast();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState({});
  const [crew, setCrew] = useState({});
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isInWatchlist, setIsInWatchlist] = useState(false);

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
        setCast(creditsData?.cast?.slice(0, 12));
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

  /*const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to watchlist",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      releaseDate: details?.first_air_date || details?.release_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    //addDocument("wathclist", data);
    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, id, data);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    if (!user) {
      //if dont have user
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    }); // id is from router (type, id)
  }, [user, id, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id); //remove it
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
    setIsInWatchlist(isSetToWatchlist);
  };*/
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
              src={
                details?.poster_path
                  ? `${imagePath}/${details?.poster_path}`
                  : imageSrc
              }
              alt={details?.name}
            />
            <Box>
              <Heading fontSize={"3xl"} color="gray.100">
                {title}{" "}
                <Text as={"span"} fontWeight={"normal"} color={"gray.100"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} color={"gray.500"} />
                  <Text fontSize={"sm"} color={"gray.100"}>
                    {new Date(releaseDate).toLocaleDateString("tr-TR")} (TR)
                  </Text>
                  {type === "movie" && (
                    <>
                      <Flex alignItems={"center"}>
                        <TimeIcon mr={"2"} ml={"5"} color={"gray.400"} />
                        <Text fontSize={"sm"} color={"gray.100"}>
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
                          color={"gray.100"}
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
                  <CircularProgressLabel fontSize={"lg"} color={"gray.100"}>
                    {ratingToPercentage(details?.vote_average)}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text
                  display={{ base: "none", md: "initial" }}
                  color={"gray.100"}
                >
                  User Score
                </Text>
                <Button
                  leftIcon={<SmallAddIcon />}
                  variant={"outline"}
                  color={"gray.100"}
                >
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
              <Heading fontSize={"xl"} mb={"3"} color={"gray.100"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"} color={"gray.100"}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres?.map((genre) => (
                  <Badge
                    key={genre?.id}
                    p="1"
                    borderRadius={"4"}
                    color="gray.100"
                    bg="gray.600"
                  >
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>

              <Flex mt={"5"} mb={"10"} gap={"5"}>
                {crew?.length === 0 && (
                  <Text color="gray.100"> No crew found</Text>
                )}

                {crew &&
                  crew?.map((item) => (
                    <Box key={item?.credit_id} minW={"100px"}>
                      <Text color="gray.100">{item?.name}</Text>
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

        <Flex
          display={"flex"}
          flexWrap={"wrap"}
          mt={"5"}
          mb={"10"}
          height={"calc(100vh - 450px)"}
          overflowY={"auto"}
          gap={"4"}
          position={"relative"}
        >
          {cast?.length === 0 && <Text> No cast found</Text>}

          <Grid
            templateColumns={{
              //FOR RESPONSIVENESS
              base: "1fr", //size for mobile
              sm: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)",
              lg: "repeat(6, 1sfr)",
            }}
            gap="4"
          >
            {cast &&
              cast?.map((item, i) =>
                loading ? ( //when loading there is a possibility we don't have data so we dont use data key here
                  <Skeleton height={300} key={i} />
                ) : (
                  <CastComponent key={item?.id} item={item} type={"person"} />
                )
              )}
          </Grid>
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
