import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Splitr: A Splitwise App",
    desc: "Splitter is a full-stack expense splitting app that allows users to manage individual and group expenses with options like equal, percentage, or exact splits. Featuring real-time updates, AI-driven spending insights, smart debt simplification, and a responsive UI built with Next.js and Shadcn UI, it ensures seamless expense tracking and settlements.",
    link1: "https://splitr-splitwise-app.vercel.app/",
    link2: "https://github.com/Dakshesh-Sahu/Splitr-Splitwise-App",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "Medimeet: Doctor Appointment Platform",
    desc: "Built a full-stack, responsive telemedicine web app enabling global doctor-patient video consultations with real-time bookings, subscriptions, and role-based access. Included doctor dashboards and an admin verification system to ensure secure onboarding and efficient virtual healthcare interactions.",
    link1: "https://medi-meet-azure.vercel.app/",
    link2: "https://github.com/Dakshesh-Sahu/MediMeet",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Rubik's Cube Solver",
    desc:"",
    link1: "/",
    link2: "/",

  },
  {
    id: 4,
    img: "/p4.jpg",
    title: "Smart Voting System",
    desc: "Developed a smart voting system using Python, OpenCV, and KNN for real-time face recognition. Enabled secure user registration, authentication, and vote logging while effectively preventing duplicate voting, ensuring a reliable and tamper-proof digital election process.",
    link1: "/",
    link2: "https://github.com/Dakshesh-Sahu/Smart-Election-Voting-System",

  },
  {
    id: 5,
    img: "/p5.jpg",
    title: "Animated Portfolio Website",
    desc: "Designed a dynamic portfolio website using React with animated components, 3D objects, snap scrolling, and smooth transitions. Features include a typing animation, scroll-based progress circle, and a responsive contact form with email functionality, optimized for various screen sizes and devices.",
    link1: "/",
    link2: "https://github.com/Dakshesh-Sahu/Animated-Portfolio-Website",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
          <div className="buttonGroup">
            <motion.a variants={textVariants} href={item.link1} target="_blank" rel="noopener noreferrer">
              <button className="projectButton">View Project</button>
            </motion.a>
            <motion.a variants={textVariants} href={item.link2} target="_blank" rel="noopener noreferrer">
              <button className="projectButton">Source Code</button>
            </motion.a>
          </div>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
