import Carousel from "../components/about/Carousel"

function AboutPage() {
  return (
    <div className="max-w-page mx-auto mt-10">
      <h1 className="text-6xl mb-10 font-bold text-center italic">
        Meet the MUSIC-LIBRARY-STORE
      </h1>

      <Carousel />
    </div>
  );
}

export default AboutPage;

// ================================================================================================================================================================================================================================================
// ================================================================================================================================================================================================================================================
// ================================================================================================================================================================================================================================================


// function AboutPage() {
//   const [items, setItems] = useState<CarouselItem[]>(CAROUSEL_ITEMS);
//   const [isMoving, setIsMoving] = useState(false);
//   const [caller, setCaller] = useState(true);
  
//   const ulRef = useRef<HTMLUListElement | null>(null)
//   const itemsRefs = useRef<HTMLLIElement[]>([])

//   useEffect(() => {
//     if (ulRef.current !== null) {
//       const lis = ulRef.current.querySelectorAll("li")
//       lis.forEach(li => itemsRefs.current.push(li))
//       console.log({
//         ul: ulRef.current,
//         items: itemsRefs.current
//       });
//     }
//   }, []);

//   const animateItems = () => {
//     if (ulRef.current !== null) {
//       const lis = ulRef.current.querySelectorAll("li")
//       lis.forEach(animateElement)
//     }
//   }

//   useEffect(() => {
//     let newItems: CarouselItem[] = [...items, {
//       ...items[0],
//       id: randomNumber(items.length, 1000, 0)
//     }]
//     setItems([...newItems])
//     setIsMoving(true)

//     setTimeout(animateItems, 10);
//     const transitionTimeout = setTimeout(() => {
//       newItems.shift()
//       setItems([...newItems])
//       setIsMoving(false)
//     }, TRANSITION_DURATION);

//     const callerTimeout = setTimeout(() => setCaller(prev => !prev), DELAY_ANIMATION);
//     return () => {
//       clearTimeout(transitionTimeout)
//       clearTimeout(callerTimeout)
//     }
//   }, [caller]);

//   useEffect(() => {
//     console.log(items.length);
//   }, [items]);

//   return (
//     <div className="max-w-page mx-auto mt-10">
//       <h1 className="text-6xl mb-10 font-bold text-center italic">
//         Meet the MUSIC-LIBRARY-STORE
//       </h1>

//       <div className="w-full h-130 flex justify-center items-center">
//         <div className="h-full flex justify-start items-center">
//           <ul
//             className=" h-full flex justify-start items-center gap-5"
//             ref={ulRef}
//           >
//             {items.map((item, index) => (
//               <CarouselCard
//                 key={item.id}
//                 item={item}
//                 isFirst={(index === 0 && isMoving)}
//                 isLast={((index === (items.length - 1)) && isMoving)}
//                 isFocused={index === 2}
//               />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutPage;

// interface CarouselCardProps {
//   item: CarouselItem
//   isFirst: boolean
//   isLast: boolean
//   isFocused: boolean
// }

// const CarouselCard = ({ item, isFirst, isLast, isFocused }: CarouselCardProps) => {
//   return (
//     <li
//       className={`p-5 rounded flex flex-col justify-center items-center gap-y-4 bg-white/10 ${(isFirst || isLast) && "opacity-0 scale-50"} duration-500`}
//       style={{
//         width: isFocused ? FOCUSED_ITEM_WIDTH : COMMON_ITEM_WIDTH,
//         height: isFocused ? "auto" : COMMON_ITEM_HEIGHT
//         // minHeight: isFocused ? "100%" : "0%"
//       }}
//     >
//       <p className={`text-center ${isFocused ? "text-3xl font-semibold" : "text-lg"}`}>
//         {item.title}
//       </p>
//       {isFocused && (
//         <div className="w-full flex justify-center items-center overflow-hidden">
//           <img
//             src={item.image}
//             alt={item.title}
//             className="rounded object-cover"
//           />
//         </div>
//       )}
//     </li>
//   )
// }


// ================================================================================================================================================================================================================================================
// ================================================================================================================================================================================================================================================
// ================================================================================================================================================================================================================================================


    // const interval = setInterval(() => {
      //   itemsRefs.current.forEach(li => {
        //     li.animate([
          //       { ["transform"]: "translateX(-100%)" }
          //     ], {
            //       duration: TRANSITION_DURATION,
            //       easing: "ease",
            //       iterations: 1
            //     })
            //   })
            // }, DELAY_ANIMATION);
            
            // return () => clearInterval(interval)


// function AboutPage() {
//   const [items, setItems] = useState<CarouselItem[]>(CAROUSEL_ITEMS);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       let newItems = [...items]
//       const deleted = newItems.shift()
//       newItems.push(deleted!)
//       setItems(newItems)
//     }, DELAY_ANIMATION);
    
//     return () => clearTimeout(timeout)
//   }, [items]);

//   return (
//     <div className="max-w-page mx-auto mt-10">
//       <h1 className="text-6xl mb-10 font-bold text-center italic">
//         Meet the MUSIC-LIBRARY-STORE
//       </h1>

//       <div className="w-full h-130 p-10 bg-black/20 ring-4 ring-white/30 rounded">
//         <ul className="w-full h-full flex justify-center items-center gap-5">
//           {items.map((item, index) => (
//             <li
//               key={item.id}
//               className="p-5 rounded ring-2 ring-white/50 h-full duration-200"
//               style={{ width: index === Math.floor(items.length / 2) ? FOCUSED_ITEM_WIDTH : COMMON_ITEM_WIDTH }}
//             >
//               <p className="text-center text-lg">
//                 {item.title}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }