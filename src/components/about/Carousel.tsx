
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
  { id: 4, title: "Item 4" },
  { id: 5, title: "Item 5" },
];

export default function Carousel() {
  const [index, setIndex] = useState(2); // Centro del carrusel

  useEffect(() => {
    setTimeout(() => {
      setIndex(prev => {
        if (prev + 1 === items.length) return 0
        else return prev + 1
      })
    }, 5000);
  }, [index]);

  return (
    <div className="relative w-full flex justify-center items-center ">
      <div className="flex items-center gap-4">
        <AnimatePresence>
          {items.map((item, i) => {
            // const distance = Math.abs(i - index)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: i === index ? 1.2 : 0.9,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-32 h-32 bg-blue-500 flex items-center justify-center text-white text-xl font-bold rounded-xl"
              >
                {item.title}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// interface CarouselItem {
//   id: number
//   title: number
//   image: string
// }

// const CAROUSEL_ITEMS: CarouselItem[] = [
//   {
//     id: 1,
//     title: 1,
//     image: firstImage
//   },
//   {
//     id: 2,
//     title: 2,
//     image: secondImage
//   },
//   {
//     id: 3,
//     title: 3,
//     image: thirdImage
//   },
//   {
//     id: 4,
//     title: 4,
//     image: fourthImage
//   },
//   {
//     id: 5,
//     title: 5,
//     image: fifthImage
//   },
// ]

// const COMMON_ITEM = {
//   width: 500,
//   height: 520
// }
// const FOCUSED_ITEM = {
//   width: 150,
//   height: 150
// }
// const DELAY_ANIMATION = 7000
// const TRANSITION_DURATION = 1000

// const ITEMS_TO_SHOW = 5


// const animateElement = (element: HTMLElement) => {
//   element.animate([
//     { ["transform"]: `translateX(-${COMMON_ITEM.width + 20}px)` }
//   ], {
//     duration: TRANSITION_DURATION,
//     easing: "ease-in-out",
//   })
// }

// const FOCUSED_INDEX = Math.floor(CAROUSEL_ITEMS.length / 2)

// function Carousel() {
//   const [items, setItems] = useState(CAROUSEL_ITEMS);
//   const [isMoving, setIsMoving] = useState(true);
//   const [carouselIndex, setCarouselIndex] = useState(1);
//   const itemsRef = useRef<(HTMLLIElement | null)[]>([])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsMoving(true)
//       setTimeout(() => setIsMoving(false), TRANSITION_DURATION);

//       setItems(prev => {
//         const newItems = [...prev.slice(1), prev[0]]
//         return [...newItems]
//       })
//     }, DELAY_ANIMATION)

//     return () => clearInterval(interval)
//   }, []);

//   return (
//     <div className="max-w-250 mx-auto ring-2 ring-white/30 rounded">
//       <ul className="w-full h-100 flex items-center gap-5">
//         {items
//         .map((item, index) => (
//           <li
//             key={item.id}
//             className={`${FOCUSED_INDEX === index   ? "w-100" : "w-50"} grow-0 text-3xl text-center p-4 rounded bg-black duration-1000`}
//             ref={(element) => {
//               itemsRef.current[index] = element
//             }}
//             style={{ 
//               translate: `${-100 * carouselIndex}`,
//             }}
//           >
//             {item.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Carousel;