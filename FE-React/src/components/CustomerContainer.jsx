import { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { getCustomersExpress } from "../api/api";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import AddCustomerModal from "./modals/addCustomerModal";
import UpdateCustomerModal from "./modals/updateCustomerModal";
import DeleteCustomerModal from "./modals/deleteCustomerModal";
import CustomerTable from "./customerTable";

const sortOptions = {
  no: ["noAsc", "noDesc"],
  nama: ["namaAsc", "namaDesc"],
  alamat: ["alamatAsc", "alamatDesc"],
  kota: ["kotaAsc", "kotaDesc"],
};

const CustomerContainer = ({ getCustomersAPI, addCustomerAPI, updateCustomerAPI, deleteCustomerAPI, title }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("noAsc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      try {
        const response = await getCustomersAPI(
          currentPage,
          sort,
          searchQuery
        );
        setCustomers(response || []);
        setTotalPages(response.totalPages || 1);
        window.scrollTo(0, scrollPositionRef.current);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, [currentPage, sort, searchQuery]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (column) => {
    scrollPositionRef.current = window.scrollY;
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
    setSearchQuery(searchTerm.trim() || "");
    setSearchShow(true);
    setCurrentPage(1);
  };

  const handleEnterKeySearch = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const { isOpen: isAddModalOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isUpdateModalOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    onUpdateOpen();
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    onDeleteOpen();
  };

  const handleAddSuccess = () => {
    // Refresh customer list or any other actions after a successful add
  };

  const handleUpdateSuccess = () => {
    // Refresh customer list or any other actions after a successful update
  };

  const handleDeleteSuccess = () => {
    // Refresh customer list or any other actions after a successful delete
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Box p={5} overflowX={"auto"} pt="10px" display={"flex"} flexDir={"column"}  alignItems={"center"}>
        <Box
          position="fixed"
          zIndex="999"
          bg={"white"}
          pt={12}
          pb={3}
          width={"100%"}
        >
          <Heading as="h1" size="lg" mb={5}>
            Customer List ({title})
          </Heading>
          <Box
            textAlign={"left"}
            mb={5}
            display={"inline-flex"}
          >
            <InputGroup size="md" display="table-caption">
              <Input
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleEnterKeySearch}
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
            <IconButton
              icon={<AddIcon />}
              onClick={onAddOpen}
              colorScheme="teal"
              aria-label="Add"
              size={"md"}
            />
          </Box>
        </Box>
        <CustomerTable
          customers={customers}
          sort={sort}
          handleSortChange={handleSortChange}
          getSortIcon={getSortIcon}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
        <Box
          position="fixed"
          bottom={0}
          left={0}
          width="100%"
          p={5}
          boxShadow="md"
          zIndex={1000}
          bg="white"
          textAlign="center"
          display="flex"
          justifyContent="center"
        >
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
        <AddCustomerModal
          isOpen={isAddModalOpen}
          onClose={onAddClose}
          onAddSuccess={handleAddSuccess}
          addCustomerAPI={addCustomerAPI}
        />
        <UpdateCustomerModal
          isOpen={isUpdateModalOpen}
          onClose={onUpdateClose}
          onUpdateSuccess={handleUpdateSuccess}
          customerData={selectedCustomer}
          updateCustomerAPI={updateCustomerAPI}
        />
        <DeleteCustomerModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteClose}
          onDeleteSuccess={handleDeleteSuccess}
          customerData={selectedCustomer}
          deleteCustomerAPI={deleteCustomerAPI}
        />
      </Box>
    </>
  );
};

export default CustomerContainer;
