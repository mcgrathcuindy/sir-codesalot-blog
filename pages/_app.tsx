import "nextra-theme-blog/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.css";
import { useState } from "react";
import Image from "next/image";
import headshot from "../public/images/headshotPic.png"

export default function App({ Component, pageProps }: AppProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [bioDismissed, setBioDismissed] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: isDragging ? 'grabbing' : 'grab',
    position: 'absolute',
    left: position.x,
    top: position.y,
  };


  const headshotStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '10px',
    objectFit: 'cover',
  };

  const socialIconStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#0077b5', // Change the color as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
  };

  const quoteStyle = {
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  };

  const popoutButtonStyle = {
    position: 'absolute',
    left: '5px',
    top: '5%',
    // backgroundColor: '#0077b5',
    color: '#0077b5',
    borderRadius: '5px',
    padding: '8px',
    cursor: 'pointer',
    transform: 'translateY(-50%)',
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCloseButtonClick = () => {
    // Implement your close button logic here
    console.log('Close button clicked');
    setBioDismissed(true);
  };

  const handlePopoutButtonClick = () => {
    setBioDismissed(false);
  };

  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      { bioDismissed ? 
        <>
          <div style={popoutButtonStyle as React.CSSProperties} onClick={handlePopoutButtonClick}>
            Show
          </div>
        </>
        :
        <>
          <div 
            style={containerStyle as React.CSSProperties} 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div style={{ position: 'absolute', top: '5px', right: '5px',cursor: 'pointer',}} onClick={handleCloseButtonClick}>
              <button style={{ background: 'none', border: 'none', fontSize: '15px', color:'#0077b5', cursor: 'pointer' }}>hide</button>
            </div>
            <Image src={headshot} alt="Headshot" style={headshotStyle as React.CSSProperties} />

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '10px' }}>
              <a href="https://www.instagram.com/22chrismcgrath" style={socialIconStyle} target="_blank">i</a>
              <a href="https://www.facebook.com/christopher.mcgrath.562/" style={socialIconStyle} target="_blank">f</a>
              <a href="https://www.linkedin.com/in/christopher-mcgrath-5ba0138a/" style={socialIconStyle} target="_blank">in</a>
              {/* Add more social media links as needed */}
            </div>

            <p style={quoteStyle as React.CSSProperties}>Enjoying this blog?<br></br> Let's connect on Social!</p>
          </div>
        </>
      }
      <Component {...pageProps} />
    </>
  );
}
