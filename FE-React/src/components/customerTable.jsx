import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { getCustomersExpress } from "../api/api";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";

const sortOptions = {
  no: ["noAsc", "noDesc"],
  nama: ["namaAsc", "namaDesc"],
  alamat: ["alamatAsc", "alamatDesc"],
  kota: ["kotaAsc", "kotaDesc"],
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("noAsc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      try {
        const response = await getCustomersExpress(
          currentPage,
          sort,
          searchShow ? searchTerm : ""
        );
        setCustomers(response || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, [currentPage, sort, searchShow]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (column) => {
    const newSort =
      sortOptions[column].find((option) => option !== sort) ||
      sortOptions[column][0];
    setSort(newSort);
  };

  const getSortIcon = (column) => {
    if (sort === `${column}Asc`) return <ChevronUpIcon />;
    if (sort === `${column}Desc`) return <ChevronDownIcon />;
    return null;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchShow(true);
    setCurrentPage(1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box p={5} overflowX={"auto"}>
      <Heading as="h1" size="lg" mb={5}>
        Customer List (Express)
      </Heading>
      <Box textAlign={"left"} mb={5}>
        <InputGroup size="md" display="inline-block">
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            size="md"
            width="300px"
            mx="auto"
            mr={1}
          />
          <InputRightElement width="auto">
            <IconButton
              icon={<SearchIcon />}
              onClick={handleSearchClick}
              aria-label="Search"
              colorScheme="teal"
              size="sm"
              ml={-50}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box
        overflowX={"auto"}
        border={"2px"}
        borderColor={"teal.500"}
        borderRadius={"md"}
      >
        <Table variant="striped" colorScheme="teal" size="sm">
          <Thead>
            <Tr>
              <Th onClick={() => handleSortChange("no")} cursor="pointer">
                No {getSortIcon("no")}
              </Th>
              <Th onClick={() => handleSortChange("nama")} cursor="pointer">
                Nama {getSortIcon("nama")}
              </Th>
              <Th onClick={() => handleSortChange("alamat")} cursor="pointer">
                Alamat {getSortIcon("alamat")}
              </Th>
              <Th onClick={() => handleSortChange("kota")} cursor="pointer">
                Kota {getSortIcon("kota")}
              </Th>
              <Th>Created</Th>
              <Th>Updated</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => {
                const createdDate = new Date(customer.created_at);
                const updatedDate = new Date(customer.updated_at);

                const createdDateStr =
                  createdDate.toString() === "Invalid Date"
                    ? "Invalid Date"
                    : createdDate.toLocaleString();
                const updatedDateStr =
                  updatedDate.toString() === "Invalid Date"
                    ? "Invalid Date"
                    : updatedDate.toLocaleString();

                return (
                  <Tr key={index}>
                    <Td>{customer.no}</Td>
                    <Td>{customer.nama}</Td>
                    <Td>{customer.alamat}</Td>
                    <Td>{customer.kota}</Td>
                    <Td>{createdDateStr}</Td>
                    <Td>{updatedDateStr}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        aria-label="Update"
                        mr={2}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                      />
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan="7" textAlign="center">
                  <Text>No customers available</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Box mt={5} textAlign="center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          colorScheme="teal"
          mr={2}
        >
          Previous
        </Button>
        <Text display="inline" mx={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          colorScheme="teal"
          ml={2}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerTable;
