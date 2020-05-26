import React, { Component } from 'react';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Greeting from './Components/Greeting/Greeting.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: 'ff472be54e094115b755eaba621826b6',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const age = data.outputs[0].data.regions[0].data.concepts[0].name;
    const sex =
      data.outputs[0].data.regions[0].data.concepts[20].name === 'masculine'
        ? 'male'
        : 'female';
    const ethnicity = data.outputs[0].data.regions[0].data.concepts[22].name;
    const ethnicity2 = data.outputs[0].data.regions[0].data.concepts[23].name;
    const demographics = {
      age: age,
      sex: sex,
      ethnicity: ethnicity,
      ethnicity2: ethnicity2,
    };
    console.log(demographics);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      age: age,
      sex: sex,
      ethnicity: ethnicity,
      ethnicity2: ethnicity2,
      phrase:
        'Damn you look old! You look like a ' +
        age +
        ' year old ' +
        sex +
        '. You seem to be primarily ' +
        ethnicity +
        ' with a hint of ' +
        ethnicity2 +
        '.',
    };
  };

  displayFaceBox = (box) => {
    // console.log(box);
    this.setState({ box: box });
    console.log(box);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)

      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      );
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: route });
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Logo />
        <Greeting />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          box={this.state.box}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
