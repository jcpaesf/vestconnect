import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

import {
    Container
} from './styles';

interface Props {
    numPages: number;
}

const Login: React.FC = () => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: Props) {
        setNumPages(numPages);
    }

    function changePage(offset: any) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <Container>
            <Document
                file='./PrivacyPolicy.pdf'
                options={{ workerSrc: "pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div>
                <p>
                    Página {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
                </p>
                <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                    Anterior
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Próximo
                </button>
            </div>
        </Container>
    );
}

export default Login;