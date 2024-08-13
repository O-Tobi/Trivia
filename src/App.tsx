import React from 'react';
import Difficulty from './components/Difficulty/difficulty';


//define the difficulty parameter for each tier
//Easy will have 10 questions and 15 seconds to answer each
//Medium will have 20 questions with 10 seconds to answer each
//Hard will have 40 questions with 5 seconds to answer each

function App() {
  return (
    <div>
      <Difficulty />
    </div>
  );
}

export default App;
