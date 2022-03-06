import { Container } from '@chakra-ui/react';
import React from 'react';

export const ErrorLabel: React.FC<{ message: string }> = ({ message }) => {
    return (
        <Container
            position="absolute"
            width="100%"
            textAlign="center"
            backgroundColor="#fd2f5f"
            padding={2}
            transition="opacity 0.3s ease-out"
        >
            {message}
        </Container>
    );
};
