import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Bottom from "./Bottom";
const screenWidth = Dimensions.get("window").width;
import { Linking } from 'react-native';



export default function Song({ route }) {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const [Track, setTrack] = useState();
  const [generlist , setgenerlist ] = useState([]); 

  const Getfunction = async () => {
    try {
      const response = await axios.get(
        "https://itunes.apple.com/search?term=Justin+beiber"
      );
      const List = response.data.results;
      setData(List);
      console.log(`data was set sucessfully `);
      //Also filter out track from this
      const thistrack = List.filter((element) => element?.trackId == id);
      setTrack(thistrack[0]);

      const gen =  List.filter( (element) => element.primaryGenreName == thistrack[0]?.primaryGenreName)
      setgenerlist(gen) ;
      console.log(`gener list is here`)

      console.log(`${thistrack[0].trackName} loaded`);
    } catch (error) {
      console.error("Error fetching data:", error); // More informative error handling
      setData({ message: "Failed to load data" }); // Provide a user-friendly message
    }
  };
  useEffect(() => {
    Getfunction();
  }, [id]);
  return (
    <ScrollView style={{
        backgroundColor:'#353636'
    }} >
      <View style={styles.trackview}>
        <View style={styles.Imageview} >
        <TouchableOpacity 
        onPress={()=>{Linking.openURL(`${Track?.trackViewUrl}`) }}>
          <Image
            style={styles.Image}
            source={{
              uri:
                `${Track?.artworkUrl100}` || `https://via.placeholder.com/100`,
            }}
          />
        </TouchableOpacity>

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
           <View
            style={{
                flexDirection : 'row',
                // justifyContent : "center"  , 
                alignItems : 'center',
            }}
           > 
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.artist}>
              {Track?.artistName}
            </Text>
            <View style={{
                // width : 15 ,
                borderRadius : 8 ,
                backgroundColor : 'grey' , 
                justifyContent : "center"  , 
                alignItems : 'center',
                marginLeft : 10,
                height: 25

            }}>
            <Text
                  style={styles.explicit}
                >
                  {Track?.trackExplicitness}
                </Text>

            </View>
                </View>
            <Text style={styles.buy}>Buy : ${Track?.trackPrice}</Text>
            <Text style={{
                color : 'white',
                marginVertical : 10 ,
                fontSize : 16 , 
                fontWeight : "bold"

            }}>
              {Track?.primaryGenreName}
            </Text>
          </View>

          {Track?.isStreamable == true ? (
            <TouchableOpacity style={styles.streamtrue} 
            onPress={()=>{Linking.openURL(`${Track?.trackViewUrl}`) }}
            > 
              <Text
               style={{
                fontSize: 30,
                fontWeight : 'bold' ,
                backgroundColor : 'red',
                color : 'white'
              }}
              >Stream now </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.streamtrue} 
            onPress={()=>{Linking.openURL(`${Track?.trackViewUrl}`) }}
            > 
            <View style={{
                padding : 3,
                backgroundColor : 'red' , 
                borderRadius: 10
            }}>
              <Text
               style={{
                fontSize: 30,
                fontWeight : 'bold' ,
                backgroundColor : 'red',
                color : 'white'
              }}
              >Coming Soon</Text>
              </View>
            </TouchableOpacity>
          )}
          <Bottom gener={Track?.primaryGenreName} list={generlist} />
        </View>
      </View>
    </ScrollView>
  );
}


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
    height: 200,
    resizeMode: "cover",
    padding: 5,
  },
  trackview: {
    flex: 1,
    //   flexDirection: "row",
    padding: 5,
    width: "100%",
    height: 1000 ,
  },
  trackName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 26,
  },
  desc: {
    //   width: "80%",
    paddingLeft: 10,
    marginTop: 30,
  },
  artist: {
    color: "#c2c2c2",
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  explicit: {
    color: "black",
    fontSize: 16,
    padding: 2,
    borderRadius: 40,
    fontWeight : 'bold',
    
  },
  artdesc: {
    paddingTop: 10,
    flexDirection: "column",
    //   alignItems: "center",
    justifyContent: "center",
  },
  explicitview: {
    width: '50%',
    borderRadius: 4,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  Imageview: {
    // flex : 1 ,
    marginTop: 20,
    alignContent: "center",
    alignItems: "center",
  },
  streamtrue: {
    alignContent : "center",
    alignItems : "center",
    
  },
  streamfalse: {
    backgroundColor: "red",
  },
  buy:{
    fontSize : 20,
    color: 'white',
    fontWeight : 'bold'
  }
});
