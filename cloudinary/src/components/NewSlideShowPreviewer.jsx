import { useRef, useState, useEffect } from "react";
import axios from "axios";

const NewSlideShowPreviewer = ({ url }) => {
  const ref = useRef();
  const [retry, SetRetry] = useState(1);
  const [canView, setCanView] = useState(false);

  let loadingText = (
    <p>
      Requesting slideshow please wait...{retry} {retry > 1 ? "retries" : "retry"} so far
    </p>
  );

  useEffect(() => setCanView(false), [url]);

  return (
    <article className="slide-box">
      {canView ||
        (url && (
          <>
            <video src={url} autoPlay muted loop controls />
            {!canView && loadingText}
          </>
        ))}
    </article>
  );
};

export default NewSlideShowPreviewer;
