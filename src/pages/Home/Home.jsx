// src/pages/Home.jsx
import React from "react";
import './Home.css' 
import { Container, Heading, Box, VStack, Text } from "@chakra-ui/react";
import UrlForm from "../../components/URLform";
import UrlTable from "../../components/URLTable";

function Home() {
  return (
    <Container maxW="container.lg" py={{ base: "12", md: "24" }}>
      <VStack spacing={{ base: "8", md: "10" }}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" fontWeight="extrabold" mb="4">
            The Simplest URL Shortener
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Enter a long URL to make it short and easy to share.
          </Text>
        </Box>
        <UrlForm />
        <UrlTable />
      </VStack>
    </Container>
  );
}

export default Home;
