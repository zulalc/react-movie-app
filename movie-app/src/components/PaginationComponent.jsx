import PropTypes from "prop-types";
import { Button, Flex, Text } from "@chakra-ui/react";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex gap={"2"} alignItems={"center"}>
      <Flex gap={"2"} maxW={"250px"} my={"10"}>
        <Button
          colorScheme="blue"
          variant={"outline"}
          onClick={() => setActivePage(activePage - activePage + 1)}
          isDisabled={activePage === 1}
        >
          First
        </Button>
        <Button
          onClick={() => setActivePage(activePage - 1)}
          isDisabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setActivePage(activePage + 1)}
          isDisabled={activePage === 500}
        >
          Next
        </Button>
        <Button
          colorScheme="blue"
          variant={"outline"}
          onClick={() => setActivePage(totalPages)}
          isDisabled={activePage === totalPages}
        >
          Last
        </Button>
      </Flex>
      <Flex gap={"1"}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default PaginationComponent;
