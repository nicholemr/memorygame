import React, { useState, useEffect } from 'react';


function login() {
    const [currentUser, setCurrentUser] = useState(0);

    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, []);

    handleSubmit(event){
        let url = '/login'
        // fetch, method; ''POST'
        // set state

    }

    return (
        <div className="Login">
            <header className="Login-header">
                <form onSubmit={handleSubmit}>
                    <input id='username'
                        type='text'
                    ></input>

                </form>
                <p>The current time is {currentTime}.</p>
            </header>
        </div>
    );
}

export default loging;
