"use client"

import { Boxes } from '@/components/ui/background-boxes';

import {GlareCard} from "@/components/ui/glare-card";
import Header from "../components/docs/Header";

import { motion } from "framer-motion";
import {EvervaultCard, Icon } from "@/components/ui/evervault-card";
import {LampContainer} from "@/components/ui/lamp";  // Adjust the import path if necessary

export default function Home() {

    const teamMembers = [
        {
            name: "John Doe",
            photo: "",
            description: "John is a software engineer specializing in frontend development."
        },
        {
            name: "Jane Smith",
            photo: "",
            description: "Jane is a backend developer with a passion for distributed systems."
        },
        {
            name: "Alex Johnson",
            photo: "",
            description: "Alex is a UX designer focused on creating delightful user experiences."
        }
    ];
    return (
        <div className="antialiased min-h-screen flex flex-col absolute inset-0 w-full h-full bg-black">


            <Header></Header>

            {/*Front page*/}
            <LampContainer>

                <motion.h1
                    initial={{opacity: 0.5, y: 50}}
                    whileInView={{opacity: 1, y: -50}}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl">
                    Welcome to <br/>Penn Chess
                </motion.h1>
            </LampContainer>

            {/*Sponsors*/}
            <motion.h1
                initial={{opacity: 0.5, y: 50}}
                whileInView={{opacity: 1, y: -50}}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl">
                Sponsors
            </motion.h1>


            <div className="mx-[20%] w-[60%] flex flex-row justify-center">
                <div>

                    <motion.h1
                        initial={{opacity: 0.5, y: 50}}
                        whileInView={{opacity: 1, y: -50}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-8 bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl">
                        Meet the Team
                    </motion.h1>

                    <div className="flex flex-row grid-rows-3 justify-between ">

                        {teamMembers.map((member) => (
                            <div
                                className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
                                <EvervaultCard className='Test' text='nig'/>
                                <h1 className="text-white">{member.name}</h1>
                                <h2 className="dark:text-white text-white mt-4 text-sm font-light">
                                    {member.description}
                                </h2>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row grid-row-4 justify-center items-center gap-10 mt-32">

                        <GlareCard className="flex flex-col items-center justify-center">
                            <p>hi</p>
                        </GlareCard>

                        <GlareCard className="flex flex-col items-center justify-center">
                            <p>hi</p>
                        </GlareCard>


                    </div>
                </div>
            </div>
        </div>
    );
}