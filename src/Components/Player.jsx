import { useEffect, useState } from "react";
import "../App.css";
import Background from "/bag.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Player({ accessToken }) {
  const [searchInput, setSearchInput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [clock, setClock] = useState(new Date());

  // Search songs functionality
  async function search() {
    var trackParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + accessToken,
      },
    };
    var trackId = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      trackParams,
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  const toggleFullScreen = () => {
    const element = document.querySelector(".fullscreen-div");

    if (element) {
      if (!isFullScreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Navbar />
        <div className="absolute inset-0 mt-32">
          <div className="mx-auto w-[50rem]">
            <div className="flex items-center w-full h-12 rounded-lg  ">
             

              <input
                className="rounded-full font-bold bg-gradient-to-r from-[#2A2438] to-[#5C5470] px-6 py-2 shadow-xl hover:shadow-inner transition-all ease-in duration-200 text-2xl text-[#000000] tracking-wide"
                type="text"
                id="search"
                placeholder="Search your song..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="rounded-full font-bold bg-gradient-to-r from-[#2A2438] to-[#5C5470] px-6 py-2  text-[#000000] tracking-wide"
                onClick={search}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center h-screen bg-red-lightest">
          <div
            className={`fullscreen-div relative mt-24${isFullScreen
                ? "fullscreen-styles"
                : " bg-transparent shadow-lg rounded-lg w-[50rem]"
              }`}
          >
            <div className={`${isFullScreen ? "clock" : "no-clock"}`}>
              <div className="time">
                {clock.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
            <div className={`${isFullScreen ? "flex-style" : "flex"}`}>
              <div className={`${isFullScreen ? "image" : ""}`}>
                <img
                  className="w-full rounded hidden md:block m-2"
                  src="https://tailwindcss.com/img/card-top.jpg"
                  alt="Album Pic"
                />
              </div>
              <div className={`w-full ${isFullScreen ? "music" : " p-8 pb-0"}`}>
                <div
                  className={`${isFullScreen ? "title" : "flex justify-between"
                    }`}
                >
                  <div>
                    <h3 className="text-2xl text-grey-darkest font-medium">
                      A Sky Full of Stars
                    </h3>
                    <p className="text-sm text-grey mt-1">Ghost Stories</p>
                  </div>
                  <div className="text-red-lighter">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
                    </svg>
                  </div>
                  <div className="text-red-lighter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                      />
                    </svg>
                  </div>
                  <div className="text-red-lighter" onClick={toggleFullScreen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <div className="text-grey-darker">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
                    </svg>
                  </div>
                  <div className="text-grey-darker">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                    </svg>
                  </div>
                  <div className="text-grey-darker p-8 rounded-full bg-red-light shadow-lg">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                    </svg>
                  </div>
                  <div className="text-grey-darker">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                    </svg>
                  </div>
                  <div className="text-grey-darker">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-grey-darker">
                  <p>0:40</p>
                  <p>4:20</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
