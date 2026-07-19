import React from "react";
import NoteCard from "./NoteCard";
import { Note } from "../assets/assets";

const Notes = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-10">
      <h1 className="md:text-4xl text-2xl font-semibold">
        <span className="text-primary">Everyone You need</span> <br></br> to
        Succeed!
      </h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Powerfull feature designed for student by Student
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 py-11 transition-all duration-1000">
        {Note.map((note) => (
          <NoteCard key={note.path} Note={note} />
        ))}
      </div>
      
    </div>
  );
};

export default Notes;
