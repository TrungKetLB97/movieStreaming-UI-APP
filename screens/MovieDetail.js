import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Platform
} from 'react-native';
import { ProgressBar } from "../components";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import LinearGradient from 'react-native-linear-gradient';

const MovieDetail = ({navigation, route}) => {

    const [selectedMovie, setSelectedMovie] = React.useState(null)

    React.useEffect (() => {
        let{ selectedMovie} = route.params;
        setSelectedMovie(selectedMovie)
    }, [])

    function renderHeaderBar() {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: Platform.OS === "android" ? 40 : 20,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {/* back */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: COLORS.transparentBlack,
              }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={icons.left_arrow}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>
            {/* share */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: COLORS.transparentBlack,
              }}
              onPress={() => console.log("Share")}
            >
              <Image
                source={icons.upload}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                }}
              />
            </TouchableOpacity>
          </View>
        );
    }

    function renderHeaderSection() {
        return(
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7
                }}
            >
                <View
                    style={{
                        flex:1,
                    }}
                >
                    {renderHeaderBar()}

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end'
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['transparent', '#000']}
                            style={{
                                width: "100%",
                                height: 150,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            {/* season */}
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4
                                }}
                            > {selectedMovie?.details.season} </Text>
                            {/* name */}
                            <Text 
                                style={{
                                    marginTop: SIZES.base,
                                    color: COLORS.white,
                                    ...FONTS.h1
                                }}
                            > {selectedMovie?.name} </Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderCategoryAndRatings() {
        return (
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.base,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* age */}
            <View
              style={[
                styles.categoryContainer,
                {
                  marginLeft: 0,
                },
              ]}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                }}
              >
                {selectedMovie?.details?.age}
              </Text>
            </View>
            {/* genre */}
            <View
              style={[
                styles.categoryContainer,
                {
                  marginLeft: SIZES.base,
                },
              ]}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                }}
              >
                {selectedMovie?.details?.genre}
              </Text>
            </View>
            {/* ratings */}
            <View
                style={styles.categoryContainer}
            >
                <Image 
                    source={icons.star}
                    resizeMode="contain"
                    style={{
                        width: 15,
                        height: 15
                    }}
                />
                <Text
                    style={{
                        marginLeft: SIZES.base,
                        color: COLORS.white,
                        ...FONTS.h4
                    }}
                >
                    {selectedMovie?.details?.ratings}
                </Text>
            </View>
          </View>
        );
    }

    function renderMovieDetail() {
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.padding,
              justifyContent: "space-around",
            }}
          >
            {/* title, runing time and progress bar */}
            <View
            // title and runing time
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.white,
                    ...FONTS.h4,
                  }}
                >
                  {selectedMovie?.details?.currentEpisode}
                </Text>
                <Text
                  style={{
                    color: COLORS.lightGray,
                    ...FONTS.body4,
                  }}
                >
                  {selectedMovie?.details?.runningTime}
                </Text>
              </View>
              {/* Pogress bar */}
              <ProgressBar
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                barStyle={{
                  height: 5,
                  borderRadius: 3,
                }}
                barPercentage={selectedMovie?.details?.progress}
              />
            </View>

            {/* watch */}
            <TouchableOpacity
                style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: "center",
                    marginTop: SIZES.padding,
                    borderRadius: 15,
                    marginBottom: Platform.OS === 'android' ? SIZES.padding * 2 : 0,
                    backgroundColor: COLORS.primary
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    {selectedMovie?.details?.progress == "0%" ? "WATCH NOW" : " CONTINUE WATCH "}
                </Text>
            </TouchableOpacity>
          </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flex:1,
                backgroundColor: COLORS.black,
            }}
            style={{
                backgroundColor: COLORS.black
            }}
        >
            {/* header */}
            {renderHeaderSection()}

            {/* category & ratings */}
            {renderCategoryAndRatings()}

            {/* movie detail */}
            {renderMovieDetail()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.gray1
    }
})

export default MovieDetail;