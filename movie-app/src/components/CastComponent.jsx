import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";

const CastComponent = ({ item, type }) => {
  return (
    //for details page
    <Link to={`/${type}/${item?.id}/`}>
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
          src={`${imagePath}${item?.profile_path}`}
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
          h={"33%"}
          bg={"rgba(0,0,0,0.9)"}
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"}>{item?.name}</Text>
          <Text textAlign={"center"}>{item?.character}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default CastComponent;