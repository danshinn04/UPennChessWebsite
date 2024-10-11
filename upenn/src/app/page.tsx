"use client"

import { Boxes } from '@/components/ui/background-boxes';
import './page.css'
import {GlareCard} from "@/components/ui/glare-card";
import Header from "../components/docs/Header";

import { motion } from "framer-motion";
import {EvervaultCard, Icon } from "@/components/ui/evervault-card";
import {LampContainer} from "@/components/ui/lamp";
import {cn} from "@/lib/utils";  // Adjust the import path if necessary

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
    const sponsors = [
        {
            img: 'https://media-s3-us-east-1.ceros.com/tradeweb/images/2021/06/08/edf5347017d4564f7773d9966537074c/tradeweb-logo-white-wltblueburst-rgb.png',
            name: 'TradeWeb'
        },
        {
            img: 'https://opensource.janestreet.com/assets/JS_logo-d7838b558a1de6c51553426ab5a2bba474510c41c6a5e910a9e30524a32dec27.png',
            name: 'Jane Street'
        },
        {
            img: 'https://res.cloudinary.com/drw/image/upload/f_auto,q_auto/e_colorize,co_white/h_200/comm-drw/logos/logo_drwvc_white.png',
            name: 'DWR'
        },
        {
            img: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Flow_Traders_Logo.png',
            name: 'Flow Traders'
        },
        {
            img: 'https://sponsored.inquirer.com/wp-content/uploads/2023/08/SIG_Blue.png',
            name: 'SIG'
        },
        {
            img: 'https://static1.squarespace.com/static/5a4562ac8c56a8a1cd18eef0/t/5a46b92eec212ddd08ac44d2/1727235928963/',
            name: 'SAC'
        }
    ]
    return (
        <div className="antialiased">


            <div className="relative z-50"><Header></Header></div>


            {/*Front page*/}


            <div
                className="h-dvh relative w-full 0 overflow-hidden bg-slate-900 flex flex-col items-center rounded-lg">
                <div
                    className="absolute inset-0 w-full h-dvh bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"/>
                <Boxes className='z-10'/>
                <div className="flex flex-col items-center justify-center absolute top-[20%]">
                    <motion.h1
                        initial={{opacity: 0.5, y: -50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-8 relative z-30 items-center bg-gradient-to-br from-blue-300 to-red-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl sm:text-5xl">
                        Welcome to <br/>Penn Chess
                    </motion.h1>

                    <motion.h1
                        initial={{opacity: 0.5, y: -50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-5 max-w-[50%] relative z-30 items-center bg-gradient-to-br from-slate-100 to-slate-300 py-4 bg-clip-text text-center font-bold tracking-tight text-transparent md:text-lg sm:text-base">
                        “The beauty of chess is it can be whatever you want it to be. It transcends language, age, race,
                        religion, politics, gender, and socioeconomic background. Whatever your circumstances, anyone
                        can
                        enjoy a good fight to the death over the chess board.”

                        – Simon Williams
                    </motion.h1>
                </div>

                <motion.h1
                    initial={{opacity: 0.5, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="w-[100%] flex flex-col absolute z-30 bottom-[5%] items-center justify-center md:text-3xl">

                    <div className='flex flex-wrap justify-center items-center gap-x-8 gap-y-0'>
                        {sponsors.map((sponsor) => (
                            // <div className="h-[100%] w-auto">
                            //     <img className='h-[80px] w-auto' src={sponsor.img} alt=""/>
                            // </div>
                            <button className="button max-h-[9%] w-full min-w-[150px] max-w-[15%] flex justify-center items-center">
                                <span className="button_lg flex justify-center">
                                    <span className="button_sl"></span>
                                    <span className="button_text flex max-w-[180px] h-[40px] items-center"><img className='max-h-[100%]' src={sponsor.img} alt=""/></span>
                                </span>
                            </button>
                        ))}
                    </div>


                    {/* <div className="scrolldown">
                        <div className="chevrons">
                            <div className="chevrondown"></div>
                            <div className="chevrondown"></div>
                        </div>
                    </div> */}


                </motion.h1>

            </div>


            <div id='AboutUs' className="mx-[20%] w-[60%] flex flex-row justify-center">
                <div>
                    <motion.h1
                    initial={{opacity: 0.5, y:50}}
                    whileInView={{opacity: 1, y:-50}}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                    className="flex justify-center">
                        <div className="w-[50%] flex flex-wrap flex-col">
                            <div className="mt-24 bg-gradient-to-br from-slate-100 flex flex-col to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl">
                                About Us
                            </div>
                            <div className="flex text-center md:text-lg">
                                Welcome to UPenn Chess Club.
                                Whether you’ve played chess your whole life or have no idea how the pieces move,
                                we encourage you to stop by our meetings and events.
                                Everyone  is welcome, including non-Penn students.
                            </div>

                        </div>

                    </motion.h1>

                    <motion.h1
                        initial={{opacity: 0.5, y: 50}}
                        whileInView={{opacity: 1, y: -50}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col my-10 justify-center">

                        <div className="mt-8 bg-gradient-to-br from-slate-100 flex flex-col to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl">Meet the Team</div>
                        <div className="flex flex-wrap gap-x-5 gap-y-5">

                            {teamMembers.map((member) => (
                                <div
                                    className="border border-white/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative max-h-[20%]">
                                    <EvervaultCard className='Test' text={member.photo? member.photo :'https://cdn-icons-png.flaticon.com/512/8847/8847419.png'}/>
                                    <h1 className="text-white">{member.name}</h1>
                                    <h2 className="dark:text-white text-white mt-4 text-sm font-light">
                                        {member.description}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </motion.h1>


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