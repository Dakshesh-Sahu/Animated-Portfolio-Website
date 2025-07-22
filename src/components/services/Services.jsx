import ComputerModelContainer from "./computer/ComputerModelContainer";
import Counter from "./Counter";
import "./services.css";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const textVariants = {
  initial: {
    x: -100,
    y: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const listVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

const services = [
  {
    id: 1,
    img: "/leetcode.png" ,
    title: "LeetCode",
    description: "( Beginner ) Max Rating: 1413",
    link: "https://leetcode.com/u/velour_replica/",
  },
  {
    id: 2,
    img: "/codechef.png",
    title: "CodeChef",
    description: "( 1 star ) Max Rating: 1095 ",
    link: "https://www.codechef.com/users/velour_replica"
  },
  {
    id: 3,
    img: "/codeforces.png",
    title: "CodeForces",
    description: "( Newbie ) Max Rating: 1224",
    link: "https://codeforces.com/profile/Dakshesh_Sahu"
  },
];

const Services = () => {
  const [currentServiceId, setCurrentServiceId] = useState(1);
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-200px" });
  return (
    <div className="services" ref={ref}>
      <div className="sSection left">
        <motion.h1
          variants={textVariants}
          animate={isInView ? "animate" : "initial"}
          className="sTitle"
        >
          Steps That Shaped Me!
        </motion.h1>
        <motion.div
          variants={listVariants}
          animate={isInView ? "animate" : "initial"}
          className="serviceList"
        >
          {services.map((service) => (
            <motion.a
                key={service.id}
                variants={listVariants}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="service"
                onClick={() => setCurrentServiceId(service.id)}
            >
              <div className="serviceIcon">
                <img src={service.img} alt={service.title} />
              </div>
              <div className="serviceInfo">
                <h2>{service.title}</h2>
                <h3>{service.description}</h3>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <div className="counterList">
          <Counter from={0} to={200} text="Solved DSA Questions" />
          <Counter from={0} to={8} text="Full Stack / AI-ML Projects" />
        </div>
      </div>
      <div className="sSection right">
        {currentServiceId === 1 ? (
          <ComputerModelContainer />
        ) : currentServiceId === 2 ? (
          <ComputerModelContainer />
        ) : (
          <ComputerModelContainer />
        )}
      </div>
    </div>
  );
};

export default Services;
