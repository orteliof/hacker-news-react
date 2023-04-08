import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ItemDetails, ListNews} from "./components";
import './App.css'

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListNews/>}/>
                    <Route path="/story" element={<ListNews/>}/>
                    <Route path="/story/:itemId" element={<ItemDetails/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
