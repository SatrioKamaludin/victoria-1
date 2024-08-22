import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box
            bg="teal.500"
            color="white"
            p={4}
            top={0}
            left={0}
            display="flex"
            position="fixed"
            width="100%"
            justifyContent={"center"}
            zIndex={1000}
        >
            <Flex justify={"center"} align={"center"} wrap={"wrap"}>
                <Button
                    variant={"link"}
                    color={"white"}
                    mx={4}
                    onClick={() => handleNavigation('/express')}
                >
                    ExpressJS
                </Button>
                <Text fontSize="xl" fontWeight="bold" mx={4}>
                    Customer Management
                </Text>
                <Button
                    variant={"link"}
                    color={"white"}
                    mx={4}
                    onClick={() => handleNavigation('/nest')}
                >
                    NestJS
                </Button>
            </Flex>
        </Box>
    );
}

export default Navbar;