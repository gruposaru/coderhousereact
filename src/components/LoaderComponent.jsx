import { useState, useEffect } from "react"

const LoaderComponent = () => {
    const [loading, setLoading] = useState(true)

  useEffect(()=>{
   const timer = setTimeout(()=>{
    setLoading(false);
   }, 5000)
   return () => clearTimeout(timer);
  }, [])

  return loading ? <div> Cargando todos los productos... </div> : null;
}

export default LoaderComponent