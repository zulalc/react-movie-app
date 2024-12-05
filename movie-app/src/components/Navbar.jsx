import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  chakra,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const ChakraLink = chakra(RouterLink);

const Navbar = () => {
  //const { user, signInWithGoogle, logout } = useAuth();

  /*const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("error", error);
    }
  };*/

  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <ChakraLink to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color="#FF7676"
              letterSpacing={"wide"}
              fontFamily={"verdana"}
            >
              MovieApp
            </Box>
          </ChakraLink>

          {/*DESKTOP VERSION ONLY*/}
          <Flex gap="4" alignItems={"center"}>
            <ChakraLink to="/" _hover={{ color: "#FF7676" }}>
              Home
            </ChakraLink>
            <ChakraLink to="/movies" _hover={{ color: "#FF7676" }}>
              Movies
            </ChakraLink>
            <ChakraLink to="/shows" _hover={{ color: "#FF7676" }}>
              TV Shows
            </ChakraLink>
            <ChakraLink to="/search" _hover={{ color: "#FF7676" }}>
              <SearchIcon fontSize="l" />
            </ChakraLink>

            <Avatar size={"sm"} bg={"gray.700"} as={"button"} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
