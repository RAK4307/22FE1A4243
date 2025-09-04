// src/pages/Stats.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  Alert,
  AlertIcon,
  VStack,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { AppContext } from "../context/AppContext";
import { StatsTable } from "../components/StatsTable"; // Assuming you have this component

// In a real application, this would fetch from your backend API
const fetchStats = async (shortCode, apiUrl) => {
  console.log(`Fetching stats for ${shortCode} from ${apiUrl}`);
  // Example: const response = await fetch(`${apiUrl}/stats/${shortCode}`);
  // if (!response.ok) throw new Error("URL not found");
  // return response.json();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shortCode === "abcdef") {
        resolve({
          shortCode: "abcdef",
          originalUrl: "https://chakra-ui.com/docs/components",
          clicks: 1234,
          logs: [
            { timestamp: new Date().toISOString(), source: "Direct", geolocation: "N/A" },
            { timestamp: new Date(Date.now() - 3600000).toISOString(), source: "QR Code", geolocation: "N/A" },
          ],
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        });
      } else {
        reject(new Error("The requested short URL could not be found."));
      }
    }, 1000);
  });
};

function Stats() {
  const { shortCode } = useParams();
  const { apiUrl } = useContext(AppContext);
  const [stats, setStats] = useState(null);
  const cardBg = useColorModeValue("white", "gray.700");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStats(shortCode, apiUrl);
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (shortCode) {
      getStats();
    }
  }, [shortCode, apiUrl]);

  const renderContent = () => {
    if (loading) {
      return (
        <VStack justify="center" py={10}>
          <Spinner size="xl" />
          <Text mt={4}>Loading stats...</Text>
        </VStack>
      );
    }

    if (error) {
      return (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          {error}
        </Alert>
      );
    }

    if (stats) {
      return (
        <VStack spacing={8} align="stretch">
          <Box bg={cardBg} p={6} shadow="md" borderRadius="xl" w="100%">
            <Heading fontSize="2xl" mb={4}>
              Statistics for <Text as="span" color="teal.500">/{stats.shortCode}</Text>
            </Heading>
            <Text mb={6} isTruncated>
              Redirects to:{" "}
              <Link href={stats.originalUrl} isExternal color="teal.500">
                {stats.originalUrl} <Icon as={ExternalLinkIcon} mx="2px" />
              </Link>
            </Text>
            <StatGroup>
              <Stat>
                <StatLabel>Total Clicks</StatLabel>
                <StatNumber>{stats.clicks.toLocaleString()}</StatNumber>
                <StatHelpText>Since {new Date(stats.createdAt).toLocaleDateString()}</StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
          {/* Assuming you have a StatsTable component for logs */}
          {/* <StatsTable logs={stats.logs} /> */}
        </VStack>
      );
    }

    return null;
  };

  return (
    <Container maxW="container.lg" py={{ base: "8", md: "12" }}>
      <VStack spacing={8} align="stretch">
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Stats for /{shortCode}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {renderContent()}
      </VStack>
    </Container>
  );
}

export default Stats;