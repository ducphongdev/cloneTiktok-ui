// import { useEffect, useMemo, useState } from 'react';

// const useElementOnScreen = (options, targetRef) => {
//   const [isVisibile, setIsVisible] = useState();

//   const callbackFunction = (entries) => {
//     const [entry] = entries; //const entry = entries[0]

//     setIsVisible(entry.isIntersecting);
//   };

//   const optionsMemo = useMemo(() => {
//     return options;
//   }, [options]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(callbackFunction, optionsMemo);
//     const currentTarget = targetRef.current;
//     if (currentTarget) observer.observe(currentTarget);

//     return () => {
//       if (currentTarget) observer.unobserve(currentTarget);
//     };
//   }, [targetRef, optionsMemo]);

//   return isVisibile;
// };

// export default useElementOnScreen;
import { useState, useEffect, useRef } from 'react';

const useElementOnScreen = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Hủy observer khi component unmount
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
};

export default useElementOnScreen;
