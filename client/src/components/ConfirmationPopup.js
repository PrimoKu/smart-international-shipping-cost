// src/components/ConfirmationPopup.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import '../assets/css/ConfirmationPopup.css';

const ConfirmationPopup = ({ show, toggle }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const circleVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 360 },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const checkMarkVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Modal isOpen={show} toggle={toggle} className="confirmation-popup" centered>
      <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
      <ModalBody className="text-center">
        <motion.div
          className="rotating-circle"
          initial="hidden"
          animate={show ? 'visible' : 'hidden'}
          variants={circleVariants}
          transition={{ duration: 2, ease: "linear" }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <svg width="100" height="100">
            <g>
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="green"
                strokeWidth="10"
                fill="transparent"
              />
              <motion.path
                d="M30,50 L45,65 L70,30"
                fill="transparent"
                stroke="green"
                strokeWidth="10"
                initial="hidden"
                animate={animationComplete ? 'visible' : 'hidden'}
                variants={checkMarkVariants}
                transition={{ duration: 0.5, delay: 0.5 }}  // Adjusted delay to match circle animation
              />
            </g>
          </svg>
        </motion.div>
        <motion.div
          className="confirmation-text"
          initial="hidden"
          animate={animationComplete ? 'visible' : 'hidden'}
          variants={textVariants}
          transition={{ duration: 0.5, delay: 1.5 }}  // Adjusted delay to 1.5 seconds
        >
          Checkout Successfully!
        </motion.div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmationPopup;