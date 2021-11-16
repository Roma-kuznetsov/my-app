import React from "react";
import preloaderGif from "../../../assets/images/preloader.gif";

let Preloader = () => {
  return (
    <div>
      <img alt={preloaderGif} src={preloaderGif} />
    </div>
  )
}
export default Preloader;