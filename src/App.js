import Control from './Control';

class App {
  async run() {
    const control = new Control();
    await control.start();
  }
}

export default App;
