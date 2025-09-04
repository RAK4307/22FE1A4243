// src/pages/RedirectHandler.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Spinner,
  Text,
  VStack,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";

// In a real application, this would fetch from your backend API
const fetchOriginalUrl = async (shortCode, apiUrl) => {
  console.log(`Fetching original URL for ${shortCode} from ${apiUrl}`);
  // Example: const response = await fetch(`${apiUrl}/${shortCode}`);
  // if (response.status === 404) throw new Error("Short URL not found.");
  // if (!response.ok) throw new Error("Failed to fetch URL.");
  // const data = await response.json();
  // return data.originalUrl;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shortCode === "abcdef") {
        resolve("https://chakra-ui.com/docs/components");
      } else {
        reject(new Error("Short URL not found. You will be redirected shortly."));
      }
    }, 1000);
  });
};

function RedirectHandler() {
  const { shortCode } = useParams();
  const { apiUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const performRedirect = async () => {
      if (!shortCode) {
        navigate("/");
        return;
      }

      try {
        const originalUrl = await fetchOriginalUrl(shortCode, apiUrl);
        // Perform the redirect. `replace` is better than `assign`
        // as it doesn't leave the redirector page in the session history.
        window.location.replace(originalUrl);
      } catch (err) {
        setError(err.message);
        // Redirect to home page after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    performRedirect();
    // We only want this to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Container centerContent minH="80vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4} textAlign="center">
          <Heading size="lg">Oops! Invalid Link</Heading>
          <Alert status="error" borderRadius="lg" maxW="md">
            <AlertIcon />
            {error}
          </Alert>
        </VStack>
      </Container>
    );
  }

  return (
    <Container centerContent minH="80vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4}>
        <Spinner size="xl" />
        <Text fontSize="lg">Redirecting you...</Text>
      </VStack>
    </Container>
  );
}

export default RedirectHandler;