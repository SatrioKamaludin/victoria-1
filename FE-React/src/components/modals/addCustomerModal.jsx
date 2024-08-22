import { Button, Center, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react"
import { CheckCircleIcon } from "@chakra-ui/icons";

const AddCustomerModal = ({
    isOpen,
    onClose,
    onAddSuccess,
    addCustomerAPI,
    modalTitle = "Add New Customer",
    confirmButtonText = "Add"
}) => {
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [kota, setKota] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const isFormValid = nama != "" && alamat != "" && kota != "";

    const toast = useToast();

    const handleAddCustomer = async () => {
        setIsLoading(true);
        try {
            const response = await addCustomerAPI(nama, alamat, kota);

            if (response && response.status === 201 && response.data.message) {
                setResponseMessage(response.data.message);
                setIsSubmitted(true);
                onAddSuccess();
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || "Failed to add customer. Please try again.",
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
                        <ModalHeader>{modalTitle}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id="nama" isRequired mb={4}>
                                <FormLabel>Nama</FormLabel>
                                <Input
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="alamat" isRequired mb={4}>
                                <FormLabel>Alamat</FormLabel>
                                <Input
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="kota" isRequired mb={4}>
                                <FormLabel>Kota</FormLabel>
                                <Input
                                    value={kota}
                                    onChange={(e) => setKota(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter gap={3} display={"flex"} justifyContent={"center"}>
                            <Button
                                onClick={handleAddCustomer}
                                isDisabled={!isFormValid || isLoading}
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

export default AddCustomerModal;