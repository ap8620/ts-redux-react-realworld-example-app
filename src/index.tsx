import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App/App';
import { makeServer } from "./mirage/server";

//makeServer({ environment: "development" });

const isSandboxMode = localStorage.getItem('isSandboxMode') ?? 'false'
if (isSandboxMode.toLowerCase() === "true") {
    makeServer({ environment: "development" });
}

ReactDOM.render(<App />, document.getElementById('root'));
