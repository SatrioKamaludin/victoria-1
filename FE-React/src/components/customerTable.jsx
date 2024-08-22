import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const CustomerTable = ({
    customers,
    handleSortChange,
    getSortIcon,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <Box marginTop={175}>
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
                                            onClick={() => handleEditClick(customer)}
                                            colorScheme="blue"
                                            size={{ base: 'md', md: 'sm' }}
                                            aria-label="Update"
                                            mr={2}
                                            width={{ base: '100%', md: 'auto' }}
                                        />
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            onClick={() => handleDeleteClick(customer)}
                                            colorScheme="red"
                                            size={{ base: 'md', md: 'sm' }}
                                            aria-label="Delete"
                                            width={{ base: '100%', md: 'auto' }}
                                            mt={{ base: 2, md: 0 }}
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
    )
}

export default CustomerTable;
