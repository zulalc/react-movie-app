import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const styles = {};

const theme = extendTheme({ config });

export default theme;
