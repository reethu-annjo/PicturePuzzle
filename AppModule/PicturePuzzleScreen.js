import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {PUZZLE_IMAGES} from './PhotoGalleryConstants';

class PuzzleImageScreen extends Component {
  DeviceWidth = Dimensions.get('window').width;
  constructor(props) {
    super(props);
    this.state = {
      PUZZLE_IMAGES: [...PUZZLE_IMAGES],
      isTileSelected: false,
      selectedTile: null,
      isInstructionVisible: false,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.onShufflePress();
    }, 1000);
  }

  handleTileSelected = id => {
    if (this.state.isTileSelected) {
      this.handleTileSwap(this.state.selectedTile, id);
    } else {
      this.setState({
        isTileSelected: true,
        selectedTile: id,
      });
    }
  };

  handleTileSwap = (id1, id2) => {
    let PUZZLE_IMAGES_COPY = [...this.state.PUZZLE_IMAGES];
    let index1 = this.state.PUZZLE_IMAGES.findIndex(tile => tile.id == id1);
    let index2 = this.state.PUZZLE_IMAGES.findIndex(tile => tile.id == id2);
    let tile1 = {...PUZZLE_IMAGES_COPY[index1]};
    let tile2 = {...PUZZLE_IMAGES_COPY[index2]};
    PUZZLE_IMAGES_COPY[index2] = tile1;
    PUZZLE_IMAGES_COPY[index1] = tile2;

    this.setState({
      PUZZLE_IMAGES: PUZZLE_IMAGES_COPY,
      isTileSelected: false,
      selectedTile: null,
    });
  };

  checkPuzzle = () => {
    let PuzzleMatch = true;
    if (
      JSON.stringify(this.state.PUZZLE_IMAGES) !== JSON.stringify(PUZZLE_IMAGES)
    ) {
      PuzzleMatch = false;
    }
    return PuzzleMatch;
  };

  onShufflePress = () => {
    let theLength = this.props.tileMax - 1;
    let toSwap;

    for (let i = 0; i < theLength; i++) {
      toSwap = Math.floor(Math.random() * (i + 1));
      this.setState(prevState => {
        let data = [...prevState.PUZZLE_IMAGES];

        let temp = this.state.PUZZLE_IMAGES[i];
        this.state.PUZZLE_IMAGES[i] = this.state.PUZZLE_IMAGES[toSwap];
        this.state.PUZZLE_IMAGES[toSwap] = temp;

        return {data};
      });
    }
  };

  onResetPress = () => {
    let theLength = this.props.tileMax - 1;

    for (let i = 0; i < theLength; i++) {
      this.setState(prevState => {
        let data = [...prevState.PUZZLE_IMAGES];

        this.state.PUZZLE_IMAGES[i] = PUZZLE_IMAGES[i];

        return {data};
      });
    }
    setTimeout(() => {
      this.onShufflePress();
    }, 500);
  };

  static defaultProps = {
    tileMax: 9,
  };

  renderPuzzleImage = tileMax => {
    return this.state.PUZZLE_IMAGES.map(display => {
      let i = display.id;
      return this.state.selectedTile === display.id ? (
        <View
          style={{
            height: this.DeviceWidth / 3,
            width: this.DeviceWidth / 3,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.handleTileSelected(i);
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'lightpink',
            }}>
            <Image
              style={{
                height: this.DeviceWidth / 3,
                width: this.DeviceWidth / 3,
                borderColor: 'red',
                borderWidth: 2,
              }}
              source={display.image}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            height: this.DeviceWidth / 3,
            width: this.DeviceWidth / 3,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.handleTileSelected(i);
            }}
            style={{
              flex: 1,
            }}>
            <Image
              style={{
                height: this.DeviceWidth / 3,
                width: this.DeviceWidth / 3,
                transform: [{ scale: 0.9 }],
                resizeMode: 'cover',
              }}
              source={display.image}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: '100%',
            }}>
            {this.renderPuzzleImage(9)}
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#043B69',
                width: this.DeviceWidth / 3,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <TouchableOpacity onPress={this.onShufflePress}>
                <Text style={{fontSize: 20, color: 'white', letterSpacing: 1}}>
                  Shuffle
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderRadius: 10,
                borderColor: '#043B69',
                borderWidth: 2,
                width: this.DeviceWidth / 3,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <TouchableOpacity onPress={this.onResetPress}>
                <Text
                  style={{fontSize: 20, color: '#043B69', letterSpacing: 1}}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.checkPuzzle()
                ? Alert.alert('Puzzle Match!!', 'Shuffle again?', [
                    {
                      text: 'Ok',
                      onPress: () => this.onShufflePress(),
                    },
                  ])
                : alert('Try again');
            }}>
            <Text style={{color: '#0000EE', fontSize: 20}}>Click to check</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default PuzzleImageScreen;
