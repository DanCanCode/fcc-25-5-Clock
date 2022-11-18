import "./App.scss";
import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(1500);
  const [timerType, setTimerType] = useState("SESSION");
  const [play, setPlay] = useState(false);

  const timeout = setTimeout(() => {
    if (timer && play) {
      setTimer(timer - 1);
    }
  }, 1000);

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimer(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimerType("SESSION");

    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timer && timerType === "SESSION") {
      setTimer(breakLength * 60);
      setTimerType("BREAK");
      audio.play();
    }
    if (!timer && timerType === "BREAK") {
      setTimer(sessionLength * 60);
      setTimerType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      // eslint-disable-next-line no-unused-expressions
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    clock();
  }, [play, timer, timeout]);

  return (
    <div className="App">
      <div id="App-Wrapper">
        <h2>25 + 5 Clock</h2>

        <div id="session-settings">
          <div id="break">
            <h3 id="break-label">Break Length</h3>
            <div id="break-length">{breakLength}</div>
            <button
              disabled={play}
              id="break-decrement"
              onClick={() => {
                if (breakLength > 1) {
                  setBreakLength(breakLength - 1);
                }
              }}
            >
              -
            </button>
            <button
              disabled={play}
              id="break-increment"
              onClick={() => {
                if (breakLength < 60) {
                  setBreakLength(breakLength + 1);
                }
              }}
            >
              +
            </button>
          </div>

          <div id="session">
            <h3 id="session-label">Session Length</h3>
            <div id="session-length">{sessionLength}</div>
            <button
              disabled={play}
              id="session-decrement"
              onClick={() => {
                if (sessionLength > 1) {
                  setSessionLength(sessionLength - 1);
                  setTimer(timer - 60);
                }
              }}
            >
              -
            </button>
            <button
              disabled={play}
              id="session-increment"
              onClick={() => {
                if (sessionLength < 60) {
                  setSessionLength(sessionLength + 1);
                  setTimer(timer + 60);
                }
              }}
            >
              +
            </button>
          </div>
        </div>

        <div id="timer">
          <h2 id="timer-label">
            {timerType === "SESSION" ? "Session" : "Break"}
          </h2>
          <div id="time-left">{timeFormatter()}</div>
          <button onClick={handlePlay} id="start_stop">
            Start/Stop
          </button>
          <button onClick={handleReset} id="reset">
            Reset
          </button>
        </div>

        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
