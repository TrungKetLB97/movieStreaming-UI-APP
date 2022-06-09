import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Animated,
    ScrollView
} from 'react-native';
import { Profiles, ProgressBar } from "../components";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";


const Home = ({ navigation }) => {

    const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return(
            <View
                style={{
                    flexDirection:"row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* profile */}
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50
                    }}
                    onPress={() => console.log("profile")}
                >
                    <Image 
                        source={images.profile_photo}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20
                        }}
                    />

                </TouchableOpacity>
                {/* screen mirror */}
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50
                    }}
                    onPress={() => console.log("screen mirror")}
                >
                    <Image 
                        source={icons.airplay}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
            </View>
        )

    }

    function renderNewSeasonSection() {
        return(
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop: SIZES.radius
                }}
                data={dummyData.newSeason}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {x: newSeasonScrollX }}}
                ], {useNativeDriver: false })}
                renderItem={({item, index}) => {
                    return(
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate("MovieDetail", { selectedMovie: item })}
                        >
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {/* thumbnail */}
                                <ImageBackground
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width * 0.85,
                                        height: SIZES.width * 0.85,
                                        justifyContent:"flex-end"
                                    }}
                                    imageStyle={{
                                        borderRadius: 40
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            height: 60,
                                            width: "100%",
                                            marginBottom: SIZES.radius,
                                            paddingHorizontal: SIZES.radius
                                        }}
                                    >
                                        {/* play now */}
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: "center"
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: "center",
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20,
                                                    backgroundColor: COLORS.transparentWhite
                                                }}
                                            >
                                                <Image 
                                                    source={icons.play}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.white
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    marginLeft: SIZES.base,
                                                    color: COLORS.white,
                                                    ...FONTS.h3
                                                }}
                                            > Play </Text>
                                        </View>
                                        {/* still watching */}
                                        {item.stillWatching.length > 0 && 
                                            <View
                                                style={{
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: COLORS.white,
                                                        ...FONTS.h4
                                                    }}
                                                >Still Watching</Text>
                                                <Profiles 
                                                    profiles={item.stillWatching}
                                                />
                                            </View>
                                        }
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            >

            </Animated.FlatList>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width)

        return(
            <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {dummyData.newSeason.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotWidth = dotPosition.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [6, 20, 6],
                      extrapolate: "clamp",
                    });

                    const dotColor = dotPosition.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [COLORS.black, COLORS.primary, COLORS.black],
                      extrapolate: "clamp",
                    });

                    return(
                        <Animated.View
                        key={`dot-${index}`}
                        opacity={opacity}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 3,
                                width: dotWidth,
                                height: 6,
                                backgroundColor: dotColor
                            }}
                        >

                        </Animated.View>
                    )
                })}

            </View>
        )
    }

    function renderContinueWatchingSection(){
        return(
            <View style={{marginTop: SIZES.padding}} > 
            {/* header */}
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        flex:1,
                        color: COLORS.primary,
                        ...FONTS.h2
                    }}
                > Continue Watching </Text>
                <Image 
                    source={icons.right_arrow}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary
                    }}
                />
            </View>
            {/* list */}
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                data={dummyData.continueWatching}
                keyExtractor={item => `${item.id}`}
                renderItem={({item, index}) => {
                    return(
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate("MovieDetail", {selectedMovie: item})}
                        >
                            <View
                                style={{
                                    marginLeft : index == 0 ? SIZES.padding : 20,
                                    marginRight : index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0
                                }}
                            > 
                            {/* thumbnail */}
                            <Image 
                                source={item.thumbnail}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width / 3,
                                    height : (SIZES.width / 3 ) + 60,
                                    borderRadius: 20
                                }}
                            />
                            {/* name */}
                            <Text
                                style={{
                                    marginTop: SIZES.base,
                                    color: COLORS.primary,
                                    marginBottom: 10,
                                    ...FONTS.h4
                                }}
                            > {item.name} </Text>
                            {/* progress bar */}
                            <ProgressBar 
                                containerStyle={{
                                    marginTop : SIZES.radius,
                                }}
                                barStyle={{
                                    height: 5,
                                    marginBottom: 10
                                }}
                                barPercentage={item.overallProgress}
                            />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
            </View>
        )
    }

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: COLORS.lightCyan
            }}
        >
            {renderHeader()}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {renderNewSeasonSection()}
                {renderDots()}
                {renderContinueWatchingSection()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;