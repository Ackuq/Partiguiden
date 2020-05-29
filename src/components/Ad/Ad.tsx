import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<any>;
  }
}

const enableAd = process.env.NODE_ENV === 'production' && process.env.ENABLE_ADS === 'true';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAd) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return enableAd ? (
    <div className="ad" style={{ textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3248338512924345"
        data-ad-slot="6515707043"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  ) : (
    <></>
  );
};

export default Ad;
