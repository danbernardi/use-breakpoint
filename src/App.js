import { useBreakpointContext } from './useBreakpoint';
import logo from './logo.svg';
import './App.css';

function App() {
  const {
    setClass,
    bpIsGT,
    bpIsLT,
    breakpoint,
    breakpoints
  } = useBreakpointContext();

  console.log(breakpoint, breakpoints);

  return (
    <div className={ `App ${setClass({
      tabletMd: 'with-fat-border',
      mobileLg: 'with-skinny-border'
    })}` }>
      <header className="App-header">
        { bpIsGT('mobileLg') &&  <img src={logo} className="App-logo" alt="logo" /> }
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        { bpIsLT('mobileLg') && (
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        ) }
      </header>
    </div>
  );
}

export default App;
