// export const getMusicNoteAnim = (animationValue , isRotatedLeft) => {
//     return {
//         transform: [
//             {
//                 translateX : animationValue.interpolate({
//                     inputRange: [0 ,1],
//                     outputRange: [8, -16]
//                 }) 
//             },
//             {
//                 translateY : animationValue.interpolate({
//                     inputRange: [0 ,1],
//                     outputRange: [0, -32]
//                 }) 
//             },
//             {
//                 rotate : animationValue.interpolate({
//                     inputRange: [0 ,1],
//                     outputRange: ['0deg', isRotatedLeft ? '-45deg' : '45deg']
//                 }) 
//             }
//         ],
//         opacity : animationValue.interpolate({
//             inputRange: [0 , 0.8 ,1],
//             outputRange: [0, 1, 0]
//         })
//     }
// }