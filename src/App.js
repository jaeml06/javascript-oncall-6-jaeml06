import Control from "./Control.js";

class App {
  async run() {
    const control = new Control();
    control.start();
  }
}

export default App;
