import ReactDOM from "react-dom/client";
import App from './App';

//components
import AuthProvider from "./context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AuthProvider children={<App/>}/>);