import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { SearchIcon } from "@chakra-ui/icons";

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
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color="#FF7676"
              letterSpacing={"wide"}
              fontFamily={"verdana"}
            >
              MovieApp
            </Box>
          </Link>

          {/*DESKTOP VERSION ONLY*/}
          <Flex gap="4" alignItems={"center"}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">
              <SearchIcon fontSize={"l"} />
            </Link>

            <Avatar size={"sm"} bg={"gray.700"} as={"button"} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
