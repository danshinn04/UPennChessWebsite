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
            img: 'https://media.discordapp.net/attachments/853703320711462973/1292686266386874458/Rr8bSebnwyYdOVmCyApMVmKzAZAUmKzBZgckKTFZgsgKTFZiswAW3AhOA94J7JJMLmqzAZAUmKzBZgSf7CvgMXgV4mWI7AXif7A9cnTFZiswGQFJiswWYHJCkxWYLICkxWYrMBkBbZhBSYA7zYs6uQtJyswWYHJCkxWYLICm62AAbxFUfzDsixfUpblI2VZfiKO4zbMHgne2eyApMVmKzAZAUmKzBZgckKTFZgsgKTFZiswGQFBlmBCcA7yGpNfnayApMVmKzAZAUmKzCGFSjLMpmamtpTFMUvTk1NPa8oitNFUXw5SZL3BUGwNoaPmLzFZAUmKzBZgckKTFZgsgKTFZiswGQFJiswWYHJCjxFVmAC8D5FHvTkNicrMFmByQpMVuDCWYGyLMOpqanpPM9vcs5dPjU1tZim6fE4jm8PgqB94Vzp5EomKzBZgckKTFZgsgKTFZiswGQFJiswWYHJCkxW4EJfgf8fgSSe3aHKLRwAAAAASUVORK5CYI..png?ex=6704a366&is=670351e6&hm=7d769979598d020d4c9fc39107b364edb83eee85dac32aa87faad802b6d902a8&=&format=webp&quality=lossless',
            name: 'Citadel'
        },
        {
            img: 'https://opensource.janestreet.com/assets/JS_logo-d7838b558a1de6c51553426ab5a2bba474510c41c6a5e910a9e30524a32dec27.png',
            name: 'Jane Street'
        },
        {
            img: 'https://res.cloudinary.com/drw/image/upload/f_auto,q_auto/e_colorize,co_white/h_200/comm-drw/logos/logo_drwvc_white.png',
            name: 'DWR'
        }
    ]
    return (
        <div className="antialiased">


            <div className="relative z-50"><Header></Header></div>


            {/*Front page*/}


            <div
                className="h-dvh relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
                <div
                    className="absolute inset-0 w-full h-dvh bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"/>
                <Boxes className='z-10'/>
                <div className="flex flex-col items-center justify-center">
                    <motion.h1
                        initial={{opacity: 0.5, y: 100}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-8 relative z-30 items-center bg-gradient-to-br from-blue-300 to-red-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl">
                        Welcome to <br/>Penn Chess
                    </motion.h1>

                    <motion.h1
                        initial={{opacity: 0.5, y: 100}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-8 max-w-[50%] relative z-30 items-center bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-lg">
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
                    className="w-full max-w-[70%] flex mx-auto h-[100px] relative z-30 top-[10%] items-center justify-center px-[10%] md:text-3xl">

                    <div className='flex flex-row justify-center items-center gap-16'>
                        {sponsors.map((sponsor) => (
                            // <div className="h-[100%] w-auto">
                            //     <img className='h-[80px] w-auto' src={sponsor.img} alt=""/>
                            // </div>
                            <button className="button">
                                <span className="button_lg">
                                    <span className="button_sl"></span>
                                    <span className="button_text flex justify-center"><img className='h-[60px]' src={sponsor.img} alt=""/></span>
                                </span>
                            </button>
                        ))}
                    </div>


                </motion.h1>

                <motion.h1
                    initial={{opacity: 0.5, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeInOut",}}>
                    <div className="scrolldown absolute bottom-0 justify-center z-30">
                    <div className="chevrons">
                            <div className="chevrondown"></div>
                            <div className="chevrondown"></div>
                        </div>
                    </div>
                </motion.h1>

            </div>





            <div className="mx-[20%] w-[60%] flex flex-row justify-center">
                <div>

                    <motion.h1
                        initial={{opacity: 0.5, y: 50}}
                        whileInView={{opacity: 1, y: -50}}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col my-10">

                        <div className="mt-8 bg-gradient-to-br from-slate-100 flex flex-col to-slate-400 py-4 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-6xl">Meet the Team</div>
                        <div className="flex flex-row grid-rows-3 gap-5 w-full max-w-70%">

                            {teamMembers.map((member) => (
                                <div
                                    className="border border-white/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
                                    <EvervaultCard className='Test' text='nig'/>
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