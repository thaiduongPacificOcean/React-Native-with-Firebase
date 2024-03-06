import { Share } from "react-native"
const SharePlace=(place)=>{
        Share.share({
            title:'Share Business',
            message:"Business Name: "+place.name+"\n"+"Address: "
            +place.vicinity?place.vicinity:place.formatted_address,
        })
}
const SharePost=(post)=>{
    Share.share({
        title:'Post',
        message: post.imageUrl,
    })
}
export default{
    SharePlace,
    SharePost
}