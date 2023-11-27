import React, { useEffect } from 'react';

interface props {
  url: string;
}

export const GoogleClassroomShareButton = ({ url }: props) => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.getElementsByClassName("g-sharetoclassroom")) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="g-sharetoclassroom" data-url={url} data-size="32"></div>
  );
}