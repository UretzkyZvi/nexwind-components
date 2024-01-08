import React, { useState, useRef, useEffect, FC } from "react";
import Hls, { Level } from "hls.js";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  PlayCircle,
  Settings,
  Tv,
} from "lucide-react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [thumbnails, setThumbnails] = useState<{ [time: number]: string }>({});
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [qualityLevels, setQualityLevels] = useState<Level[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showMultiLevelMenu, setShowMultiLevelMenu] = useState(false);
  const extractYouTubeID = (url: string) => {
    const id = url.split("v=")[1];
    return id ? id : url.split("/").pop();
  };
  const isYouTubeVideo =
    src.includes("youtube.com") || src.includes("youtu.be");
  const youTubeVideoId = isYouTubeVideo ? extractYouTubeID(src) : null;

  const toggleMultiLevelMenu = () => {
    setShowMultiLevelMenu(!showMultiLevelMenu);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const hideControls = () => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleControlsMouseOver = () => {
    setShowControls(true);
    hideControls();
  };
  const handleControlsMouseLeave = () => {
    hideControls();
    if (showMenu) {
      setShowMenu(false);
    }
  };
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  useEffect(() => {
    hideControls();
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (videoRef.current && videoRef.current.paused) {
      if (videoRef.current) {
        videoRef.current.play();
      }
      setIsPlaying(true);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement && video) {
      video.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const togglePiP = async () => {
    try {
      if (
        videoRef.current !== document.pictureInPictureElement &&
        videoRef.current
      ) {
        await videoRef.current.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error(
        `Error attempting to toggle Picture-in-Picture mode: ${error}`
      );
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.value;
    if (videoRef.current) {
      videoRef.current.volume = newVolume as unknown as number;
    }
    setVolume(newVolume as unknown as number);
  };

  const updateProgress = () => {
    const video = videoRef.current;
    if (video) {
      setProgress((video.currentTime / video.duration) * 100);
      setDuration(video.duration);
      setCurrentTime(video.currentTime);
    }
  };

  const captureThumbnail = (time: number) => {
    const video = videoRef.current;
    if (!video || !time) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL();
      setThumbnails((prevThumbnails) => ({
        ...prevThumbnails,
        [time]: dataUrl,
      }));
      return dataUrl;
    }
    return null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    const tooltip = tooltipRef.current;
    const rect = progressBar?.getBoundingClientRect();
    const percent = rect ? (e.pageX - rect.left) / rect.width : 0;
    const time = video ? percent * video.duration : 0;
    setHoverTime(time);

    let thumbnailDataUrl = thumbnails[Math.floor(time)];
    if (!thumbnailDataUrl) {
      thumbnailDataUrl = captureThumbnail(Math.floor(time)) as string;
    }

    if (tooltip && rect) {
      tooltip.style.left = `${e.pageX - rect.left}px`;
      tooltipRef.current.style.backgroundImage = `url(${thumbnailDataUrl})`;
      tooltipRef.current.style.backgroundSize = "cover";
    }
  };

  const handleThumbnailClick = (time: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    if (time !== null) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "";
  };

  const changeQuality = (levelIndex: number) => {
    const hlsInstance = Hls.isSupported() ? new Hls() : null;
    if (hlsInstance && videoRef.current) {
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(videoRef.current);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
        hlsInstance.currentLevel = levelIndex;
      });
      videoRef.current.play();
    }
    toggleMenu();
  };

  useEffect(() => {
    const video = videoRef.current;
    const hls = new Hls();
    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else if (Hls.isSupported()) {
        hls.loadSource(src);
        hls.attachMedia(video);
      }
      // Optional: Listen to available quality levels
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log("Quality levels", data);
        setQualityLevels(data.levels);
      });
      video.addEventListener("timeupdate", updateProgress);

      return () => {
        hls.destroy();
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [src]);

  const renderVideoPlayer = () => {
    if (isYouTubeVideo && youTubeVideoId) {
      return <YouTube videoId={youTubeVideoId} /* YouTube Player Props */ />;
    } else {
      return (
        <>
          <video ref={videoRef} src={src} className="w-full rounded-md" />;
          {!isPlaying ? (
            <div className="absolute top-0 bg-white w-full h-full opacity-75 z-10">
              <div className="relative text-black top-10 left-10">
                <div className="text-2xl font-bold">Title</div>
                <div className="text-sm">Subtitle</div>
              </div>
              <div className="flex flex-1 w-full h-full">
                <div
                  className=" m-auto text-black hover:text-black/25 hover:cursor-pointer"
                  onClick={togglePlay}
                >
                  <PlayCircle className="w-12 h-12" />
                </div>
              </div>
            </div>
          ) : null}
          {/* show in the beginning, after 3 sec hide and show only on hover, and hide again  */}
          {showControls && (
            <div className="absolute max-h-28  top-3/4 w-full p-4 backdrop-blur-sm backdrop-contrast-200 transition-all duration-300 ease-in-out">
              <div className=" flex w-full flex-row items-center text-xs">
                {currentTime && (
                  <div className="w-12 text-center">
                    {formatTime(currentTime)}
                  </div>
                )}
                <div className="relative w-full">
                  <div
                    ref={progressBarRef}
                    className="h-2 bg-gray-300"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={(e) => handleMouseMove(e)}
                    onClick={() => handleThumbnailClick(hoverTime)}
                  >
                    <div
                      className="h-2 bg-gray-600"
                      style={{ width: `${progress}%` }}
                    ></div>
                    {showTooltip && (
                      <div
                        ref={tooltipRef}
                        className="absolute bottom-full mb-2 w-20 h-20 bg-white text-orange-600 text-xs p-1 rounded"
                      >
                        {formatTime(hoverTime)}
                      </div>
                    )}
                  </div>
                </div>
                {duration && (
                  <div className="w-12 text-center">{formatTime(duration)}</div>
                )}
              </div>
              <div className="flex  w-full items-center justify-between mt-4 ">
                <button onClick={togglePlay}>
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <div className="flex  items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(e)}
                    className="slider"
                  />
                  <button onClick={togglePiP}>
                    <Tv />
                  </button>
                  <button onClick={toggleFullScreen}>
                    {document.fullscreenElement ? <Minimize2 /> : <Maximize2 />}
                  </button>
                </div>

                {/* Settings Menu */}
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full  px-4 py-2   text-sm font-medium  hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      onClick={toggleMultiLevelMenu}
                    >
                      <Settings />
                    </button>
                  </div>

                  {/* Quality and Speed Submenus */}
                  {showMultiLevelMenu && (
                    <div
                      className="origin-bottom-left absolute z-20 right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        {/* Quality Submenu */}
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                          onMouseEnter={() => setShowQualityMenu(true)}
                          onMouseLeave={() => setShowQualityMenu(false)}
                        >
                          Quality
                          {showQualityMenu && (
                            <div className="absolute right-full -top-5 mt-0 ml-1 w-56 h-40 overflow-y-auto rounded-md   bg-white bg-opacity-60 backdrop-blur-sm">
                              {qualityLevels.map((level, index) => (
                                <a
                                  key={level.height}
                                  className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100"
                                  onClick={() => changeQuality(index)}
                                >
                                  {level.height}p
                                </a>
                              ))}
                            </div>
                          )}
                        </a>

                        {/* Speed Submenu */}
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-1"
                          onMouseEnter={() => setShowSpeedMenu(true)}
                          onMouseLeave={() => setShowSpeedMenu(false)}
                        >
                          Speed
                          {showSpeedMenu && (
                            <div className="absolute right-full top-0 mt-0 ml-1 w-56 rounded-md shadow-lg bg-white">
                              {[0.5, 1, 1.5, 2].map((speed) => (
                                <a
                                  key={speed}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleSpeedChange(speed)}
                                >
                                  {speed}x
                                </a>
                              ))}
                            </div>
                          )}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div
      className="relative aspect-w-16 aspect-h-9 h-full overflow-hidden rounded-md max-md:mx-2 md:rounded-3xl bg-black text-orange-400"
      onMouseOver={handleControlsMouseOver}
      onMouseLeave={handleControlsMouseLeave}
    >
      {renderVideoPlayer()}
    </div>
  );
};

export default VideoPlayer;
