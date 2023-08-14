import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import Messages from './Messages';
function getRandomName() {
  
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma',"autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
  "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
  "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
  "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
  "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
  "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
  "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
  "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
  "ancient", "purple", "lively", "nameless","waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
  "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
  "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
  "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
  "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
  "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
  "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
  "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
  "smoke", "star"
];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  
  return color;
}
class App extends Component {
  
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: getRandomName(),
        color: getRandomColor(),
      },
    };
  }
  componentDidMount() {
    const { member } = this.state;
    this.drone = new window.Scaledrone('DjSA0l53I3j8Ilxo', {
      data: member,
    });

    this.drone.on('open', (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const updatedMember = { ...member, id: this.drone.clientId };
      this.setState({ member: updatedMember });
      const room = this.drone.subscribe('observable-room');
      room.on('message', (message) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      });
    });
  }
  componentWillUnmount() {
    if (this.drone) {
      this.drone.close();
    }
  }
  handleInput = (input) => {
    if (this.drone) {
      this.drone.publish({
        room: 'observable-room',
        message: { input, user: this.state.user },
      });
    }
  };
  
  render() {
    const { messages } = this.state;
    return (
      <div className="App">
        <div className="header">
          <h1>Ira Chat App</h1>
        </div>
        <Messages messages={messages} />
        <Input onInput={this.handleInput} />
      </div>
    );
  }
}

export default App;
