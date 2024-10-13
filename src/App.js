import React from 'react';
import FhirAppHome from './componants/jsx/FhirAppHome';
import EditResource from './componants/jsx/EditResource';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <main>
                <FhirAppHome />
                <br />
                <hr />
                <br />
                <EditResource />
            </main>
        </div>
    );
}

export default App;
