import { Dimensions, StyleSheet, Text, View ,Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"; 
const screenWidth = Dimensions.get("window").width;

export default function Song({ route }) {
    const { id } = route.params;
    const [data  ,setData ] =  useState([]) ; 
    const [Track , setTrack ] = useState() ; 
    const Getfunction = async () => {
        try {
            
          const response = await axios.get(
            "https://itunes.apple.com/search?term=Justin+beiber"
          );
          const List = response.data.results ; 
          setData(response.data.results);
          console.log(`data was set sucessfully `)
          //Also filter out track from this 
          const thistrack = List.filter((element) => element?.trackId == id )
          setTrack(thistrack[0]) ; 
          console.log(thistrack)
        } catch (error) {
          console.error("Error fetching data:", error); // More informative error handling
          setData({ message: "Failed to load data" }); // Provide a user-friendly message
        }
      };
      useEffect(()=>{
        Getfunction() ; 
      },[id])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.trackview}>

        <View style={styles.Imageview}>
  
              <Image
                style={styles.Image}
                source={{
                  uri:
                    `${Track?.artworkUrl100}` || `https://via.placeholder.com/100`,
                }}
              />
                    
            </View>

              <View style={styles.desc}>

                <Text
                  numberOfLines={2} 
                //   ellipsizeMode="tail"
                  style={styles.trackName}
                >
                  {Track?.trackName}
                </Text>
                <View style={styles.artdesc}>

                  {Track?.trackExplicitness == "explicit" ?
                   (<View style={styles.explicitview}>
                      <Text
                        numberOfLines={1} 
                        //    ellipsizeMode="tail"
                        style={styles.explicit}
                      >
                        {"E"}
                      </Text>
                    </View>
                  ) : (<></>)
                  
                  }
                 

                  <Text
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={styles.artist}
                  >
                    {Track?.artistName}
                  </Text>

                  <Text
                    style={styles.artist}
                  >
                    Buy : ${Track?.trackPrice}
                  </Text>
                        <Text
                    style={styles.artist}
                  >
                    Category : {Track?.primaryGenreName}
                  </Text>
                </View>
                {Track?.isStreamable == true ? 
               (
               <View style={styles.streamtrue}>
                    <Text>Stream now </Text>
                </View> ): 
                (
                    <View style={styles.streamfalse}>
                    <Text>Not available </Text>
                </View> )
                
                }
                {/* <Bottom gener={Track?.primaryGenreName} data={data} /> */}
              </View>
             </View>

   </ScrollView>
  )
}









//  function Bottom({ gener , data }){
//     const [list , setlist ] = useState([]); 
//     useEffect(()=>{
//         const generlist =  data.filter( (element) => element.primaryGenreName == gener)
//         setlist(generlist) ; 
//     })
//   return (
//     <View>
//       <Text>More Views {gener} </Text>
//       {list?.map((song) =>{
//         <Text>{song.trackName}</Text>
//       })}
//     </View>
//   )
// }




const styles = StyleSheet.create({
    container: {
      //   flex: 1,
      backgroundColor: "#353636",
      //   alignItems: 'center',
      //   justifyContent: 'center',
      height: 70,
      width: Dimensions.get("window").width,
    },
    Image: {
      width: 200,
      height: 200 ,
      resizeMode: "cover",
      padding: 5,
    },
    trackview: {
      flex : 1 ,
    //   flexDirection: "row",
      padding: 5,
      width: "100%",
      height: 70,
    },
    trackName: {
      fontWeight: "bold",
      color: "white",
      fontSize: "24px",
    },
    desc: {
    //   width: "80%",
      paddingLeft: 10,
      marginTop : 30 ,
      
    },
    artist: {
      color: "#6ba056",
      paddingLeft: 5,
      fontSize : 25 ,
      fontWeight : 'bold'

    },
    explicit: {
      color: "black",
      fontSize : 26 ,
      // backgroundColor: "grey",
      // minWidth : ,
      padding: 2,
      borderRadius: 40,
    },
    artdesc: {
      paddingTop: 10,
      flexDirection: "column",
    //   alignItems: "center",
      justifyContent: "flex-start",
    },
    explicitview : {
      width : 15 ,
      borderRadius : 4 ,
      backgroundColor : 'grey' , 
      justifyContent : "center"  , 
      alignItems : 'center'
    },
    Imageview :{
        // flex : 1 ,
        marginTop : 20 ,
        alignContent : 'center' , 
        alignItems : 'center' ,
        
    },
    streamtrue:{
        backgroundColor : 'green'
    },
    streamfalse:{
        backgroundColor : 'red'

    }

  });
  