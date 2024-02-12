import * as React from 'react';

type ScreenSize = {
  width: number;
  height: number;
};

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = React.useState<ScreenSize>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [window]);

  return screenSize;
};

export default useScreenSize;
