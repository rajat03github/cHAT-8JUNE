import { Box, Container, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import Register from "./HOME/Register";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work sans">
          Chat-Boom
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab width={"50%"} cursor={"default"}>
              Sign Up
            </Tab>
          </TabList>
          <Register />
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
