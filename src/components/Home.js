import { View, Text, ScrollView, StyleSheet , StatusBar ,Image, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React,{useState} from 'react'
import { Categories, COLOURS } from '../database/items' 
import Materials from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Home = ({navigation}) => {

  const [currentSelected, setcurrentSelected] = useState([0]);

  // 
  const renderCategories = ({item ,index}) => {
    return (
      <TouchableOpacity activeOpacity={0.8}
        onPress = {() => setcurrentSelected(index)}>
        <View style={{
          width : 120,
          height : 180,
          justifyContent : 'space-evenly',
          alignItems : 'center',
          margin : 10,
          borderRadius : 20,
          elevation : 5,
          backgroundColor : currentSelected == index ? COLOURS.accent : COLOURS.white,
        }}> 
          <View style = {styles.item}>
            <Image source= {item.image} 
              style={styles.itemImg}
            />
          </View>
          <Text style = {styles.itemName}>
            {item.name}
          </Text>  
          <View style={{
            width : 30,
            height : 30,
            borderRadius : 50,
            backgroundColor : currentSelected == index ? COLOURS.white : COLOURS.accentRed,
            alignItems : 'center',
            justifyContent : 'center' 

          }}> 
            <FontAwesome 
              name="angle-right" 
              style={{
                fontSize : 16, 
                color : currentSelected == index ? COLOURS.black : COLOURS.white,
            }}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const renderItem = (data , index) =>{
    return(
      <TouchableOpacity
      activeOpacity={0.9} 
      key={index}
      style={{
        width :'100%',
        height : 180,
        justifyContent : 'center',
        alignItems :'center',
      }}
      onPress={()=> navigation.push('Details',{
        name : data.name ,
        price : data.price,
        image : data.image,
        size : data.size,
        crust : data.crust,
        delivery : data.delivery,
        ingredients : data.ingredients,
        isTopOfTheWeek : data.isTopOfTheWeek,
        navigation: navigation
      })}>
        <View style={{
          width: '90%',
          height: 160,
          backgroundColor: COLOURS.white,
          borderRadius: 20,
          elevation: 4,
          position: 'relative',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{marginBottom :50}}>
            <View style={{
                flexDirection : 'row',
                justifyContent :'center',
                alignItems :'center',
                display : data.isTopOfTheWeek ? 'flex' : 'none',
              }}>
              <FontAwesome 
                name="star"
                style={{
                  fontSize:10,
                  color:COLOURS.accent,
              }}/>
              <Text style={{
                fontSize: 12,
                color:COLOURS.black,
                opacity: 0.8,
                marginLeft: 5,
              }}>
                Top of the week
              </Text>
            </View>
            <Text style={{fontSize:22,color:COLOURS.black,paddingTop:10,fontWeight:'bold'}}>
              {data.name}
            </Text>
            <Text style={{fontSize:12,color:COLOURS.black,paddingTop:10,opacity:0.5}}>
              {data.weight}
            </Text>
          </View>
          <View style={{height:150,width:150,marginRight:-45}}>
            <Image source={data.image} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
          </View>
          <View style={{
            position:'absolute',
            bottom:0,
            flexDirection:'row',
            alignItems:'center'
          }}>
            <View style={{
              width:85,
              height:50,
              backgroundColor:COLOURS.accent,
              borderTopRightRadius:20,
              borderBottomLeftRadius:20,
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Entypo
              name='plus'
              style={{
                fontSize:18,
                color:COLOURS.black
              }}
              />
            </View>
            <View style={{
              flexDirection:'row',
              alignItems:'center',
              marginLeft:20
            }}>
              <AntDesign
              name='star'
              style={{
                fontSize:18,
                color:COLOURS.black,
                paddingRight:5
              }}
              />
              <Text style={{
                fontSize:15,
                color:COLOURS.black,
              }}>{data.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View styles={styles.app}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.appBackground}>
          <StatusBar styles={styles.statusBar}/>
          <Image source={require('../database/images/background.png')} style={styles.imgBackground}/>
          <View style={styles.profile}>
            <TouchableOpacity style={{width :40,height:40}}>
              <Image source={require('../database/images/profile.jpg')} style={
                {
                  width : '100%',
                  height : '100%',
                  borderRadius : 500,
                  resizeMode: 'contain'
                }
              }/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Materials 
              name='segment'
              style={{
                fontSize : 30,
                color : COLOURS.black,
              }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.appTitle}>
            <Text style= {styles.nameTitle}>Food</Text>
            <Text style= {styles.nameDeli}>Delivery</Text>
          </View>
          <View style={styles.search}>
            <Ionicons name='search' style = {styles.iconSearch}/>
            <TextInput placeholder='Search...' style={styles.inputSearch}/>
          </View>
          <View style={styles.category}>
              <Text style={styles.cateTitle}>Categories</Text>
          </View>
          <FlatList 
            horizontal={true}
            data = {Categories}
            renderItem = {renderCategories}
            showsHorizontalScrollIndicator = {false}
          />
          <View style={styles.category}>
              <Text style={styles.cateTitle}>Popular</Text>
          </View>
          {
            Categories[currentSelected].items.map(renderItem)
          }
        <TouchableOpacity style={{
            margin:30,
            justifyContent:'center',
            alignItems:'center',
            opacity:0.5
          }}>
          <Text style={{
              fontSize:16,
              color:COLOURS.black,
              borderBottomWidth:1,
              borderBottomColor: COLOURS.lightGray
          }}>
            Load more
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  app: {
    width : '100%',
    height : '100%',
    backgroundColor : COLOURS.white,
  },
  appBackground :{
    width : '100%',
    height : '100%',
    backgroundColor : COLOURS.white,
    position : 'relative'
  },
  statusBar:{
    backgroundColor : COLOURS.white,
  },
  imgBackground :{
    position : 'absolute',
    top : 0,
    left : -100,
  },
  profile:{
    flexDirection : 'row',
    justifyContent : 'space-between',
    padding : 20
  },
  appTitle : {
    padding: 20,
  },
  nameTitle :{
    color : COLOURS.lightGray,
    fontSize : 20,
    opacity : 0.8,
    fontWeight : '400'
  },
  nameDeli :{
    fontSize : 40,
    color: COLOURS.black,
    fontWeight : '600',
    letterSpacing : 2,
  },
  search :{
    paddingHorizontal: 20,
    paddingVertical : 10,
    flexDirection: 'row',
    alignItems : 'center',
  },
  iconSearch : {
    fontSize : 20,
    color : COLOURS.black,
    opacity : 0.8
  },
  inputSearch : {
    paddingVertical : 5,
    paddingHorizontal : 10,
    color : COLOURS.black,
    fontSize : 16,
    width : '90%',
    borderBottomWidth : 1,
    borderBottomColor : COLOURS.black +20,
    marginLeft : 10,
    letterSpacing :1,
  },
  category :{

  },
  cateTitle : {
    paddingHorizontal :20,
    paddingTop : 20,
    fontSize : 20,
    color : COLOURS.black,
    fontWeight : '700',
    letterSpacing : 1
  },
  item : {
    width : 60,
    height : 60
  },
  itemImg : {
    width : '100%',
    height : '100%',
    resizeMode : 'center'
  },
  itemName : {
    color : COLOURS.black,
    fontSize : 16,
    fontWeight : '600',
  }

});
export default Home