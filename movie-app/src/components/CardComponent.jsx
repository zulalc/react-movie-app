import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";
import imageSrc from "../assets/poster.jpg";

const CardComponent = ({ item, type }) => {
  return (
    //for details page
    <Link to={`/${type}/${item?.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)x", md: "scale(1.08)" }, //scale for tablet won't change
          transition: "transform 0.2s ease-in-out", //0.2 seconds
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={
            item?.poster_path ? `${imagePath}/${item?.poster_path}` : imageSrc
          }
          alt={item?.name}
          height={"100%"}
        />
        <Box
          className="overlay"
          position={"absolute"}
          p={"2"}
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"100%"}
          bg={"rgba(0,0,0,0.9)"}
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text color={"#e5e7eb"} fontWeight="semibold" fontSize={"large"}>
            {item?.title || item?.name}
          </Text>
          <Text color="#38BDF8" fontSize={"small"}>
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={"2"}
            mt={"4"}
          >
            <StarIcon fontSize={"small"} color="#FBBF24" />
            <Text color="#FBBF24">{item.vote_average?.toFixed(1)} </Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;
