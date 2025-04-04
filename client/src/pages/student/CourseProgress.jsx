import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import {
  CheckCircle,
  CheckCircle2,
  CirclePlay,
  PauseCircle,
  Volume2,
  Maximize,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Chatbot from "@/components/Chatbot/chatbot";
import { motion } from "framer-motion";
import AIButton from "@/components/AIButton"; // Import the AIButton component

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse] = useCompleteCourseMutation();
  const [inCompleteCourse] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const [watchedLectures, setWatchedLectures] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [skipFeedback, setSkipFeedback] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot

  const videoRef = useRef(null);
  const controlsTimeout = useRef(null);

  useEffect(() => {
    if (data) {
      const completedLectures = data.data.progress
        .filter((prog) => prog.viewed)
        .map((prog) => prog.lectureId);
      setWatchedLectures(completedLectures);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || (lectures && lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return watchedLectures.includes(lectureId);
  };

  const handleLectureProgress = async (lectureId) => {
    if (!isLectureCompleted(lectureId)) {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    setCurrentTime(0); // Reset video progress
  };

  const handleCompleteCourse = async () => {
    if (watchedLectures.length === lectures.length) {
      await completeCourse(courseId);
      refetch();
      toast.success("Course marked as completed!");
    } else {
      toast.error(
        "You must watch all lectures to mark the course as completed."
      );
    }
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
    refetch();
    toast.success("Course marked as incomplete.");
  };

  const courseCompletionPercentage = Math.round(
    (watchedLectures.length / lectures.length) * 100
  );

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
    showTemporaryControls();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleVideoEnd = () => {
    handleLectureProgress(currentLecture?._id || initialLecture._id);
    toast.success("Lecture marked as completed!");
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleSeek = (seconds) => {
    videoRef.current.currentTime += seconds;
    setCurrentTime(videoRef.current.currentTime);
    setSkipFeedback(seconds > 0 ? `+${seconds}s` : `${seconds}s`);
    setTimeout(() => setSkipFeedback(null), 800);
    showTemporaryControls();
  };

  const handlePlaybackSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setPlaybackSpeed(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  const showTemporaryControls = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 2000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formatRemainingTime = () => {
    const remainingTime = duration - currentTime;
    return `-${formatTime(remainingTime)}`;
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen); // Toggle the chatbot state
  };

  return (
    <div className="relative">
      {/* Existing Course Progress UI */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Display course name and progress */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{courseTitle}</h1>
          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
            disabled={watchedLectures.length !== lectures.length}
            className={`${
              watchedLectures.length !== lectures.length
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            {completed ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
              </div>
            ) : (
              "Mark as Completed"
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${courseCompletionPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {courseCompletionPercentage}% of the course completed
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Video Section */}
          <div
            className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4 bg-black relative"
            onMouseMove={showTemporaryControls}
          >
            <video
              ref={videoRef}
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              className="w-full h-auto rounded-lg"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              onLoadedMetadata={() => setDuration(videoRef.current.duration)}
            />
            {/* Skip Feedback */}
            {skipFeedback && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                {skipFeedback}
              </div>
            )}
            {showControls && (
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="text-white text-4xl mx-auto"
                >
                  {isPlaying ? (
                    <PauseCircle size={40} />
                  ) : (
                    <CirclePlay size={40} />
                  )}
                </button>
                {/* Bottom Controls */}
                <div className="flex items-center justify-between text-white">
                  {/* Timer */}
                  <span>{formatTime(currentTime)}</span>
                  {/* Seek Buttons */}
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleSeek(-10)}>
                      <RotateCcw size={24} />
                    </button>
                    <button onClick={() => handleSeek(10)}>
                      <RotateCw size={24} />
                    </button>
                  </div>
                  {/* Playback Speed */}
                  <select
                    value={playbackSpeed}
                    onChange={handlePlaybackSpeedChange}
                    className="bg-gray-800 text-white rounded px-2 py-1"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.2">1.2x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                  {/* Remaining Time */}
                  <span>{formatRemainingTime()}</span>
                  {/* Fullscreen */}
                  <button onClick={handleFullScreen} className="text-white">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lecture Sidebar */}
          <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
            <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
            <div className="flex-1 overflow-y-auto">
              {lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`mb-3 hover:cursor-pointer transition transform ${
                    lecture._id === currentLecture?._id
                      ? "bg-gray-200 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2
                          size={24}
                          className="text-green-500 mr-2"
                        />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-medium">
                          {lecture.lectureTitle}
                        </CardTitle>
                      </div>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant={"outline"}
                        className="bg-green-200 text-green-600"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Button */}
      <AIButton onClick={toggleChatbot} />

      {/* Chatbot Sidebar */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default CourseProgress;
