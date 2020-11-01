import './index.scss'

import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

interface LazyLoadProps extends React.HTMLAttributes<HTMLImageElement> {
  images: {
    lowRes: string
    highRes: string
    placeholder: string
    alt: string
  }
  src?: undefined
  alt?: undefined
  aspectRatio?: number
}

const useImageLoaded = (img: HTMLImageElement | null): boolean => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    console.log('Something changed!', img)
    const handleLoad = () => {
      console.log('Loaded!')
      setLoaded(true)
    }

    img?.addEventListener('load', handleLoad)
    return () => {
      img?.removeEventListener('load', handleLoad)
    }
  }, [img])
  return loaded
}

const useObserved = (selector: string | RefObject<Element>) => {
  const [hasBeenObserved, setHasBeenObserved] = useState(false)
  const [isObserved, setIsObserved] = useState(false)

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const [observedObj] = entries
    if (observedObj.isIntersecting) {
      setIsObserved(true)
      setHasBeenObserved(true)
    } else {
      setIsObserved(false)
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
    }
    let observer = new IntersectionObserver(handleIntersect, options)

    if (typeof selector === 'string') {
      const boxElement = document.querySelector(selector)
      if (boxElement) {
        observer.observe(boxElement)
      }
    } else if (selector.current) {
      observer.observe(selector.current)
    }
  }, [selector])

  return { isObserved, hasBeenObserved }
}

// LazyLoad loads a placeholder image first, then on de the low res image 
const LazyLoad: React.FC<LazyLoadProps> = (props) => {
  const { images, ...rest } = props
  const { aspectRatio = 2 / 3 } = props

  const wrapperRef = useRef(null)
  const { hasBeenObserved } = useObserved(wrapperRef)
  const [highResLoaded, setHighResLoaded] = useState<boolean>(false)
  const [lowResLoaded, setLowResLoaded] = useState<boolean>(false)


  const onLoadLowRes = () => {
    setLowResLoaded(true)
  }
  const onLoadHighRes = () => {
    setHighResLoaded(true)
  }

  return (
    <div
      className="wrapper"
      ref={wrapperRef}
    >
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }}></div>
      <img
        className={`placeholder ${rest.className}`}
        src={images.placeholder}
        alt={images.alt}
        {...rest}
      />
      {hasBeenObserved && (
        <>
          <img
            {...rest}
            className={`
            low-res
            ${lowResLoaded ? 'low-res--loaded' : ''}
            ${!!rest.className ? rest.className : ''}
          `}
            src={images.lowRes}
            alt={images.alt}
            onLoad={onLoadLowRes}
          />
          <img
            {...rest}
            className={`
            high-res
            ${highResLoaded ? 'high-res--loaded' : ''}
            ${!!rest.className ? rest.className : ''}
          `}
            src={images.highRes}
            alt={images.alt}
            onLoad={onLoadHighRes}
          />
        </>
      )}
    </div>
  )
}

export default LazyLoad
