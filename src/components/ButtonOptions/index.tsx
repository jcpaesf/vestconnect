import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Container } from './styles';

const Button: React.FC<LinkProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        {children}
    </Container>
);

export default Button;