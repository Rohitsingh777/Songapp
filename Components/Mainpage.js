import {
  View,
  Text,
  ScrollViewBase,
  ScrollView,
  TouchableOpacity,
  ViewComponent,
  Image,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming axios is installed
const screenWidth = Dimensions.get("window").width;

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing , setrefreshing ] = useState(false)
  const handleNavigate = (id) => {
    // Pass the id when navigating
    navigation.navigate('Song', { id });
  };
  const Getfunction = async () => {
    try {
      const response = await axios.get(
        "https://itunes.apple.com/search?term=Justin+beiber"
      );
      setData(response.data.results);
      console.log(`data was set sucessfully `)
    } catch (error) {
      console.error("Error fetching data:", error); // More informative error handling
      setData({ message: "Failed to load data" }); // Provide a user-friendly message
    }
  };
  const onRefresh  =()=>{
    setrefreshing(true)
Getfunction();
console.log(`refresh complete`)
setrefreshing(false)
  }
  useEffect(() => {
    Getfunction();
  }, []);

  return (
    <ScrollView 
    refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
    }
    >
      {data.map((el) => {
        return (
          <TouchableOpacity style={styles.container} 
          onPress={()=>{handleNavigate(el?.trackId)}}>
            <View style={styles.trackview}>
              <Image
                style={styles.Image}
                source={{
                  uri:
                    `${el.artworkUrl100}` || `https://via.placeholder.com/100`,
                }}
              />
              <View style={styles.desc}>
                <Text
                  numberOfLines={1} // Limits the text to one line
                  ellipsizeMode="tail"
                  style={styles.trackName}
                >
                  {el.trackName}
                </Text>
                <View style={styles.artdesc}>
                  {el.trackExplicitness == "explicit" ? (
                    <View style={styles.explicitview}>
                      <Text
                        numberOfLines={1} // Limits the text to one line
                        //    ellipsizeMode="tail"
                        style={styles.explicit}
                      >
                        {"E"}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* <Text 
                    numberOfLines={1} // Limits the text to one line
                //    ellipsizeMode="tail"  
                    style={styles.explicit}>
                    {el.trackExplicitness == 'explicit' ? 'E': 'Clean'}
                    </Text> */}

                  <Text
                    numberOfLines={1} // Limits the text to one line
                    ellipsizeMode="tail"
                    style={styles.artist}
                  >
                    {el.artistName}
                  </Text>
                </View>
              </View>
            </View>

            {/* <Text>{`\n`}</Text> */}
          </TouchableOpacity>
        );
      })}
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
    width: "20%",
    height: "100%",
    resizeMode: "cover",
    padding: 5,
  },
  trackview: {
    // flex : 1 ,
    flexDirection: "row",
    padding: 5,
    width: "100%",
    height: 70,
  },
  trackName: {
    fontWeight: "bold",
    color: "white",
    fontSize: "16px",
  },
  desc: {
    width: "80%",
    paddingLeft: 10,
  },
  artist: {
    color: "grey",
    paddingLeft: 5,
  },
  explicit: {
    color: "black",
    fontSize : 12 ,
    // backgroundColor: "grey",
    // minWidth : ,
    padding: 2,
    borderRadius: 40,
  },
  artdesc: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  explicitview : {
    width : 15 ,
    borderRadius : 4 ,
    backgroundColor : 'grey' , 
    justifyContent : "center"  , 
    alignItems : 'center'
  }
});
