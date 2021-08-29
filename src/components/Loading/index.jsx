import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const style = {
    loading:{
        position: "relative",
        display: "block",
        margin: "0 auto",
    },
};

const Loading = () => {
    return <CircularProgress style ={style.loading} size= {50} />
};

export default Loading;