import React, { useEffect, useRef, useState } from 'react';

function Typewriter({wordss}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const words = [...wordss];
  const typingSpeed = 100;

  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      setText(currentWord.substring(0, charIndex - 1));
      setCharIndex(charIndex - 1);
      if (charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    } else {
      setText(currentWord.substring(0, charIndex + 1));
      setCharIndex(charIndex + 1);
      if (charIndex === currentWord.length) {
        setIsDeleting(true);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, charIndex, isDeleting]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-m ">Inkspire is the best place to share your {text}</h1>
    </div>
  );
}

export default Typewriter;
