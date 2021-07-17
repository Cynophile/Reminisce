import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette:
    {
        common:
        {
            black: '#000',
            white: '#fff'
        },
        background: {
            paper: '#fff',
            default: '#fafafa'
        },
        primary: {
            light: 'rgba(187, 231, 244, 1)',
            main: 'rgba(148, 216, 235, 1)',
            dark: 'rgba(113, 162, 176, 1)',
            contrastText: 'rgba(0, 0, 0, 1)'
        },

        secondary: {
            light: 'rgba(237, 142, 152, 1)',
            main: 'rgba(230, 99, 113, 1)',
            dark: 'rgba(181, 78, 89, 1)',
            contrastText: '#fff'
        },

        error: {
            light: 'rgba(240, 128, 78, 1)',
            main: 'rgba(233, 97, 37, 1)',
            dark: 'rgba(209, 78, 21, 1)',
            contrastText: '#fff'
        },

        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)'
        }
    }
});
export default theme;