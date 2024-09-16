import './App.css';
import signIn from './authRedirect';


function App() {
  return (
    <div className="App">
      <button type="button" id="SignIn" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default App;
