import React from 'react';
import { Button } from './components';

function App() {
    return (
        <div className="App">
            <Button
                onClick={() => {
                    console.log('clicked button');
                }}
            >
                Click me!
            </Button>
        </div>
    );
}

export default App;
