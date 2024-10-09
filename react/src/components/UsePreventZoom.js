import React, { useEffect } from 'react'

function UsePreventZoom(working = true, scrollCheck = true, keyboardCheck = true) {
    useEffect(() => {
      if(!working) return;

      const handleKeydown = (e) => {
        if (
          keyboardCheck &&
          e.ctrlKey &&
          (e.keyCode == "61" ||
            e.keyCode == "107" ||
            e.keyCode == "173" ||
            e.keyCode == "109" ||
            e.keyCode == "187" ||
            e.keyCode == "189")
        ) {
          e.preventDefault();
        }
      };
  
      const handleWheel = (e) => {
        if (scrollCheck && e.ctrlKey) {
          e.preventDefault();
        }
      };
  
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("wheel", handleWheel, { passive: false });
  
      return () => {
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("wheel", handleWheel);
      };
    }, [working, scrollCheck, keyboardCheck]);
  }

export default UsePreventZoom