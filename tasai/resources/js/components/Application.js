import React from 'react';
import ReactDOM from 'react-dom';

function Application() {
    return (
        <div className="container">
            <h1>Testing app</h1>
        </div>
    );
}

export default Application;

if (document.getElementById('app')) {
    ReactDOM.render(<Application />, document.getElementById('app'));
}
