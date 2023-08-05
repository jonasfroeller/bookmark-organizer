import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react";

const Dashboard = () => {
    const count = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.round(latest))

    useEffect(() => {
    const controls = animate(count, 100)

    return controls.stop
    })

    return (
        <>
            Dashboard <motion.div>{rounded}</motion.div>
        </>
    );
};

export default Dashboard;