"use client";

import { motion } from "framer-motion";

const Loading = () => {
    const letters = "LOADING".split("");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a]"
        >
            {/* Animated background blue gradient orbs */}
            <motion.div
                className="absolute h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
                style={{
                    background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
                }}
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 60, 0],
                    scale: [1, 1.3, 0.9, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
                style={{
                    background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
                }}
                animate={{
                    x: [50, -100, 80, 50],
                    y: [30, 80, -60, 30],
                    scale: [1.1, 0.8, 1.2, 1.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute h-[300px] w-[300px] rounded-full opacity-10 blur-[80px]"
                style={{
                    background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
                }}
                animate={{
                    x: [-80, 60, -40, -80],
                    y: [-50, 40, -80, -50],
                    scale: [0.9, 1.4, 1, 0.9],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative flex flex-col items-center gap-8">
                {/* Concentric spinning rings with blue shades */}
                <div className="relative h-24 w-24">
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: "2px solid transparent",
                            borderTopColor: "#3b82f6",
                            borderRightColor: "rgba(59, 130, 246, 0.3)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute inset-2 rounded-full"
                        style={{
                            border: "2px solid transparent",
                            borderTopColor: "#60a5fa",
                            borderLeftColor: "rgba(96, 165, 250, 0.3)",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute inset-4 rounded-full"
                        style={{
                            border: "2px solid transparent",
                            borderBottomColor: "#2563eb",
                            borderRightColor: "rgba(37, 99, 235, 0.2)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    {/* Center pulsing blue dot */}
                    <motion.div
                        className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Animated letter text in blue scale */}
                <div className="flex items-center gap-0.5">
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            className="text-xl font-light tracking-[0.3em] text-neutral-800 dark:text-neutral-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                y: [0, -4, 0],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                delay: i * 0.12,
                                ease: "easeInOut",
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                {/* Blue progress bar */}
                <div className="h-[2px] w-48 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: 2.2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
