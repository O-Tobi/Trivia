import { createTheme, Theme } from "@mui/material";

const theme : Theme= createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, Sans-serif',
        h1: {
            fontSize: '2.5rem',
        },
        h2: {
            fontSize: '1.25rem'
        },
        h3: {
            fontsize: '1rem'
        }
    },
    spacing: 8
});

export default theme;