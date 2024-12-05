import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "gray.800",
      color: "whiteAlpha.900",
    },
  },
};

const theme = extendTheme({ config });

export default theme;
