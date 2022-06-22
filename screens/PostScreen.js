import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import FeedScreen from './Feed';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Spectagram</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <ScrollView style={styles.storyCard}>
              <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                  <Image
                    source={require('../assets/profile_img.png')}
                    style={styles.profileImage}></Image>
                </View>
                <View style={styles.authorNameContainer}>
                  <Text style={styles.authorNameText}>
                    {this.props.route.params.post.author}
                  </Text>
                </View>
              </View>
              <Image
                source={require('../assets/post.jpeg')}
                style={styles.postImage}></Image>
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>
                  {this.props.route.params.post.caption}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
                  <Text style={styles.likeText}>21k</Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() =>
              this.props.navigation.navigate('FeedScreen')
            }>
            <View style={styles.authorNameContainer}>
                  <Text style={styles.authorNamerText}>
                    Go back to the Feed Screen
                  </Text>
                </View>
            </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#555555',
    borderRadius: RFValue(20),
    marginTop: 30,
    flex: 0.70,
  },
  backContainer: {
    margin: RFValue(13),
    backgroundColor: '#555555',
    borderRadius: RFValue(20),
    marginTop: 30,
    flex: 0.10,
  },
  authorImageContainer: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(70),
  },
  profileImage: {
    resizeMode: 'contain',
    width: '20%',
    alignSelf: 'left',
    height: RFValue(70),
    marginTop: 10,
    marginLeft: 10,
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(241),
    marginTop: 20,
  },
  authorNameText: {
    fontSize: RFValue(20),
    color: 'white',
    width: '100%',
    marginLeft: 100,
    marginTop: -45,
    fontWeight: 'bold',
  },
  authorNamerText: {
    fontSize: RFValue(20),
    color: 'white',
    width: '100%',
    marginLeft: 30,
    marginTop: 20,
    fontWeight: 'bold',
  },
    captionText: {
    fontSize: 15,
    width: '88%',
    color: 'white',
    paddingTop: RFValue(10),
    marginLeft: 20,
    marginTop: 0,
  },

  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },

  droidSafeArea: {
    MarginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },

  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '130%',
    height: '62%',
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  appTitleTextContainer: {
    flex: 0.8,
    marginTop: 10,
    marginRight: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(26),
    marginTop: 0,
    justifyContent: 'center',
    fontFamily: 'Bubblegum-Sans',
  },
});
