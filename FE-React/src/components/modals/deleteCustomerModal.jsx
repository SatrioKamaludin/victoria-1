import { Button, Center, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { CheckCircleIcon } from "@chakra-ui/icons";

const DeleteCustomerModal = ({
    isOpen,
    onClose,
    onDeleteSuccess,
    customerData,
    deleteCustomerAPI,
    modalTitle = "Delete Customer",
    confirmButtonText = "Delete"
}) => {
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [kota, setKota] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [customerId, setCustomerId] = useState(null);

    const toast = useToast();

    useEffect(() => {
        if (customerData) {
            setCustomerId(customerData.no);
        }
    }, [customerData]);

    const handleDeleteCustomer = async () => {
        setIsLoading(true);
        try {
            const response = await deleteCustomerAPI(customerId);
            if (response && response.status === 200 && response.data.message) {
                setResponseMessage(response.data.message);
                setIsSubmitted(true);
                onDeleteSuccess();
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || "Failed to Delete customer. Please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setNama('');
        setAlamat('');
        setKota('');
        setIsSubmitted(false);
        setIsLoading(false);
        setResponseMessage('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                {!isSubmitted ? (
                    <>
                        <ModalHeader>{modalTitle} (ID: {customerId})</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                {`Apakah anda ingin menghapus customer ${customerId}?`}
                            </Text>
                        </ModalBody>
                        <ModalFooter gap={3} display={"flex"} justifyContent={"center"}>
                            <Button
                                onClick={handleDeleteCustomer}
                                isDisabled={isLoading}
                                colorScheme="teal"
                            >
                                {isLoading ? <Spinner size="sm" /> : confirmButtonText}
                            </Button>
                            <Button onClick={handleClose} mr={3}>Cancel</Button>
                        </ModalFooter>
                    </>
                ) : (
                    <Center flexDirection={"column"} p={6}>
                        <Icon as={CheckCircleIcon} color="teal.500" boxSize={20} />
                        <ModalHeader mt={4}>{responseMessage}</ModalHeader>
                        <Button colorScheme="teal" onClick={handleClose} mt={4}>OK</Button>
                    </Center>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteCustomerModal;