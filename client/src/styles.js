import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
    main:{
        backgroundColor:"rgb(248,249,250)"
    },
    Box:{
        marginTop: "8",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttons:{
        backgroundColor:'black',
        marginTop:"10"
    },
    paper:{
        paddingTop:"15 20"
    },
    bColor:{
        backgroundColor:"lightBlue",
        minHeight:"100vh",
        justifyContent:"center",
        textAlign:"center"
    },
    pp:{
        paddingLeft:"25px"
    }
})

export default useStyles;