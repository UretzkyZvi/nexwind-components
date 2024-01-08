import { useState } from 'react';

const MOBILE_WIDTH = 375;
const TABLET_WIDTH = 700;
const DESKTOP_WIDTH = 1280;

const useResponsiveWidth = () => {
  const [width, setWidth] = useState(TABLET_WIDTH);

  const setMobileSize = () => setWidth(MOBILE_WIDTH);
  const setTabletSize = () => setWidth(TABLET_WIDTH);
  const setDesktopSize = () => setWidth(DESKTOP_WIDTH);

  return { width, setMobileSize, setTabletSize,setDesktopSize };
};

export default useResponsiveWidth;
