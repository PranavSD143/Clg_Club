import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../images/photo.jpg";
import styles from "../css/Ann.module.css"; // Import modular CSS

const Ann = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [
    { id: 1, title: "Card 1", color: "bg-red-500", image: logo },
    { id: 2, title: "Card 2", color: "bg-blue-500", image: logo },
    { id: 3, title: "Card 3", color: "bg-green-500", image: logo },
    {
      id: 4,
      title: "Card 4",
      color: "bg-yellow-500",
      image: "/images/card4.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 justify-center items-center mt-10">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`${styles.card} ${card.color}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            scale: hoveredIndex === index ? 1.1 : 1,
            x: hoveredIndex === index ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}>
          <img src={card.image} alt={card.title} className={styles.image} />
        </motion.div>
      ))}
    </div>
  );
};

export default Ann;
