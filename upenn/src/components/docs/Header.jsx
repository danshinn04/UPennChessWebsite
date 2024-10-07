import PennLogo from '../../assets/penn.png'

const Header = () => {


    return (


        <div className="flex justify-center z-50">
            <div className="w-[80%] h-[80px] items-center mx-auto flex flex-row fixed px-5 justify-between rounded-2xl z-10 box-border" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>

                <div className="flex items-center h-[60px]">
                    <img className="h-[50px] w-auto hover:cursor-pointer"
                         src="https://images.chesscomfiles.com/uploads/v1/landing/522.bd686e1a.5000x5000o.0b5c0ab17287.png"
                         alt=""/>
                </div>

                <div className="flex flex-row items-center gap-10 font-semibold ">
                    <div className="min-w-4">About</div>
                    <div className="min-w-4">Team</div>
                    <div className="min-w-4">Updates</div>
                    <div className="min-w-4">Groups</div>
                    <div className="min-w-4">Join us</div>
                </div>
            </div>
        </div>



    )
}

export default Header