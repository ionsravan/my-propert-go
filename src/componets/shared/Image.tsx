import { useState } from "react";

const Image = ({ zoom, ...rest }: any) => {
  const [click, setClick] = useState(false);

  const setFlag = () => {
    setClick(true);
  };

  const unsetFlag = () => {
    setClick(false);
  };

  if (!zoom) return <img {...rest} />;
  else
    return (
      <>
        {click ? (
          <div onClick={unsetFlag} className="lightbox show">
            <img {...rest} className="show_image"></img>
          </div>
        ) : (
          <img {...rest} onClick={setFlag}></img>
        )}
      </>
    );
};

export default Image;
