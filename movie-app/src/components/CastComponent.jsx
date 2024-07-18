import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import imageSrc from "../assets/person.jpg";

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
          src={
            item?.profile_path ? `${imagePath}/${item?.profile_path}` : imageSrc
          }
          alt={item?.name}
          height={"100%"}
        />
        <Text textAlign={"center"} fontSize={"sm"}>
          {item?.name}
        </Text>
        <Text textAlign={"center"} fontSize={"smaller"} fontStyle={"italic"}>
          {item?.character}
        </Text>
      </Box>
    </Link>
  );
};

export default CastComponent;
