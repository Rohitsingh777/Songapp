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
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

const screenWidth = Dimensions.get("window").width;

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [loading , setloading] = useState(true)
  const [refreshing, setrefreshing] = useState(false);
  const handleNavigate = (id) => {
    navigation.navigate("Song", { id });
  };
  const Getfunction = async () => {
    setloading(true)
    try {
      const response = await axios.get(
        "https://itunes.apple.com/search?term=Justin+beiber"
      );
      setData(response.data.results);
      console.log(`data was set sucessfully `);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ message: "Failed to load data" }); 
    }finally{
        setloading(false)
    }
  };
  const onRefresh = () => {
    setloading(true)
    setrefreshing(true);
    Getfunction();
    console.log(`refresh complete`);
    setrefreshing(false);
    setloading(false)
  };
  useEffect(() => {
    Getfunction();
  }, []);


  if (loading){
   return(
    <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={{color: 'white'}}
        />
   )
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data.map((el) => {
        return (
          <TouchableOpacity
          key={el?.trackId}
            style={styles.container}
            onPress={() => {
              handleNavigate(el?.trackId);
            }}
          >
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
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                  style={styles.trackName}
                >
                  {el.trackName}
                </Text>
                <View style={styles.artdesc}>
                  {el.trackExplicitness == "explicit" ? (
                    <View style={styles.explicitview}>
                      <Text
                        numberOfLines={1} 
                        style={styles.explicit}
                      >
                        {"E"}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                 

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.artist}
                  >
                    {el.artistName}
                  </Text>
                </View>
              </View>
            </View>

          
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#353636",
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
    fontSize: 12,
    padding: 2,
    borderRadius: 40,
  },
  artdesc: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  explicitview: {
    width: 15,
    borderRadius: 4,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
