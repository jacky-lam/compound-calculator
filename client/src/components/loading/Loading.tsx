import { Container } from '@chakra-ui/react';
import React from 'react';

export const Loading: React.FC<{ loading: boolean }> = ({ loading }) => {
    return (
        <Container
            position="absolute"
            width="100%"
            textAlign="center"
            backgroundColor="rgba(0,178,254,0.8)"
            opacity={loading ? 1 : 0}
            padding={2}
            transition="opacity 0.3s ease-out"
        >
            Loading...
        </Container>
    );
};
