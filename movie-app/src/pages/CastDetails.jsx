import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPerson, imagePath, imagePathOriginal } from "../services/api";

const CastDetails = () => {
  const router = useParams();
  const { type, id } = router;

  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [type, id]); //dependency array at the end

  console.log(person, "person");
  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }

  const title = person?.also_known_as || person?.birthday;

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
              src={`${imagePath}/${person?.profile_path}`}
            />
            <Box>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {person?.biography}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default CastDetails;
